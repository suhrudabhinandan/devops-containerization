import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetInstituteByIdQuery } from "../../Slice/Api-Slice/instituteApi";
import { loadStudentFromStorage } from "../../Slice/AuthSlice";
import Attendance from "../Attendance/Attendance";
import Announcement from "../Announcement/Announcement";
import Result from "../Result/Result";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/academy.jpg";
import "./Home.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useGetAnnouncementsQuery } from "../../Slice/Api-Slice/announcementApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const student = useSelector((state) => state.auth);

  
  useEffect(() => {
    dispatch(loadStudentFromStorage());
  }, [dispatch]);


  useEffect(() => {
    const token = localStorage.getItem("studentToken");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp < currentTime) {
          
          handleLogout();
        } else {
         
          const remainingTime = (decoded.exp - currentTime) * 1000;
          const timer = setTimeout(() => {
            handleLogout();
          }, remainingTime);

          return () => clearTimeout(timer);
        }
      } catch (err) {
        console.error("Invalid token", err);
        handleLogout();
      }
    } else {
      handleLogout();
    }
  }, []);
  const [sidebarOpen, setSidebarOpen] = useState(false);

// Add this function to toggle sidebar
const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

// Add this function to close sidebar when clicking overlay
const closeSidebar = () => setSidebarOpen(false);

 
  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    alert("Your session has expired. Please log in again.");
    navigate("/login");
  };

  
  const {
    data: instituteData,
    isLoading: instituteLoading,
    isError: instituteError,
  } = useGetInstituteByIdQuery(student?.institute_id, {
    skip: !student?.institute_id,
  });
  const institute = instituteData?.institute;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleMenuClick = (menu) => setActiveMenu(menu);

  const confirmLogout = () => {
    localStorage.removeItem("studentToken");
    alert("You have been logged out");
    navigate("/login");
  };
  const cancelLogout = () => setShowLogoutPopup(false);

  const { data: announcementsData } = useGetAnnouncementsQuery();

  useEffect(() => {
    if (!announcementsData) return;

    const announcementsArray = Array.isArray(announcementsData)
      ? announcementsData
      : announcementsData?.announcements || [];

    const lastVisit = localStorage.getItem("lastAnnouncementVisit") || 0;

    const newCount = announcementsArray.filter(
      (a) => a.createdAt && new Date(a.createdAt).getTime() > Number(lastVisit)
    ).length;

    setUnreadCount(newCount);
  }, [announcementsData]);

  const handleAnnouncementClick = () => {
    setActiveMenu("Announcement");
    localStorage.setItem("lastAnnouncementVisit", Date.now());
    setUnreadCount(0);
  };

  const renderMainContent = () => {
    switch (activeMenu) {
      case "Attendance":
        return <Attendance />;
      case "Announcement":
        return <Announcement />;
      case "Results":
        return <Result/>
      case "Dashboard":
      default:
        return (
          <div className="profile-info">
            <h1>Welcome back, {student?.name || "Student"}!</h1>
            <p>Always stay updated on the student portal</p>
          </div>
        );
    }
  };

  
  return (
     <div className="Student-portal">
    {/* Hamburger Button */}
    <button 
      className={`hamburger-btn ${sidebarOpen ? 'active' : ''}`}
      onClick={toggleSidebar}
    >
      <div className="hamburger-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>

    {/* Overlay */}
    <div 
      className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
      onClick={closeSidebar}
    ></div>

    <div className="main-box">
      <div className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
        {/* Rest of your sidebar code stays the same */}
        <div className="school-logo">
          <img src={logo} alt="Institute Logo" />
          <h5>
            {instituteLoading
              ? "Loading Institute..."
              : instituteError
              ? "Error loading institute"
              : institute?.name || "Institute Name"}
          </h5>
          <p>gec.edu.in@gmail.com</p>
        </div>

        <div className="Menus">
          {[
            "Dashboard",
            "Attendance",
            "Results",
            "Payment",
            "Syllabus",
            "Announcement",
          ].map((menu) => (
            <span
              key={menu}
              onClick={() => {
                if (menu === "Announcement") {
                  handleAnnouncementClick();
                } else {
                  handleMenuClick(menu);
                }
                closeSidebar(); // Close sidebar on mobile after clicking
              }}
              className={activeMenu === menu ? "active-menu" : ""}
            >
              {menu}
              {menu === "Announcement" && unreadCount > 0 && (
                <div className="notification-badge">
                  <FontAwesomeIcon icon={faBell} />
                </div>
              )}
            </span>
          ))}
        </div>

        <div className="logout-btn" onClick={() => {
          setShowLogoutPopup(true);
          closeSidebar();
        }}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </div>
      </div>

      <div className="container-box">{renderMainContent()}</div>
    </div>

    {/* Logout Popup - stays the same */}
    {showLogoutPopup && (
      <div className="logout-popup">
        <div className="popup-content">
          <h3>Are you sure you want to logout?</h3>
          <div className="popup-buttons">
            <button className="yes-btn" onClick={confirmLogout}>
              Yes
            </button>
            <button className="no-btn" onClick={cancelLogout}>
              No
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default Home;
