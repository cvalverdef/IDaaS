import React, { useState } from "react";

const Onboarding = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      dob: "1990-01-01",
      documentNumber: "123456789",
      documentType: "Passport",
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      dob: "1985-05-20",
      documentNumber: "987654321",
      documentType: "National ID",
      status: "Pending",
    },
  ]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCheck = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const processKYC = (status) => {
    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id ? { ...user, status } : user
    );
    setUsers(updatedUsers);
    setModalVisible(false);
    setSelectedUser(null);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Onboarding</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-4">User ID</th>
            <th className="border p-4">Name</th>
            <th className="border p-4">DOB</th>
            <th className="border p-4">Document Number</th>
            <th className="border p-4">Document Type</th>
            <th className="border p-4">Status</th>
            <th className="border p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border p-4">{user.id}</td>
              <td className="border p-4">{user.name}</td>
              <td className="border p-4">{user.dob}</td>
              <td className="border p-4">{user.documentNumber}</td>
              <td className="border p-4">{user.documentType}</td>
              <td
                className={`border p-4 ${
                  user.status === "Verified"
                    ? "text-green-600"
                    : user.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {user.status}
              </td>
              <td className="border p-4">
                <button
                  className={`py-2 px-4 rounded ${
                    user.status === "Verified"
                      ? "bg-green-500"
                      : user.status === "Rejected"
                      ? "bg-red-500"
                      : "bg-blue-500"
                  } text-white`}
                  onClick={() => handleCheck(user)}
                  disabled={user.status !== "Pending"}
                >
                  {user.status === "Pending" ? "Check" : user.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalVisible && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <h2 className="text-xl font-bold mb-4">Process KYC</h2>
            <p className="mb-4">
              Processing KYC for <strong>{selectedUser.name}</strong>.
            </p>
            <p className="mb-4">
              <strong>Document Type:</strong> {selectedUser.documentType}
            </p>
            <p className="mb-4">
              <strong>Document Number:</strong> {selectedUser.documentNumber}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="py-2 px-4 bg-green-500 text-white rounded"
                onClick={() => processKYC("Verified")}
              >
                Approve
              </button>
              <button
                className="py-2 px-4 bg-yellow-500 text-white rounded"
                onClick={() => processKYC("In Process")}
              >
                In Process
              </button>
              <button
                className="py-2 px-4 bg-red-500 text-white rounded"
                onClick={() => processKYC("Rejected")}
              >
                Reject
              </button>
              <button
                className="py-2 px-4 bg-gray-500 text-white rounded"
                onClick={() => setModalVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
