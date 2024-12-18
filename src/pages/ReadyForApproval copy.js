import React, { useState } from "react";
import { readyForApproval } from "../services/legalServices";

const ReadyForApproval = () => {
  const [legalId, setLegalId] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleReadyForApproval = async () => {
    setError("");
    try {
      const result = await readyForApproval(legalId);
      setResponse(result);
    } catch (err) {
      setError("Failed to mark ready for approval.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Ready for Approval</h2>
      <label>
        Legal ID:
        <input
          type="text"
          value={legalId}
          onChange={(e) => setLegalId(e.target.value)}
        />
      </label>
      <button onClick={handleReadyForApproval}>Mark as Ready</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ReadyForApproval;
