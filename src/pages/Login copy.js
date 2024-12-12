import React, { useState } from "react";
import { expiredIn, saveJwt } from "../components/tokenStorage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (window.AgentAPI) {
        var response = await window.AgentAPI.Account.Login(
          credentials.userName,
          credentials.password,
          3600
        );
        if (response.jwt) {
          expiredIn(response.expires)
          var accountInfo = await window.AgentAPI.Account.Info();
          if (accountInfo) {
            localStorage.setItem("user", JSON.stringify(accountInfo));
          }
          saveJwt(response.jwt);
          navigate("/dashboard");
          navigate(0);
        } else {
          alert("Login failed. Please try again.");
        }
      } else {
        console.error("Agent.js is not loaded.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Name *</label>
          <input
            type="text"
            value={credentials.userName}
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, userName: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Password *</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
