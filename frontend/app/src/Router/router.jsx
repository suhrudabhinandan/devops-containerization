// src/Router/router.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Components/Dashboard/Login";
import Home from "../Components/Home/Home";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />

  
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
