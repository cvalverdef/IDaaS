import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { applyId, getApplicationAttributes } from "../services/legalServices";
import { getCryptoAlgorithms } from "../services/cryptoServices";

const ApplyId = () => {
  const [localName, setLocalName] = useState("");
  const [namespace, setNamespace] = useState("");
  const [keyId, setKeyId] = useState("");
  const [keyPassword, setKeyPassword] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [response, setResponse] = useState(null);
  const [attributes, setAttributes] = useState(null);
  const [attValues, setAttValues] = useState({});
  const navigate = useNavigate();
  const [algorithms, setAlgorithms] = useState([]);

  useEffect(() => {
     (async () => {
          const result = await getCryptoAlgorithms();
          await fetchAttributes();
          if (result?.Algorithms) {
            setAlgorithms(result.Algorithms);
          } else {
            console.error("No valid data found in the response.");
          }
        })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await applyId(
        localName,
        namespace,
        keyId,
        keyPassword,
        accountPassword,
        attValues
      );
      setResponse(result);
    } catch (err) {
      console.error("Failed to apply ID.", err);
    }
  };

  const fetchAttributes = async () => {
    try {
      const result = await getApplicationAttributes();
      setAttributes(result);
    } catch (err) {
      console.error("Failed to fetch application attributes.", err);
    }
  };

  const navigateToAddAttachment = () => {
    // Pass necessary inherited data
    console.log(response.Identity.id)
    navigate("/add-id-attachment", {
      state: {
        localName,
        namespace,
        keyId,
        keyPassword,
        accountPassword,
        legalId: response?.Identity?.id || "", 
      },
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Apply ID</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Algorithm:</label>
          <select
            value={localName}
            onChange={(e) => {
              setLocalName(e.target.value)
              const namespaceObject = algorithms.find((item) => item.localName === e.target.value)
              setNamespace(namespaceObject.namespace)
            }}
            className="w-full border rounded px-2 py-1"
          >
            <option value="">Select Algorithm</option>
            {algorithms.map((algo, index) => (
              <option key={index} value={algo.localName}>
                {algo.localName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium">Key ID:</label>
          <input
            type="text"
            value={keyId}
            onChange={(e) => setKeyId(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Key Password:</label>
          <input
            type="password"
            value={keyPassword}
            onChange={(e) => setKeyPassword(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Account Password:</label>
          <input
            type="password"
            value={accountPassword}
            onChange={(e) => setAccountPassword(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Properties:</label>
          {attributes && 
            attributes.Required.map((a) => (
              <div key={a}>
                <label className="block font-medium">{a}</label>
                <input
                  type="text"
                  value={attValues[a] || ""}
                  onChange={(e) =>
                    setAttValues((prev) => ({
                      ...prev,
                      [a]: e.target.value,
                    }))
                  }
                  required
                  className="border p-2 w-full"
                />
              </div>
            ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Apply ID
        </button>
      </form>
      {response && (
        <pre className="mt-4 p-2 border">{JSON.stringify(response, null, 2)}</pre>
      )}

      <div className="mt-6 space-x-4">
        <button
          onClick={() => navigate("/validate-pnr")}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
         Validate PNr
        </button>
        <button
          onClick={navigateToAddAttachment}
          className={response?"bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600": "bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"}
          disabled={!response}
        >
          Add ID Attachment
        </button>
      </div>
    </div>
  );
};

export default ApplyId;
