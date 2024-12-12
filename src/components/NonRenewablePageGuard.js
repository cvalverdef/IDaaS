// src/components/NonRenewablePageGuard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { clearJwt, getJwt } from "./authService";

const NonRenewablePageGuard = ({ children }) => {
  const navigate = useNavigate();
  const jwt = getJwt();

  if (!jwt) {
    clearJwt();
    navigate("/login");
    return null;
  }

  return children;
};

export default NonRenewablePageGuard;
