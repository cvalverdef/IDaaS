import React, { useState } from "react";

// Use the global Agent object loaded via the script
const NeuronAgent = window.AgentAPI;

if (!NeuronAgent) {
  console.error(
    "NeuronAgent is not loaded. Ensure Agent.js is correctly included in index.html."
  );
}

const NeuronAccountManager = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // Use the global NeuronAgent object directly
  const agent = NeuronAgent;

  // API Calls
  const fetchDomainInfo = async () => {
    try {
      const result = await agent.Account.DomainInfo("en");
      setResponse(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const createAccount = async () => {
    try {
      const result = await agent.Account.Create(
        "username",
        "user@example.com",
        "+1234567890",
        "securepassword123",
        "YOUR_API_KEY",
        "YOUR_SECRET",
        3600
      );
      setResponse(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const getSessionToken = async () => {
    try {
      const result = await agent.Account.GetSessionToken();
      setResponse(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyEmail = async () => {
    try {
      const result = await agent.Account.VerifyEMail(
        "user@example.com",
        "verification-code"
      );
      setResponse(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyPhone = async () => {
    try {
      const result = await agent.Account.VerifyPhoneNr(
        "+1234567890",
        "verification-code"
      );
      setResponse(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const login = async () => {
    try {
      const result = await agent.Account.Login("username", "password123", 3600);
      setResponse(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const quickLogin = async () => {
    try {
      const result = await agent.Account.QuickLogin(3600);
      setResponse(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const refreshSession = async () => {
    try {
      const result = await agent.Account.Refresh(3600);
      setResponse(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = async () => {
    try {
      const result = await agent.Account.Logout();
      setResponse(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const recoverAccount = async () => {
    try {
      const result = await agent.Account.Recover(
        "username",
        "1234567890",
        "US",
        "user@example.com",
        "+1234567890"
      );
      setResponse(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const authenticateJwt = async () => {
    try {
      const result = await agent.Account.AuthenticateJwt("jwt-token");
      setResponse(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchAccountInfo = async () => {
    try {
      const result = await agent.Account.Info();
      setResponse(result);
    } catch (err) {
      setError(err.message);
    }
  };

  // Render UI
  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Neuron Account Manager</h1>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={fetchDomainInfo}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Fetch Domain Info
        </button>
        <button
          onClick={createAccount}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Account
        </button>
        <button
          onClick={getSessionToken}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Get Session Token
        </button>
        <button
          onClick={verifyEmail}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Verify Email
        </button>
        <button
          onClick={verifyPhone}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Verify Phone
        </button>
        <button
          onClick={login}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <button
          onClick={quickLogin}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Quick Login
        </button>
        <button
          onClick={refreshSession}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Refresh Session
        </button>
        <button
          onClick={logout}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Logout
        </button>
        <button
          onClick={recoverAccount}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Recover Account
        </button>
        <button
          onClick={authenticateJwt}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Authenticate JWT
        </button>
        <button
          onClick={fetchAccountInfo}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Fetch Account Info
        </button>
      </div>

      <div className="mt-8">
        {response && (
          <div className="p-4 bg-green-100 border border-green-400 rounded">
            <h2 className="text-lg font-bold">Response</h2>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-100 border border-red-400 rounded">
            <h2 className="text-lg font-bold">Error</h2>
            <pre>{error}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default NeuronAccountManager;
