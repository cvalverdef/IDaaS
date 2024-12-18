import React, { useEffect, useState } from "react";
import { createContract } from "../services/legalServices";
import { useNavigate } from "react-router-dom";

const CreateContract = () => {
  const [templateId, setTemplateId] = useState("");
  const [visibility, setVisibility] = useState("");
  const [parts, setParts] = useState([{ role: "", legalId: "" }]);
  const [parameters, setParameters] = useState([{ name: "", value: "" }]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    (async () => {
      try {
        if (window.AgentAPI) {
          // var Response =
          //   await window.AgentAPI.Legal.GetServiceProvidersForIdReview();;
          // console.log(JSON.stringify(Response));
        }
      } catch (error) {
        console.log("erro de chamada", error)
      }
    })();
  }, []);
  const handleAddPart = () => {
    setParts([...parts, { role: "", legalId: "" }]);
  };

  const handleAddParameter = () => {
    setParameters([...parameters, { name: "", value: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await createContract(
        templateId,
        visibility,
        parts,
        parameters
      );
      setResponse(result);
    } catch (err) {
      setError("Failed to create contract. Please check your inputs.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Create Contract</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Template ID:
          <input
            type="text"
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            required
          />
        </label>
        <label>
          Visibility:
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            required
          >
            <option value={null}>Select Visibility</option>
            <option value="CreatorAndParts">Creator and Parts</option>
            <option value="DomainAndParts">Domain and Parts</option>
            <option value="Public">Public</option>
            <option value="PublicSearchable">Public and Searchable</option>
          </select>
        </label>
        <div>
          <h4>Parts</h4>
          {parts.map((part, index) => (
            <div key={index}>
              <label>
                Role:
                <input
                  type="text"
                  value={part.role}
                  onChange={(e) => {
                    const updatedParts = [...parts];
                    updatedParts[index].role = e.target.value;
                    setParts(updatedParts);
                  }}
                  required
                />
              </label>
              <label>
                Legal ID:
                <input
                  type="text"
                  value={part.legalId}
                  onChange={(e) => {
                    const updatedParts = [...parts];
                    updatedParts[index].legalId = e.target.value;
                    setParts(updatedParts);
                  }}
                  required
                />
              </label>
            </div>
          ))}
          <button type="button" onClick={handleAddPart}>
            Add Part
          </button>
        </div>
        <div>
          <h4>Parameters</h4>
          {parameters.map((parameter, index) => (
            <div key={index}>
              <label>
                Name:
                <input
                  type="text"
                  value={parameter.name}
                  onChange={(e) => {
                    const updatedParameters = [...parameters];
                    updatedParameters[index].name = e.target.value;
                    setParameters(updatedParameters);
                  }}
                  required
                />
              </label>
              <label>
                Value:
                <input
                  type="text"
                  value={parameter.value}
                  onChange={(e) => {
                    const updatedParameters = [...parameters];
                    updatedParameters[index].value = e.target.value;
                    setParameters(updatedParameters);
                  }}
                  required
                />
              </label>
            </div>
          ))}
          <button type="button" onClick={handleAddParameter}>
            Add Parameter
          </button>
        </div>
        <button type="submit">Create Contract</button>
      </form>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="mt-4">
        <button
          onClick={() => navigate("/petition-action")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Petition Action
        </button>
        <button
          onClick={() =>
            navigate("/identity-management", {
              state: { templateId, visibility, parts, parameters },
            })
          }
          className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Identity Management
        </button>
      </div>
    </div>
  );
};

export default CreateContract;
