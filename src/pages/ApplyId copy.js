import React, { useState } from "react";
import { applyId } from "../services/legalServices";

const ApplyId = () => {
  const [localName, setLocalName] = useState("");
  const [namespace, setNamespace] = useState("");
  const [keyId, setKeyId] = useState("");
  const [keyPassword, setKeyPassword] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [properties, setProperties] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await applyId(
        localName,
        namespace,
        keyId,
        keyPassword,
        accountPassword,
        properties
      );
      setResponse(result);
    } catch (err) {
      console.error("Failed to apply ID.", err);
    }
  };

  return (
    <div>
      <h2>Apply ID</h2>
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
          Properties:
          <textarea
            value={properties}
            onChange={(e) => setProperties(e.target.value)}
          ></textarea>
        </label>
        <button type="submit">Apply ID</button>
      </form>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default ApplyId;
