import React, { useEffect, useState } from "react";
import { addIdAttachment, readyForApproval } from "../services/legalServices";
import { getCryptoAlgorithms } from "../services/cryptoServices";
import { Link, useNavigate, useLocation } from "react-router-dom";

const AddIdAttachment = () => {
  const [localName, setLocalName] = useState("");
  const [namespace, setNamespace] = useState("");
  const [keyId, setKeyId] = useState("");
  const [keyPassword, setKeyPassword] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [legalId, setLegalId] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [contentType, setContentType] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [_algorithms, setAlgorithms] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const handleApproval = async (e) => {
    try {
      await readyForApproval(legalId);
      navigate("/service-providers-review", { state: { ...response, 
        localName,
        namespace,
        keyId,
        keyPassword,
        accountPassword,
        legalId: response?.Identity?.id || "", 
       } })
    } catch (error) {
      alert(`Approval Error: ${error}`)
      navigate("/ready-approval", {
        states: {
          legalId
        }
      })
    }

  }

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    console.log(uploadedFile);
    setFile(uploadedFile);
    setFileName(uploadedFile.name);
    setContentType(uploadedFile.type);
  };

  const handleAddAttachment = async () => {
    setError("");
    if (!file) {
      setError("Please upload a file.");
      return;
    }

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const result = reader.result.split(",")[1];
          resolve(result);
        };
        reader.onerror = reject;
      });

    const attachment = await toBase64(file);

    try {
      const result = await addIdAttachment(
        localName,
        namespace,
        keyId,
        keyPassword,
        accountPassword,
        legalId,
        attachment, // Only the base64 content is sent
        fileName,
        contentType
      );
      setResponse(result);
    } catch (err) {
      setError("Failed to add ID attachment. Please check your inputs.");
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(location.state);
    setLocalName(location.state.localName);
    setNamespace(location.state.namespace);
    setKeyId(location.state.keyId);
    setAccountPassword(location.state.accountPassword);
    setKeyPassword(location.state.keyPassword);
    setLegalId(location.state.legalId);
      (async () => {
        const result = await getCryptoAlgorithms();
        if (result?.Algorithms) {
          setAlgorithms(result.Algorithms);
        } else {
          console.error("No valid data found in the response.");
        }
      })();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2>Add ID Attachment</h2>
      <div className="block text-sm font-medium mb-1">
        <label className="block font-medium">File Attachment:</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        type="submit"
        onClick={handleAddAttachment}
      >
        Add Attachment
      </button>

      {/* Flow Buttons */}
      <div className="mt-4">
        <Link
          to="/apply-id"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Apply ID
        </Link>
        <button
          onClick={handleApproval}
          className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          disabled={response === null}
        >
          Ready for Approval
        </button>
      </div>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddIdAttachment;
