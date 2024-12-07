import React, { useState } from "react";

const Login = () => {
  const [credentials, setCredentials] = useState({ userName: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
try {
  // Assuming Agent is exposed globally
  if (window.AgentAPI) {
    var response = await window.AgentAPI.Account.Login(credentials.userName,credentials.password,3600);
     console.log(response)
      if (response.jwt) {
        alert("Login successful!");
      } else {
        alert("Login failed. Please try again.");
      }
   
  } else {
    console.error("Agent.js is not loaded.");
  }
} catch (error) {
  alert(error.message)
}
    
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Name *</label>
          <input
            type="text"
            value={credentials.userName}
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, userName: e.target.value }))
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
