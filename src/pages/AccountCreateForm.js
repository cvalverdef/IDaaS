import React, { useState } from "react";
import { recoverAccount } from "../components/authService";
import { useNavigate } from "react-router-dom";

const AccountCreateForm = () => {

  const apiKey =
    "9b8d5e91384b0430065ca3651daf156c3b1973b0abb704ab2873663f49cc3470";
  const secret =
    "de417718959ab40c6cab3b109f01a6f285a2241da7ce87cb0a5348c853617fb1";

  const [accountDetails, setAccountDetails] = useState({
    email: "",
    userName: "",
    password: "",
  });
  const [phoneNr, setPhoneNr] = useState("");
  const [password, setPassword] = useState("");
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
        const response = await window.AgentAPI.Account.Create(
          accountDetails.userName,
          accountDetails.email,
          phoneNr,
          password,
          apiKey,
          secret,
          3600
        );
        if (response  ) {
          alert("Account created successfully. Please verify account.");
          navigate("/verify-account", { state: { confirmationCode: "", phoneNr, email: accountDetails.email, token: response.jwt  } });
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
              value={password}
              onChange={(e) => setPassword(e.target.value)
              }
              required
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              value={phoneNr}
              onChange={(e) => setPhoneNr(e.target.value)}
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
