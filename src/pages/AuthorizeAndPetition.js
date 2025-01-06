import React, { useState, useEffect } from "react";
import { authorizeAccessToId, petitionPeerReview } from "../services/legalServices";
import { Link, useNavigate, useLocation } from "react-router-dom";

const AuthorizeAndPetition = () => {
  const [legalId, setLegalId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const [purpose, setPurpose] = useState("");
  const [accessResponse, setAccessResponse] = useState(null);
  const [petitionResponse, setPetitionResponse] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    if (state) {
      console.log("Location state:", state);
      setLegalId(state.legalId || "");
      const objectJID = state.Identity?.property?.find((p) => p.name === "JID");
      if (objectJID) {
        setRemoteId(objectJID.value);
      }
    } else {
      console.warn("Location state is undefined.");
    }
  }, [state]);

  const handleAuthorizeAccess = async () => {
    try {
      const result = await authorizeAccessToId(legalId, "2f0de79a-ffe2-4fbe-8015-47e7774321e1@legal.mateo.lab.tagroot.io", false);
      setAccessResponse(result);
      setError("");
      console.log("Authorize access response:", result);
    } catch (err) {
      console.error("Authorize access error:", err);
      setError("Failed to authorize access. Please check your inputs or try again later.");
    }
  };

  const handlePetitionReview = async () => {
    try {
      console.log("Petition inputs:", {
        localName: state?.localName,
        namespace: state?.namespace,
        keyId: state?.keyId,
        keyPassword: state?.keyPassword,
        accountPassword: state?.accountPassword,
        legalId: state?.legalId,
        remoteId,
        purpose,
      });

      const result = await petitionPeerReview(
        state?.localName,
        state?.namespace,
        state?.keyId,
        state?.keyPassword,
        state?.accountPassword,
        state?.legalId,
        "2f0de79a-ffe2-4fbe-8015-47e7774321e1@legal.mateo.lab.tagroot.io",
        state?.keyId,
        purpose
      );

      setPetitionResponse(result);
      setError("");
      console.log("Petition peer review response:", result);
      navigate("/petition-id");
    } catch (err) {
      console.error("Petition peer review error:", err);
      setError(
        `Failed to petition peer review. Error: ${err?.message || "Unknown error"}`
      );
    }
  };

  return (
    <div>
      <h2>Authorize Access & Petition Review</h2>

      <div>
        <label className="block font-medium">Purpose:</label>
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

      {accessResponse && (
        <pre className="bg-gray-100 p-2 mt-4 rounded">
          {JSON.stringify(accessResponse, null, 2)}
        </pre>
      )}

      {petitionResponse && (
        <pre className="bg-gray-100 p-2 mt-4 rounded">
          {JSON.stringify(petitionResponse, null, 2)}
        </pre>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}

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
