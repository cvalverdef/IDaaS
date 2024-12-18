import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {petitionId, petitionSignature} from "../services/legalServices";

const PetitionActions = () => {
  const [legalId, setLegalId] = useState("");
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const handlePetitionId = async () => {
    try {
      const result = await petitionId(legalId);
      setResponse(JSON.stringify(result));
    } catch (err) {
      setResponse("Error: " + err.message);
    }
  };

  const handlePetitionSignature = async () => {
    try {
      const result = await petitionSignature(legalId);
      setResponse(JSON.stringify(result));
    } catch (err) {
      setResponse("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Petition Actions</h2>
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
        onClick={handlePetitionId}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
      >
        Petition ID
      </button>
      <button
        onClick={handlePetitionSignature}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Petition Signature
      </button>

      {response && <div className="mt-4 p-2 bg-gray-100">{response}</div>}

      {/* Flow Buttons */}
      <div className="mt-4">
        <button
          onClick={() => navigate("/authorize-petition")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Authorize Access & Petition Review
        </button>
        <button
          onClick={() => navigate("/create-contract")}
          className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Proceed to Create Contract
        </button>
      </div>
    </div>
  );
};

export default PetitionActions;
