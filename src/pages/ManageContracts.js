import React, { useState } from "react";
import {
  getCreatedContracts,
  getContract,
  authorizeAccessToContract,
} from "../services/legalServices";

const ManageContracts = () => {
  const [createdContracts, setCreatedContracts] = useState([]);
  const [signedContracts, setSignedContracts] = useState([]);
  const [contractId, setContractId] = useState("");
  const [legalId, setLegalId] = useState("");
  const [role, setRole] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const fetchCreatedContracts = async () => {
    setError("");
    try {
      const result = await getCreatedContracts();
      setCreatedContracts(result);
    } catch (err) {
      setError("Failed to fetch created contracts.");
      console.error(err);
    }
  };

  const fetchSignedContracts = async () => {
    setError("");
    try {
      const result = await getContract();
      setSignedContracts(result);
    } catch (err) {
      setError("Failed to fetch signed contracts.");
      console.error(err);
    }
  };

  const handleAuthorizeAccess = async () => {
    setError("");
    try {
      if (!contractId || !legalId || !role) {
        setError("Contract ID, Legal ID, and Role are required.");
        return;
      }
      const result = await authorizeAccessToContract(contractId, legalId, role);
      setResponse(result);
    } catch (err) {
      setError("Failed to authorize access to the contract.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Manage Contracts</h2>
      <button onClick={fetchCreatedContracts}>Fetch Created Contracts</button>
      <button onClick={fetchSignedContracts}>Fetch Signed Contracts</button>
      <div>
        <h3>Created Contracts</h3>
        {createdContracts.length > 0 ? (
          <ul>
            {createdContracts.map((contract, index) => (
              <li key={index}>
                ID: {contract.id}, Template ID: {contract.templateId}, Visibility:{" "}
                {contract.visibility}
              </li>
            ))}
          </ul>
        ) : (
          <p>No created contracts found.</p>
        )}
      </div>
      <div>
        <h3>Signed Contracts</h3>
        {signedContracts.length > 0 ? (
          <ul>
            {signedContracts.map((contract, index) => (
              <li key={index}>
                ID: {contract.id}, Legal ID: {contract.legalId}, Role: {contract.role}
              </li>
            ))}
          </ul>
        ) : (
          <p>No signed contracts found.</p>
        )}
      </div>
      <div>
        <h3>Authorize Access to Contract</h3>
        <label>
          Contract ID:
          <input
            type="text"
            value={contractId}
            onChange={(e) => setContractId(e.target.value)}
            required
          />
        </label>
        <label>
          Legal ID:
          <input
            type="text"
            value={legalId}
            onChange={(e) => setLegalId(e.target.value)}
            required
          />
        </label>
        <label>
          Role:
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </label>
        <button onClick={handleAuthorizeAccess}>Authorize Access</button>
        {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default ManageContracts;
