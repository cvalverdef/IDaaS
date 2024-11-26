import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Grid for Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-2">Active Users</h2>
          <p className="text-3xl font-bold text-gray-800">5,230</p>
          <p className="text-gray-500 mt-2">Individuals and Organizations</p>
        </div>

        <div className="bg-white shadow-lg rounded p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-2">Flagged Users</h2>
          <p className="text-3xl font-bold text-gray-800">112</p>
          <p className="text-gray-500 mt-2">Under investigation</p>
        </div>

        <div className="bg-white shadow-lg rounded p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-2">Pending Approvals</h2>
          <p className="text-3xl font-bold text-gray-800">27</p>
          <p className="text-gray-500 mt-2">Pending KYC/KYB processing</p>
        </div>
      </div>

      {/* Additional Views */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-2">Approved Users</h2>
          <p className="text-3xl font-bold text-gray-800">4,982</p>
          <p className="text-gray-500 mt-2">Verified individuals & organizations</p>
        </div>

        <div className="bg-white shadow-lg rounded p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-2">Rejected Users</h2>
          <p className="text-3xl font-bold text-gray-800">64</p>
          <p className="text-gray-500 mt-2">Failed compliance checks</p>
        </div>

        <div className="bg-white shadow-lg rounded p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-2">System Uptime</h2>
          <p className="text-3xl font-bold text-green-600">99.9%</p>
          <p className="text-gray-500 mt-2">Ensuring seamless operations</p>
        </div>
      </div>

      {/* Mocked Activity Table */}
      <div className="mt-10 bg-white shadow-lg rounded p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Recent Activity</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-4">User ID</th>
              <th className="border p-4">Name</th>
              <th className="border p-4">Action</th>
              <th className="border p-4">Status</th>
              <th className="border p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="border p-4">1024</td>
              <td className="border p-4">John Doe</td>
              <td className="border p-4">Submitted KYC</td>
              <td className="border p-4 text-green-600">Verified</td>
              <td className="border p-4">2024-11-01</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border p-4">2048</td>
              <td className="border p-4">Jane Smith</td>
              <td className="border p-4">Updated Documents</td>
              <td className="border p-4 text-yellow-600">In Process</td>
              <td className="border p-4">2024-11-02</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border p-4">4096</td>
              <td className="border p-4">Alice Johnson</td>
              <td className="border p-4">Rejected KYC</td>
              <td className="border p-4 text-red-600">Rejected</td>
              <td className="border p-4">2024-11-03</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
