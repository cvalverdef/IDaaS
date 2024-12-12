import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid, refreshToken } from "./authService";

const SessionHandler = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleSession = async () => {
      const jwt = localStorage.getItem("jwt");
      if (!jwt || !isTokenValid(jwt)) {
        const newToken = await refreshToken();
        if (!newToken) {
          navigate("/login");
        }
      }
    };

    handleSession();
  }, [navigate]);

  return children;
};

export default SessionHandler;
