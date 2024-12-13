import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { recoverAccount } from "./authService"; 

const Recover = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRecover = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await recoverAccount(email);
      if (response?.success) {
        setMessage("Recovery email sent. Please check your inbox.");
        setTimeout(() => navigate("/login"), 5000); // Redirect to login after a delay
      } else {
        setMessage(response?.message || "Failed to send recovery email.");
      }
    } catch (error) {
      setMessage("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-lg font-bold mb-4">Recover Account</h2>
      <form onSubmit={handleRecover} className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Enter your registered email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
          />
        </div>
        {message && <p className="text-center text-blue-500">{message}</p>}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Send Recovery Email"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Recover;
