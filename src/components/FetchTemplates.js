import React, { useState } from "react";
import { getTemplates, createTemplate } from "../services/legalServices";

const FetchTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [templateName, setTemplateName] = useState("");
  const [visibility, setVisibility] = useState("Creator and Parts");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  // Fetch Existing Templates
  const handleFetchTemplates = async () => {
    setError("");
    try {
      const result = await getTemplates();
      setTemplates(result.templates || []);
    } catch (err) {
      setError("Failed to fetch templates.");
      console.error(err);
    }
  };

  // Create New Template
  const handleCreateTemplate = async () => {
    setError("");
    if (!templateName) {
      setError("Template name is required.");
      return;
    }
    try {
      const result = await createTemplate(templateName, visibility);
      setResponse(result);
      handleFetchTemplates(); // Refresh templates after creation
    } catch (err) {
      setError("Failed to create template.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Manage Templates</h2>
      <button onClick={handleFetchTemplates}>Fetch Existing Templates</button>
      <div>
        {templates.length > 0 ? (
          <ul>
            {templates.map((template, index) => (
              <li key={index}>
                Template ID: {template.id}, Name: {template.name}, Visibility:{" "}
                {template.visibility}
              </li>
            ))}
          </ul>
        ) : (
          <p>No templates found.</p>
        )}
      </div>
      <h3>Create New Template</h3>
      <label>
        Template Name:
        <input
          type="text"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
      </label>
      <label>
        Visibility:
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        >
          <option value="Creator and Parts">Creator and Parts</option>
          <option value="Domain and Parts">Domain and Parts</option>
          <option value="Public">Public</option>
          <option value="Public and Searchable">Public and Searchable</option>
        </select>
      </label>
      <button onClick={handleCreateTemplate}>Create Template</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FetchTemplates;
