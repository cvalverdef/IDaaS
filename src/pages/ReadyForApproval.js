import React, { useEffect, useState } from "react";
import { readyForApproval } from "../services/legalServices";
import { Link, useNavigate, useLocation } from "react-router-dom";

const ReadyForApproval = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [legalId, setLegalId] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    setLegalId(location?.states?.legalId | "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleReadyForApproval = async () => {
    try {
      const result = await readyForApproval(legalId);
      setResponse(result);
      setError("");
      navigate("/service-providers-review", {
        state: { legalId },
      });
    } catch (err) {
      setError("Failed to mark ready for approval.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2>Ready for Approval</h2>

      <div className="block text-sm font-medium mb-1">
        <label className="block font-medium">Legal ID:</label>
        <input
          type="text"
          value={legalId}
          onChange={(e) => setLegalId(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <button
        onClick={handleReadyForApproval}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Mark Ready for Approval
      </button>

      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Flow Buttons */}
      <div className="mt-4">
        <Link
          to="/add-id-attachment"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Add ID Attachment
        </Link>
        <button
          onClick={() => {
            navigate("/service-providers-review", {
              state: location.state,
            })
          }}
          className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Service Providers Review
        </button>
      </div>
    </div>
  );
};

export default ReadyForApproval;
