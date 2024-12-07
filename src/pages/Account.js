import React, { useState } from "react";
import { createAccount } from "../api";

const Account = () => {
  const [formData, setFormData] = useState({ userName:"", eMail:"", phoneNr:"", password:"", signature:"", nonce:""  });
  const [message, setMessage] = useState("");
  const host = "mateo.lab.tagroot.io"
  const apiKey = "9b8d5e91384b0430065ca3651daf156c3b1973b0abb704ab2873663f49cc3470"
  const secret = "de417718959ab40c6cab3b109f01a6f285a2241da7ce87cb0a5348c853617fb1"
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     // Prepare the data for signing
     const nonce = await generateNonce();
     const s = formData.phoneNr
       ? `${formData.userName}:${host}:${formData.eMail}:${formData.phoneNr}:${formData.password}:${apiKey}:${nonce}`
       : `${formData.userName}:${host}:${formData.eMail}:${formData.password}:${apiKey}:${nonce}`; 
      formData.signature = await sign(secret, s);
      formData.nonce = nonce;
      
    try {
      await createAccount(formData);
      setMessage("Account created successfully!");
    } catch (error) {
      setMessage("Failed to create account. Please try again.");
    }
  };

  const sign = async (key, data) => {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(key);
    const dataToSign = encoder.encode(data);
  
    const cryptoKey = await crypto.subtle.importKey(
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

  // Utility function to generate a nonce (random string)
const generateNonce = () => {
  const array = new Uint8Array(32); // Generate a random 32-byte array
  window.crypto.getRandomValues(array); // Use the Web Crypto API to generate random values
  return btoa(String.fromCharCode(...array)); // Convert to base64 string
};

  return (
    <div>
      <h1>Create Account</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
        <input type="text" name="userName" placeholder="User Name" onChange={handleChange} />
        <input type="email" name="eMail" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input type="text" name="phoneNr" placeholder="Mobile Number with + sign" onChange={handleChange} />
        <button type="submit">Create Account</button>
        </div>
      </form>
    </div>
  );
};

export default Account;
