import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const AccountOnboardingSuccess = () => {
  const [confirmationCodeEmail, setConfirmationCodeEmail] = useState("");
  const [confirmationCodeSms, setConfirmationCodeSms] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const {state} = location
  const handleVerify = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/verify-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": state.token
        },
        body: JSON.stringify({ 
          confirmationCodeSms, 
          phoneNr: state.phoneNr, 
          confirmationCodeEmail, 
          email: state.email 
        }),
      });

      if (response.status === 200) {
        alert("Account verified successfully!");
      } else {
        const errorData = await response.json();
        setErrorMessage(`Verification failed. Errors: ${errorData.error
          .map((err) => `${err.type} - ${err.error}`)
          .join(", ")}`
      );
      }
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
