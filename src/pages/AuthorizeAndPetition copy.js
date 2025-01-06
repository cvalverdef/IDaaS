import React, { useState, useEffect } from "react";
import {
  authorizeAccessToId,
  petitionPeerReview,
} from "../services/legalServices";
import { Link, useNavigate, useLocation } from "react-router-dom";

const AuthorizeAndPetition = () => {
  const [legalId, setLegalId] = useState("");
  const [accessResponse, setAccessResponse] = useState(null);
  const [petitionResponse, setPetitionResponse] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [remoteId, setRemoteId] = useState("");
  const state = location.state;
  const [purpose, setPurpose] = useState("");

  const handleAuthorizeAccess = async () => {
    try {
      const result = await authorizeAccessToId(legalId, remoteId, false);
      setAccessResponse(result);
      setError("");
    } catch (err) {
      setError("Failed to authorize access.");
    }
  };

  const handlePetitionReview = async () => {
    try {
      console.log(state.localName,
        state.namespace,
        state.keyId,
        state.keyPassword,
        state.accountPassword,
        state.legalId,
        remoteId,
        state.keyId,
        purpose);
      const result = await petitionPeerReview(state.localName,
        state.namespace,
        state.keyId,
        state.keyPassword,
        state.accountPassword,
        state.legalId,
        remoteId,
        state.keyId,
        purpose);
      setPetitionResponse(result);
      setError("");
      navigate("/petition-id");
    } catch (err) {
      console.log(err);
      setError("Failed to petition peer review.");
    }
  };

  useEffect(() => {
    console.log(state);
    setLegalId(location.state.legalId)
    const objectJID = location.state.Identity.property.find((p) => p.name === "JID")
    if (objectJID) {
      setRemoteId(objectJID.value)
    }
  }, [])

  return (
    <div>
      <h2>Authorize Access & Petition Review</h2>
      <div>
      <label className="block font-medium">
          Purpose:
        </label>
        <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
            className="border p-2 w-full"
          />
      </div>
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
