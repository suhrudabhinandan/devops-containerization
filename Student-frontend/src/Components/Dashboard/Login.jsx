// import React, { useState, useEffect } from "react";
// import { useLoginStudentMutation } from "../../Slice/Api-Slice/StudentLoginSlice";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";

// const Login = () => {
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();
  

//   const [loginStudent, { isLoading, error }] = useLoginStudentMutation();

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const result = await loginStudent({ name, password }).unwrap();

//     if (!result?.token) {
//       alert("Login failed! No token returned.");
//       return;
//     }

   
//     localStorage.setItem("studentToken", result.token);
//     localStorage.setItem("studentInfo", JSON.stringify(result.user));

//     alert(`Welcome ${result.user?.name || name}!`);
//     // console.log("Logged in student:", result.token);
//     // console.log("Logged student", result.user.name);
//     // console.log("logged student id", result.user.student_id);
//     setName("");
//     setPassword("");


//     navigate("/home", { replace: true });
//   } catch (err) {
//     console.error("Login failed:", err);
//     alert(err?.data?.msg || "Login failed! Check your credentials.");
//   }
// };
//   return (
//     <div className="student-login-container">
//       <form className="student-login-form" onSubmit={handleSubmit}>
//         <h1>Student Login</h1>

//         <div className="input-box">
//           <input
//             type="text"
//             placeholder="Student Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         <div className="input-box">
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit" className="login-btn" disabled={isLoading}>
//           {isLoading ? "Logging in..." : "Login"}
//         </button>

//         {error && (
//           <p className="error-msg">
//             Login failed: {error?.data?.message || "Unknown error"}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { X, AlertCircle, CheckCircle } from "lucide-react";
import { useLoginStudentMutation } from "../../Slice/Api-Slice/StudentLoginSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null); // FIXED

  const navigate = useNavigate();
  const [loginStudent, { isLoading, error }] = useLoginStudentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await loginStudent({ name, password }).unwrap();

      if (!result?.token) {
        setNotification({
          type: "error",
          message: "Login failed! No token returned."
        });
        return;
      }

      localStorage.setItem("studentToken", result.token);
      localStorage.setItem("studentInfo", JSON.stringify(result.user));

      setNotification({
        type: "success",
        message: `Welcome ${result.user?.name || name}!`
      });

      setName("");
      setPassword("");

      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 800);
    } catch (err) {
      console.error("Login failed:", err);
      setNotification({
        type: "error",
        message: err?.data?.msg || "Login failed! Check your credentials."
      });
    }
  };

  return (
    <div className="login-wrapper">
      {/* Notification Toast */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          <div className="notification-content">
            {notification.type === "success" ? (
              <CheckCircle size={24} />
            ) : (
              <AlertCircle size={24} />
            )}
            <span>{notification.message}</span>
          </div>
          <button
            className="notification-close"
            onClick={() => setNotification(null)}
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="login-container">
        <div className="login-left">
          <div className="brand-section">
            <h1 className="brand-title">Welcome Back</h1>
            <p className="brand-subtitle">
              Access your student portal and continue your learning journey
            </p>
          </div>
        </div>

        <div className="login-right">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Student Login</h2>
            <p className="form-subtitle">Enter your credentials to continue</p>

            <div className="input-group">
              <label htmlFor="name">Student Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <span className="loader-text">
                  <span className="spinner"></span>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>

            <p className="demo-info">
              Demo: username: <strong>demo</strong>, password:{" "}
              <strong>password</strong>
            </p>
          </form>
        </div>
      </div>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .login-wrapper {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          position: relative;
        }

        .login-container {
          display: flex;
          width: 100%;
          height: 100%;
        }

        /* Left Side */
        .login-left {
          flex: 1;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px;
          position: relative;
          overflow: hidden;
        }

        .login-left::before {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          top: -200px;
          right: -200px;
        }

        .login-left::after {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          bottom: -100px;
          left: -100px;
        }

        .brand-section {
          position: relative;
          z-index: 1;
          max-width: 500px;
        }

        .brand-title {
          font-size: 56px;
          font-weight: 800;
          color: white;
          margin-bottom: 20px;
          line-height: 1.2;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .brand-subtitle {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
        }

        /* Right Side */
        .login-right {
          flex: 1;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px;
        }

        .login-form {
          width: 100%;
          max-width: 450px;
        }

        .form-title {
          font-size: 36px;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
        }

        .form-subtitle {
          color: #6b7280;
          font-size: 16px;
          margin-bottom: 40px;
        }

        .input-group {
          margin-bottom: 25px;
        }

        .input-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
        }

        .input-group input {
          width: 100%;
          padding: 14px 18px;
          font-size: 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          outline: none;
          transition: all 0.3s ease;
          background: #f9fafb;
        }

        .input-group input:focus {
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          font-size: 17px;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .loader-text {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .demo-info {
          text-align: center;
          margin-top: 20px;
          color: #6b7280;
          font-size: 14px;
        }

        .demo-info strong {
          color: #667eea;
        }

        /* Notification Toast */
        .notification {
          position: fixed;
          top: 30px;
          right: 30px;
          min-width: 350px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          z-index: 1000;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .notification.success {
          border-left: 4px solid #10b981;
        }

        .notification.error {
          border-left: 4px solid #ef4444;
        }

        .notification-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .notification.success .notification-content svg {
          color: #10b981;
        }

        .notification.error .notification-content svg {
          color: #ef4444;
        }

        .notification-content span {
          font-size: 15px;
          color: #1f2937;
          font-weight: 500;
        }

        .notification-close {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          transition: color 0.2s;
        }

        .notification-close:hover {
          color: #4b5563;
        }

        /* Responsive Design */
        @media (max-width: 968px) {
          .login-container {
            flex-direction: column;
          }

          .login-left {
            padding: 40px 30px;
            min-height: 300px;
          }

          .brand-title {
            font-size: 40px;
          }

          .brand-subtitle {
            font-size: 18px;
          }

          .login-right {
            padding: 40px 30px;
          }

          .notification {
            min-width: auto;
            left: 20px;
            right: 20px;
          }
        }

        @media (max-width: 480px) {
          .login-left {
            padding: 30px 20px;
          }

          .brand-title {
            font-size: 32px;
          }

          .brand-subtitle {
            font-size: 16px;
          }

          .login-right {
            padding: 30px 20px;
          }

          .form-title {
            font-size: 28px;
          }

          .notification {
            top: 20px;
            left: 15px;
            right: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;


      