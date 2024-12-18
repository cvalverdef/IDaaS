import React, { useState } from "react";
import { signContract } from "../services/legalServices";

const SignContract = () => {
  const [localName, setLocalName] = useState("");
  const [namespace, setNamespace] = useState("");
  const [keyId, setKeyId] = useState("");
  const [keyPassword, setKeyPassword] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [contractId, setContractId] = useState("");
  const [legalId, setLegalId] = useState("");
  const [role, setRole] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!localName || !namespace || !keyId || !keyPassword || !accountPassword || !contractId || !legalId || !role) {
        setError("All fields are required.");
        return;
      }
      const result = await signContract(
        localName,
        namespace,
        keyId,
        keyPassword,
        accountPassword,
        contractId,
        legalId,
        role
      );
      setResponse(result);
    } catch (err) {
      setError("Failed to sign the contract. Please check your inputs.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Sign Contract</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Local Name:
          <input
            type="text"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            required
          />
        </label>
        <label>
          Namespace:
          <input
            type="text"
            value={namespace}
            onChange={(e) => setNamespace(e.target.value)}
            required
          />
        </label>
        <label>
          Key ID:
          <input
            type="text"
            value={keyId}
            onChange={(e) => setKeyId(e.target.value)}
            required
          />
        </label>
        <label>
          Key Password:
          <input
            type="password"
            value={keyPassword}
            onChange={(e) => setKeyPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Account Password:
          <input
            type="password"
            value={accountPassword}
            onChange={(e) => setAccountPassword(e.target.value)}
            required
          />
        </label>
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
        <button type="submit">Sign Contract</button>
      </form>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SignContract;
