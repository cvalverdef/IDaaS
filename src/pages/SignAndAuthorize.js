import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {signData, getIdentities, getCreatedContracts, authorizeAccessToContract } from "../services/legalServices";

const SignAndAuthorize = () => {
  const [legalId, setLegalId] = useState("");
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const handleSignData = async () => {
    try {
      const result = await signData(legalId);
      setResponse(JSON.stringify(result));
    } catch (err) {
      setResponse("Error: " + err.message);
    }
  };

  const handleGetIdentities = async () => {
    try {
      const result = await getIdentities();
      setResponse(JSON.stringify(result));
    } catch (err) {
      setResponse("Error: " + err.message);
    }
  };

  const handleGetCreatedContracts = async () => {
    try {
      const result = await getCreatedContracts();
      setResponse(JSON.stringify(result));
    } catch (err) {
      setResponse("Error: " + err.message);
    }
  };

  const handleAuthorizeAccess = async () => {
    try {
      const result = await authorizeAccessToContract(legalId);
      setResponse(JSON.stringify(result));
    } catch (err) {
      setResponse("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sign and Authorize Actions</h2>
      <label className="block mb-2">
        Legal ID:
        <input
          type="text"
          value={legalId}
          onChange={(e) => setLegalId(e.target.value)}
          className="border px-2 py-1 rounded ml-2"
        />
      </label>
      <button
        onClick={handleSignData}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
      >
        Sign Data
      </button>
      <button
        onClick={handleGetIdentities}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
      >
        Get Identities
      </button>
      <button
        onClick={handleGetCreatedContracts}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
      >
        Get Created Contracts
      </button>
      <button
        onClick={handleAuthorizeAccess}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Authorize Access
      </button>

      {response && <div className="mt-4 p-2 bg-gray-100">{response}</div>}

      {/* Flow Buttons */}
      <div className="mt-4">
        <button
          onClick={() => navigate("/sign-contract")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Sign Contract
        </button>
      </div>
    </div>
  );
};

export default SignAndAuthorize;
