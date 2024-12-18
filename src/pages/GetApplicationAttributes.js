import React, { useState } from "react";
import { getApplicationAttributes } from "../services/legalServices";
import { Link } from "react-router-dom";

const GetApplicationAttributes = () => {
  const [attributes, setAttributes] = useState(null);
  const [error, setError] = useState("");

  const fetchAttributes = async () => {
    try {
      const result = await getApplicationAttributes();
      setAttributes(result);
    } catch (err) {
      setError("Failed to fetch application attributes.");
    }
  };

  return (
    <div>
      <h2>Get Application Attributes</h2>
      <button
        onClick={fetchAttributes}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Fetch Attributes
      </button>
      {attributes && <pre>{JSON.stringify(attributes, null, 2)}</pre>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="mt-4">
        <Link
          to="/validate-pnr"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Validate PNr
        </Link>
        <Link
          to={{
            pathname: "/apply-id",
            state: { attributes },
          }}
          className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Apply Id
        </Link>
      </div>
    </div>
  );
};

export default GetApplicationAttributes;
