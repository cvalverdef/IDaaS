import React, { useState } from "react";
import {
  authorizeAccessToId,
  petitionPeerReview,
} from "../services/legalServices";
import { Link, useNavigate } from "react-router-dom";

const AuthorizeAndPetition = () => {
  const [legalId, setLegalId] = useState("");
  const [accessResponse, setAccessResponse] = useState(null);
  const [petitionResponse, setPetitionResponse] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuthorizeAccess = async () => {
    try {
      const result = await authorizeAccessToId(legalId);
      setAccessResponse(result);
      setError("");
    } catch (err) {
      setError("Failed to authorize access.");
    }
  };

  const handlePetitionReview = async () => {
    try {
      const result = await petitionPeerReview(legalId);
      setPetitionResponse(result);
      setError("");
      navigate("/petition-id");
    } catch (err) {
      setError("Failed to petition peer review.");
    }
  };

  return (
    <div>
      <h2>Authorize Access & Petition Review</h2>
      <label>
        Legal ID:
        <input
          type="text"
          value={legalId}
          onChange={(e) => setLegalId(e.target.value)}
          required
        />
      </label>
      <button
        onClick={handleAuthorizeAccess}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Authorize Access
      </button>
      <button
        onClick={handlePetitionReview}
        className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Petition Peer Review
      </button>

      {accessResponse && <pre>{JSON.stringify(accessResponse, null, 2)}</pre>}
      {petitionResponse && (
        <pre>{JSON.stringify(petitionResponse, null, 2)}</pre>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="mt-4">
        <Link
          to="/service-providers-review"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Review Service
        </Link>
        <Link
          to="/petition-actions"
          className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Petition ID
        </Link>
      </div>
    </div>
  );
};

export default AuthorizeAndPetition;