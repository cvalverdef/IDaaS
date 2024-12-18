import React, { useState } from "react";
import { validatePNr } from "../services/legalServices";
import { Link } from "react-router-dom";

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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Validate
        </button>
      </form>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="mt-4">
        <Link
          to="/crypto-algorithms"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Crypto Algorithms
        </Link>
        <Link
          to={{
            pathname: "/getappattributes",
            state: { countryCode, pnr },
          }}
          className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Get App Attributes
        </Link>
      </div>
    </div>
  );
};

export default ValidatePNr;
