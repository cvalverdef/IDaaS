import React, { useState } from "react";
import { recoverAccount } from "../components/authService";
import { useNavigate } from "react-router-dom";

const AccountCreateForm = () => {
  const [accountDetails, setAccountDetails] = useState({
    email: "",
    userName: "",
    password: "",
  });
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryMessage, setRecoveryMessage] = useState("");
  const navigate = useNavigate();

  const handleRecover = async () => {
    try {
      const response = await recoverAccount(recoveryEmail);
      if (response.success) {
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
        const response = await window.AgentAPI.Account.Create({
          email: accountDetails.email,
          userName: accountDetails.userName,
          password: accountDetails.password,
        });
        if (response.success) {
          alert("Account created successfully. Please log in.");
          navigate("/login");
        } else {
          alert(response.message || "Failed to create account. Please try again.");
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
      <h1 className="text-2xl font-bold mb-6">Create Account</h1>
      {!isRecovering ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email *</label>
            <input
              type="email"
              value={accountDetails.email}
              onChange={(e) =>
                setAccountDetails((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              required
            />
          </div>
          <div>
            <label>User Name *</label>
            <input
              type="text"
              value={accountDetails.userName}
              onChange={(e) =>
                setAccountDetails((prev) => ({
                  ...prev,
                  userName: e.target.value,
                }))
              }
              required
            />
          </div>
          <div>
            <label>Password *</label>
            <input
              type="password"
              value={accountDetails.password}
              onChange={(e) =>
                setAccountDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Create Account
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
              value={recoveryEmail}
              onChange={(e) => setRecoveryEmail(e.target.value)}
              required
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
            Back to Create Account
          </button>
          {recoveryMessage && <p className="text-red-500">{recoveryMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default AccountCreateForm;
