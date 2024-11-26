import React, { useState } from "react";
import Alert from "../components/Alert";

const ManageAPIs = () => {
  const [apiProviders, setApiProviders] = useState([
    { id: 1, name: "Serpro", status: "Enabled" },
    { id: 2, name: "OtherAPI", status: "Disabled" },
  ]);

  const [alert, setAlert] = useState(null); // For displaying alerts

  const toggleStatus = (id) => {
    const updatedProviders = apiProviders.map((provider) =>
      provider.id === id
        ? { ...provider, status: provider.status === "Enabled" ? "Disabled" : "Enabled" }
        : provider
    );
    setApiProviders(updatedProviders);

    // Show success alert
    setAlert({
      type: "success",
      message: `API status updated successfully for provider ID: ${id}`,
    });

    // Hide alert after 3 seconds
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">API Providers Management</h1>

      {/* Display Alert */}
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <table className="w-full border-collapse border border-gray-200 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-4">API Name</th>
            <th className="border p-4">Status</th>
            <th className="border p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {apiProviders.map((provider) => (
            <tr key={provider.id} className="hover:bg-gray-50">
              <td className="border p-4">{provider.name}</td>
              <td
                className={`border p-4 ${
                  provider.status === "Enabled" ? "text-green-600" : "text-red-600"
                }`}
              >
                {provider.status}
              </td>
              <td className="border p-4">
                <button
                  onClick={() => toggleStatus(provider.id)}
                  className={`py-2 px-4 rounded ${
                    provider.status === "Enabled" ? "bg-red-500" : "bg-green-500"
                  } text-white`}
                >
                  {provider.status === "Enabled" ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAPIs;
