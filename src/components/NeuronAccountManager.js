import React, { useEffect, useState } from "react";

const NeuronAccountManager = () => {
  const [NeuronAgent, setNeuronAgent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAgent = async () => {
      try {
        // Load Agent.js dynamically
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://lab.tagroot.io/Agent.js"; // URL from documentation
          script.onload = resolve;
          script.onerror = () => reject(new Error("Failed to load Agent.js"));
          document.body.appendChild(script);
        });

        // Check for global AgentAPI object as per documentation
        if (window.AgentAPI) {
          // Initialize AgentAPI with host if required
          window.AgentAPI.IO.SetHost("lab.tagroot.io", true);
          setNeuronAgent(window.AgentAPI);
        } else {
          throw new Error("AgentAPI is not available after script load.");
        }
      } catch (err) {
        setError(err.message || "Failed to initialize NeuronAgent");
        console.error("Error initializing NeuronAgent:", err);
      }
    };

    loadAgent();
  }, []); // Run only once

  // Error state rendering
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Loading state rendering
  if (!NeuronAgent) {
    return <div>Loading NeuronAgent...</div>;
  }

  // Success state rendering
  return (
    <div>
      <h1>NeuronAgent Loaded Successfully</h1>
      {/* Example usage of AgentAPI */}
      <p>
        Current Agent Host:{" "}
        {NeuronAgent.IO?.GetHost() || "Host information not available"}
      </p>
      <p>
        Example API Call:{" "}
        {NeuronAgent.IO?.Ping
          ? "Ping Successful"
          : "Ping function not available in AgentAPI"}
      </p>
    </div>
  );
};

export default NeuronAccountManager;
