import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getJwt, clearJwt } from "../components/authService";

const AutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = getJwt();

    if (!jwt) return;

    const payload = JSON.parse(atob(jwt.split(".")[1]));
    const expirationTime = payload.exp * 1000 - Date.now();

    const timer = setTimeout(() => {
      clearJwt();
      navigate("/login");
    }, expirationTime);

    return () => clearTimeout(timer);
  }, [navigate]);

  return null;
};

export default AutoLogout;
