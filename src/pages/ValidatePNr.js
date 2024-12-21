import React, { useState } from "react";
import { validatePNr } from "../services/legalServices";
import { useNavigate } from "react-router-dom";

const ValidatePNr = () => {
  const [countryCode, setCountryCode] = useState("");
  const [pnr, setPnr] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
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
        <button
          onClick={() => navigate("/crypto-algorithms")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Crypto Algorithms
        </button>
        &nbsp;
        &nbsp;
        <button
          onClick={() => navigate("/apply-id", { state: { countryCode, pnr } })}
          className={
            response
              ? "bg-blue-500 text-white px-4 py-2 rounded"
              : "bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          }
          disabled={!response}
        >
          Apply Id
        </button>
      </div>
    </div>
  );
};

export default ValidatePNr;
