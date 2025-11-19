import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";


const Home = () => {
  
  const token = useSelector((state) => state.auth.token);

  if (token) {
    return <Navigate to="/LandingPage" replace />;
  }


  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default Home;
