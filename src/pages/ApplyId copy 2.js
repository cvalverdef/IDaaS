import React, { useState } from "react";
import { applyId } from "../services/legalServices";
import { Link } from "react-router-dom";

const ApplyId = () => {
  const [formData, setFormData] = useState({
    idType: "",
    attributes: {},
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await applyId(formData);
      setResponse(result);
    } catch (err) {
      setError("Failed to apply ID.");
    }
  };

  return (
    <div>
      <h2>Apply ID</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID Type:
          <input
            type="text"
            value={formData.idType}
            onChange={(e) =>
              setFormData({ ...formData, idType: e.target.value })
            }
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply ID
        </button>
      </form>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="mt-4">
        <Link
          to="/getappattributes"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Get App Attributes
        </Link>
        <Link
          to={{
            pathname: "/addidattachment",
            state: { idType: formData.idType },
          }}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add ID Attachment
        </Link>
      </div>
    </div>
  );
};

export default ApplyId;
