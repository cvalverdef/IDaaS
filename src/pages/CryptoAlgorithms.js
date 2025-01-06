import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCryptoAlgorithms, createCryptoKey, getPublicKey } from "../services/cryptoServices";

const CryptoAlgorithms = () => {
  const [algorithms, setAlgorithms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyParams, setKeyParams] = useState({ localName: "", keyPassword: "", accountPassword: "", keyId: "" });
  const [keyResult, setKeyResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const result = await getCryptoAlgorithms();
      if (result?.Algorithms) {
        setAlgorithms(result.Algorithms);
      } else {
        console.error("No valid data found in the response.");
      }
      setLoading(false);
    })();
    (async () => {
      const result = await getPublicKey();
      if (result?.key) {
        setPublicKey(result);
      }
    })();
  }, []);

  const handleCreateKey = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const { localName, keyPassword, accountPassword, keyId } = keyParams;
    if (!localName || !keyPassword || !accountPassword || !keyId) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const result = await createCryptoKey({ localName, keyPassword, accountPassword, keyId });
      if (result) {
        setKeyResult(result);
        setErrorMessage("");
        setTimeout(() => {
          navigate("/validate-pnr", { state: {...result, ...keyParams } });
        }, 3000)
      } else {
        setErrorMessage("Failed to create the crypto key. Please check your inputs.");
      }
    } catch (error) {
      setErrorMessage("Error creating crypto key: " + error.message);
    }
  };

  // const navigateToValidatePNr = () => {
  //   const inheritedData = {
  //     keyParams,
  //     algorithms,
  //   };
  //   navigate("/validate-pnr", { state: inheritedData });
  // };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-xl font-bold mb-4">Supported Cryptographic Algorithms</h1>
      {loading ? (
        <p>Loading...</p>
      ) : algorithms.length > 0 ? (
        <ul className="list-disc list-inside">
          {algorithms.map((algo, index) => (
            <li key={index} className="text-sm">
              <span className="font-bold">{algo.localName}</span>: {algo.namespace}
              {algo.safe && <span className="text-green-500 ml-2">(Safe)</span>}
              {algo.slow && <span className="text-red-500 ml-2">(Slow)</span>}
              <span className="ml-2">Strength: {algo.securityStrength}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No algorithms found.</p>
      )}

      <h2 className="text-lg font-bold mt-8">Create a Crypto Key</h2>
      <form onSubmit={handleCreateKey} className="mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Algorithm:</label>
          <select
            value={keyParams.localName}
            onChange={(e) => setKeyParams({ ...keyParams, localName: e.target.value })}
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Key Id:</label>
          <input
            type="text"
            value={keyParams.keyId}
            onChange={(e) => setKeyParams({ ...keyParams, keyId: e.target.value })}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Key Password:</label>
          <input
            type="password"
            value={keyParams.keyPassword}
            onChange={(e) => setKeyParams({ ...keyParams, keyPassword: e.target.value })}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Account Password:</label>
          <input
            type="password"
            value={keyParams.accountPassword}
            onChange={(e) => setKeyParams({ ...keyParams, accountPassword: e.target.value })}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Key
        </button>
      </form>

      {errorMessage && (
        <div className="text-red-500 mt-4">
          <p>{errorMessage}</p>
        </div>
      )}

      {keyResult && (
        <div className="mt-4">
          <h3 className="text-md font-bold">Key Creation Result:</h3>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(keyResult, null, 2)}</pre>
        </div>
      )}
      {publicKey && (
        <div className="mt-4">
          <h3 className="text-md font-bold">Public Key:</h3>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(publicKey, null, 2)}</pre>
        </div>
      )}

      {/* New Buttons 
      <div className="mt-8">
        <button
          onClick={navigateToValidatePNr}
          className={keyResult?"bg-blue-500 text-white px-4 py-2 rounded":"bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"}
          disabled={!keyResult}
        >
          Validate PNr
        </button>
      </div>*/}
    </div>
  );
};

export default CryptoAlgorithms;
