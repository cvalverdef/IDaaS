import React, { useState } from "react";

const ManageRoles = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Admin" },
    { id: 2, name: "Jane Smith", role: "Superadmin" },
    { id: 3, name: "Alice Johnson", role: "Admin" },
    { id: 4, name: "Robert Brown", role: "User" },
  ]);

  const updateRole = (id, newRole) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Roles</h1>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-4">User ID</th>
            <th className="border p-4">Name</th>
            <th className="border p-4">Current Role</th>
            <th className="border p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border p-4">{user.id}</td>
              <td className="border p-4">{user.name}</td>
              <td className="border p-4">{user.role}</td>
              <td className="border p-4 flex space-x-2">
                {/* Promote/Demote Buttons */}
                {user.role !== "Superadmin" && (
                  <button
                    className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
                    onClick={() => updateRole(user.id, "Superadmin")}
                  >
                    Promote to Superadmin
                  </button>
                )}
                {user.role === "Superadmin" && (
                  <button
                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                    onClick={() => updateRole(user.id, "Admin")}
                  >
                    Demote to Admin
                  </button>
                )}
                {user.role !== "User" && (
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                    onClick={() => updateRole(user.id, "User")}
                  >
                    Revoke Admin Rights
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRoles;
