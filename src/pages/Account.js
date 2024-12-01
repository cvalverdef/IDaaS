import React, { useState } from "react";
import { createAccount } from "../api";

const Account = () => {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "", mobile: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createAccount(formData);
      setMessage("Account created successfully!");
    } catch (error) {
      setMessage("Failed to create account. Please try again.");
    }
  };

  return (
    <div>
      <h1>Create Account</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input type="text" name="mobile" placeholder="Mobile" onChange={handleChange} />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Account;
