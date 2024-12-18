import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AccountOnboardingSuccess = () => {
  const [confirmationCodeEmail, setConfirmationCodeEmail] = useState("");
  const [confirmationCodeSms, setConfirmationCodeSms] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const {state} = location
  const navigate = useNavigate();
  const handleVerify = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    

    try {
      // const response = await fetch("http://localhost:5000/verify-account", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "x-token": state.token
      //   },
      //   body: JSON.stringify({ 
      //     confirmationCodeSms, 
      //     phoneNr: state.phoneNr, 
      //     confirmationCodeEmail, 
      //     email: state.email 
      //   }),
      // });
      const verifyEmail = await window.AgentAPI.Account.VerifyEMail(state.email,confirmationCodeEmail);

      if (!verifyEmail) {
        alert("Email code verification error.");
      } 
      const verifySms = await window.AgentAPI.Account.VerifyPhoneNr(state.phoneNr,confirmationCodeSms);
      if (!verifySms) {
        alert("SMS code verification error.");
      }
      navigate("/login")
    } catch (err) {
      console.error("Verification error:", err);
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
      
    }
  };

  return (
    <div>
      <h2>Account Verification</h2>
      <form onSubmit={handleVerify}>
        <div>
          <label>Confirmation Code Email:</label>
          <input
            type="text"
            value={confirmationCodeEmail}
            onChange={(e) => setConfirmationCodeEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirmation Code SMS:</label>
          <input
            type="text"
            value={confirmationCodeSms}
            onChange={(e) => setConfirmationCodeSms(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default AccountOnboardingSuccess;
