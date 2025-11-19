import React, { useEffect } from "react";
import HamburgerMenu from "../Hamburger/Hamburger";
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Slice/authSlice";
import "./Landing.css";

const Landing = () => {
  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Mark Attendance", path: "/attendancePage" },
    { name: "Result", path: "/result" },
    { name: "Announcement", path: "/announcement" },
    { name: "Logout", path: "/" },
  ];

  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let teacherName = "";

  
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        teacherName = decoded.name || "Teacher";

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
  }, [token]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };


  if (token) {
    try {
      const decoded = jwtDecode(token);
      teacherName = decoded.name || "Teacher";
    } catch (err) {
      teacherName = "Teacher";
    }
  }

  return (
    <div className="teacher-home">
      <div className="teacher-header">
        <h1 id="teacher-heading">Teacher Portal</h1>
        <HamburgerMenu links={links} onLogout={handleLogout} />
      </div>

      <div className="teacher-content" style={{width: "fit-content"}}>
        <h2 className="teacherName">Welcome, {teacherName}!</h2>
        <p style={{width: "fit-content"}}>
          Select an option from the menu to start managing attendance.
        </p>
      </div>
    </div>
  );
};

export default Landing;
