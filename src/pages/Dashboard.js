import React, { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeUsers: 0,
    flaggedUsers: 0,
    pendingApprovals: 0,
    approvedUsers: 0,
    rejectedUsers: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    // Replace the endpoints below with actual API endpoints
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/stats"); // Mock endpoint
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats data:", error);
      }
    };

    const fetchActivity = async () => {
      try {
        const response = await axios.get("/api/activity"); // Mock endpoint
        setRecentActivity(response.data);
      } catch (error) {
        console.error("Error fetching recent activity data:", error);
      }
    };

    fetchStats();
    fetchActivity();
  }, []);

  // Export stats to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Dashboard Stats", 20, 20);

    const statsArray = [
      ["Metric", "Value"],
      ["Active Users", stats.activeUsers],
      ["Flagged Users", stats.flaggedUsers],
      ["Pending Approvals", stats.pendingApprovals],
      ["Approved Users", stats.approvedUsers],
      ["Rejected Users", stats.rejectedUsers],
    ];

    doc.autoTable({
      startY: 30,
      head: [statsArray[0]],
      body: statsArray.slice(1),
    });

    doc.save("dashboard-stats.pdf");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-2">Active Users</h2>
          <p className="text-3xl font-bold text-gray-800">{stats.activeUsers}</p>
        </div>
        <div className="bg-white shadow-lg rounded p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-2">Flagged Users</h2>
          <p className="text-3xl font-bold text-gray-800">{stats.flaggedUsers}</p>
        </div>
        <div className="bg-white shadow-lg rounded p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-2">Pending Approvals</h2>
          <p className="text-3xl font-bold text-gray-800">{stats.pendingApprovals}</p>
        </div>
        <div className="bg-white shadow-lg rounded p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-2">Approved Users</h2>
          <p className="text-3xl font-bold text-gray-800">{stats.approvedUsers}</p>
        </div>
        <div className="bg-white shadow-lg rounded p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-2">Rejected Users</h2>
          <p className="text-3xl font-bold text-gray-800">{stats.rejectedUsers}</p>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={exportToPDF}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Export Stats to PDF
        </button>
        <CSVLink
          data={recentActivity}
          headers={[
            { label: "User ID", key: "userId" },
            { label: "Name", key: "name" },
            { label: "Action", key: "action" },
            { label: "Status", key: "status" },
            { label: "Date", key: "date" },
          ]}
          filename={"recent-activity.csv"}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Export Recent Activity to CSV
        </CSVLink>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white shadow-lg rounded p-6">
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
            {recentActivity.map((activity, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border p-4">{activity.userId}</td>
                <td className="border p-4">{activity.name}</td>
                <td className="border p-4">{activity.action}</td>
                <td
                  className={`border p-4 ${
                    activity.status === "Verified"
                      ? "text-green-600"
                      : activity.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {activity.status}
                </td>
                <td className="border p-4">{activity.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
