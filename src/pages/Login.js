import React, { useState } from "react";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Assuming Agent is exposed globally
    if (window.Agent) {
      window.Agent.login(credentials.email, credentials.password, (response) => {
        console.log("Login Response:", response);
        if (response.success) {
          alert("Login successful!");
        } else {
          alert("Login failed. Please try again.");
        }
      });
    } else {
      console.error("Agent.js is not loaded.");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email *</label>
          <input
            type="email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, email: e.target.value }))
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
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
