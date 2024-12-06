import React, { useState } from "react";
import { createAccount } from "../api";

const Account = () => {
  const [formData, setFormData] = useState({
    PUserName: "",
    PEMail: "",
    PPassword: "",
    PPhoneNr: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createAccount(formData);
      setMessage("Account created successfully!");
      console.log(result);
    } catch (error) {
      setMessage("Failed to create account. Please try again.");
    }
  };

  return (
    <div>
      <h1>Create Account</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="PUserName"
          placeholder="Username"
          value={formData.PUserName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="PEMail"
          placeholder="Email"
          value={formData.PEMail}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="PPassword"
          placeholder="Password"
          value={formData.PPassword}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="PPhoneNr"
          placeholder="Phone Number (Optional)"
          value={formData.PPhoneNr}
          onChange={handleChange}
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Account;
