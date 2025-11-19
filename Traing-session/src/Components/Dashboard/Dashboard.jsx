import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Dashboard.css";
import "boxicons/css/boxicons.min.css";
import {
  useTeacherSignupMutation,
  useTeacherLoginMutation,
} from "../../Slice/teacherRegisterSlice";
import { setCredentials } from "../../Slice/authSlice";

const Dashboard = () => {
  const [isRegisterActive, setIsRegisterActive] = useState(false);

  const dispatch = useDispatch();

  // RTK Query hooks
  const [teacherSignup, { isLoading: signupLoading }] = useTeacherSignupMutation();
  const [teacherLogin, { isLoading: loginLoading }] = useTeacherLoginMutation();


  const [regInstituteId, setRegInstituteId] = useState("");
  const [regName, setRegName] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regSubject, setRegSubject] = useState("");
  const [regContactNumber, setRegContactNumber] = useState("");


  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");


  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);


  const handleRegisterClick = async (e) => {
    e.preventDefault();
    try {
      await teacherSignup({
        instituteId: regInstituteId,
        name: regName,
        password: regPassword,
        subject: regSubject,
        contactNumber: regContactNumber,
      }).unwrap();

      alert("Registration successful!");
      setIsRegisterActive(false);


      setRegInstituteId("");
      setRegName("");
      setRegPassword("");
      setRegSubject("");
      setRegContactNumber("");
    } catch (err) {
      console.error("Signup error:", err);
      alert(err?.data?.msg || "Something went wrong!");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await teacherLogin({
        name: loginName,
        password: loginPassword,
      }).unwrap();

      dispatch(
        setCredentials({
          token: response.token,
          user: response.teacher,
        })
      );

      localStorage.setItem("token", response.token);
      console.log("Login successful! Token:", response.token);

      alert(`Welcome ${response.teacher.name}! Login successful.`);
    } catch (error) {
      console.error("Login error:", error);
      alert(error?.data?.msg || "Login failed. Please try again.");
    }
  };

  return (
    <div className="dashboard">
      <h1>DAV PUBLIC SCHOOL</h1>
      <div className={`teacherLogin ${isRegisterActive ? "active" : ""}`}>
       
        <div className="form-box login">
          <form onSubmit={handleLoginSubmit}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                required
              />
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box password-box">
              <input
                type={showLoginPassword ? "text" : "password"}
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <i
                className={`bx ${showLoginPassword ? "bx-hide" : "bx-show"}`}
                onClick={() => setShowLoginPassword(!showLoginPassword)}
                style={{ cursor: "pointer" }}
              ></i>
            </div>

            <button type="submit" className="btns">
              {loginLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        {/* REGISTRATION FORM */}
        <div className="form-box register">
          <form onSubmit={handleRegisterClick}>
            <h1>Registration</h1>

            <div className="input-box">
              <input
                type="text"
                placeholder="Institute ID"
                value={regInstituteId}
                onChange={(e) => setRegInstituteId(e.target.value)}
                required
              />
            </div>

            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                required
              />
            </div>

            <div className="input-box password-box">
              <input
                type={showRegPassword ? "text" : "password"}
                placeholder="Password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
              />
              <i
                className={`bx ${showRegPassword ? "bx-hide" : "bx-show"}`}
                onClick={() => setShowRegPassword(!showRegPassword)}
                style={{ cursor: "pointer" }}
              ></i>
            </div>

            <div className="input-box">
              <input
                type="text"
                placeholder="Subject"
                value={regSubject}
                onChange={(e) => setRegSubject(e.target.value)}
                required
              />
            </div>

            <div className="input-box">
              <input
                type="text"
                placeholder="Contact Number"
                value={regContactNumber}
                onChange={(e) => setRegContactNumber(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btns">
              {signupLoading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>

        {/* TOGGLE PANELS */}
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button
              className="btns register-btns"
              onClick={() => setIsRegisterActive(true)}
            >
              Register
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button
              className="btns login-btn"
              onClick={() => setIsRegisterActive(false)}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
