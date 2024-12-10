import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // To handle navigation

// Utility function to generate a nonce (random string)
const generateNonce = () => {
  const array = new Uint8Array(32); // Generate a random 32-byte array
  window.crypto.getRandomValues(array); // Use the Web Crypto API to generate random values
  return btoa(String.fromCharCode(...array)); // Convert to base64 string
};

// Function to sign data using HMAC SHA-256
const sign = async (key, data) => {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const dataToSign = encoder.encode(data);

  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"]
  );

  const signature = await window.crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    dataToSign
  );

  const signatureArray = new Uint8Array(signature);
  return btoa(String.fromCharCode(...signatureArray)); // Convert to base64 string
};

const AccountCreateForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNr, setPhoneNr] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const apiKey =
    "9b8d5e91384b0430065ca3651daf156c3b1973b0abb704ab2873663f49cc3470"; // Your API key for authorization
  const secret =
    "de417718959ab40c6cab3b109f01a6f285a2241da7ce87cb0a5348c853617fb1"; // Your secret key for signature
  const host = "mateo.lab.tagroot.io"; // API host

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const nonce = generateNonce();
    const s = phoneNr
      ? `${username}:${host}:${email}:${phoneNr}:${password}:${apiKey}:${nonce}`
      : `${username}:${host}:${email}:${password}:${apiKey}:${nonce}`;

    try {
      const signature = await sign(secret, s);

      // Prepare the payload
      const payload = {
        userName: username,
        eMail: email,
        phoneNr,
        password,
        apiKey,
        nonce,
        signature,
        seconds: 3600, // JWT expiry time in seconds
      };

      // Sending the POST request to the external API endpoint
      const response = await fetch(`https://mateo.lab.tagroot.io/Agent/Account/Create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      // Handle the API response
      if (response.ok) {
        const responseData = await response.json();
        console.log("Account created:", responseData);

        // Redirect to success page with confirmation code
        navigate("/verify-account", { state: { confirmationCode: responseData.confirmationCode, phoneNr, email, token: responseData.jwt  } });
      } else {
        const content = await response.text();
        setErrorMessage(`Error: ${response.status} - ${content}`);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default AccountCreateForm;
