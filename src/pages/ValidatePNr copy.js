import React, { useState } from "react";
import { validatePNr } from "../services/legalServices";

const ValidatePNr = () => {
  const [countryCode, setCountryCode] = useState("");
  const [pnr, setPnr] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await validatePNr(countryCode, pnr);
      setResponse(result);
    } catch (err) {
      setError("Failed to validate PNr.");
    }
  };

  return (
    <div>
      <h2>Validate PNr</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Country Code:
          <input
            type="text"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            required
          />
        </label>
        <label>
          PNr:
          <input
            type="text"
            value={pnr}
            onChange={(e) => setPnr(e.target.value)}
            required
          />
        </label>
        <button type="submit">Validate</button>
      </form>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ValidatePNr;
