// src/components/protectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { getJwt } from "./authService";

const ProtectedRoute = ({ children }) => {
  const jwt = getJwt();
  return jwt ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
