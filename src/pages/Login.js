import React, { useState } from "react";
import { expiredIn, saveJwt } from "../components/tokenStorage";
import { recoverAccount } from "../components/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
    eMail:"",
    phoneNr:"",
    personalNr:"",
    country:"",
  });
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryMessage, setRecoveryMessage] = useState("");
  const navigate = useNavigate();

  const handleRecover = async () => {
    try {
      const response = await recoverAccount(credentials);
      if (response) {
        setRecoveryMessage("Recovery email sent. Please check your inbox.");
      } else {
        setRecoveryMessage(response.message || "Failed to send recovery email.");
      }
    } catch (error) {
      setRecoveryMessage("An error occurred while processing your request.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (window.AgentAPI) {
        const response = await window.AgentAPI.Account.Login(
          credentials.userName,
          credentials.password,
          3600
        );
        if (response.jwt) {
          expiredIn(response.expires);
          const accountInfo = await window.AgentAPI.Account.Info();
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
      {!isRecovering ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>User Name *</label>
            <input
              type="text"
              value={credentials.userName}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  userName: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Password *</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsRecovering(true)}
            className="text-blue-600 py-2 px-4 ml-4"
          >
            Forgot Password?
          </button>
        </form>
      ) : (
        <div>
          <h2 className="text-lg font-semibold">Recover Account</h2>
          <div>
            <label>Email *</label>
            <input
              type="email"
              value={credentials.eMail}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  eMail: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>User Name *</label>
            <input
              type="text"
              value={credentials.userName}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  userName: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Personal Number *</label>
            <input
              type="text"
              value={credentials.personalNr}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  personalNr: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Country code *</label>
            <input
              type="text"
              value={credentials.country}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  country: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Phone Nr *</label>
            <input
              type="text"
              value={credentials.phoneNr}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  phoneNr: e.target.value,
                }))
              }
            />
          </div>
          <button
            onClick={handleRecover}
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Send Recovery Email
          </button>
          <button
            onClick={() => setIsRecovering(false)}
            className="text-blue-600 py-2 px-4 ml-4"
          >
            Back to Login
          </button>
          {recoveryMessage && <p className="text-red-500">{recoveryMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default Login;
