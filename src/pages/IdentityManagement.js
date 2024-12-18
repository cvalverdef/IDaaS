import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {getContract, getIdentity} from "../services/legalServices";

const IdentityManagement = () => {
  const [legalId, setLegalId] = useState("");
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const handleGetIdentity = async () => {
    try {
      const result = await getIdentity(legalId);
      setResponse(JSON.stringify(result));
    } catch (err) {
      setResponse("Error: " + err.message);
    }
  };

  const handleGetContract = async () => {
    try {
      const result = await getContract(legalId);
      setResponse(JSON.stringify(result));
    } catch (err) {
      setResponse("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Identity and Contract Management</h2>
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
        onClick={handleGetIdentity}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
      >
        Get Identity
      </button>
      <button
        onClick={handleGetContract}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Get Contract
      </button>

      {response && <div className="mt-4 p-2 bg-gray-100">{response}</div>}

      {/* Flow Buttons */}
      <div className="mt-4">
        <button
          onClick={() => navigate("/create-contract")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Create Contract
        </button>
        <button
          onClick={() => navigate("/sign-contract")}
          className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Proceed to Sign Contract
        </button>
      </div>
    </div>
  );
};

export default IdentityManagement;
