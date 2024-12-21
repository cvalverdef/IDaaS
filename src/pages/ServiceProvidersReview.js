import React, { useEffect, useState } from "react";
import { getServiceProvidersForIdReview, selectReviewService } from "../services/legalServices";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { use } from "react";

const ServiceProvidersReview = () => {
  const location = useLocation();
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [serviceId, setServiceId] = useState("");

  // Fetch service providers
  const handleFetchProviders = async () => {
    try {
      const result = await getServiceProvidersForIdReview(location.state.legalId);
      setError("");
    } catch (err) {
      setError("Failed to fetch service providers.");
    }
  };

  // Select a service provider
  const handleSelectProvider = async () => {
    try {
      const result = await selectReviewService(serviceId, selectedProvider);
      setResponse(result);
      setError("");
      navigate("/authorize-access"); // Proceed to next step
    } catch (err) {
      setError("Failed to select review service.");
    }
  };
  useEffect(() => {
    setServiceId(location.state.Identity.serverSignature.value);
    setProviders(location.state.Identity.status.provider);
    handleFetchProviders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <button
        onClick={handleFetchProviders}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Fetch Providers
      </button>

      {/* {providers.length > 0 && (
        <>
          <h3>Select a Provider:</h3>
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
          >
            <option value="">-- Select Provider --</option>
            {/* {providers.map((provider) => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))} 
          </select>
          <button
            onClick={handleSelectProvider}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Select Review Service
          </button>
        </>
      )} */}

      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="mt-4">
        <Link to="/ready-approval" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Ready For Approval
        </Link>
        <button onClick={() => navigate("/authorize-petition", {
          state: location.state
        })} className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Authorize Access
        </button>
      </div>
    </div>
  );
};

export default ServiceProvidersReview;
