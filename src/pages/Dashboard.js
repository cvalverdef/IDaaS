import React, { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import SessionHandler from "../components/sessionHandler";
import { useNavigate } from "react-router-dom";
import { isTokenValid, refreshToken } from "../components/authService";
const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    activeUsers: 0,
    flaggedUsers: 0,
    pendingApprovals: 0,
    approvedUsers: 0,
    rejectedUsers: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);

  const fetchData = async () => {
    try {
      const statsResponse = await axios.get("/api/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      setStats(statsResponse.data);

      const activityResponse = await axios.get("/api/activity", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      setRecentActivity(activityResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const validateSession = async () => {
      const jwt = localStorage.getItem("jwt");

      if (!jwt || !isTokenValid(jwt)) {
        try {
          const newToken = await refreshToken();
          if (newToken) {
            localStorage.setItem("jwt", newToken);
            fetchData();
          } else {
            throw new Error("Failed to refresh token");
          }
        } catch (error) {
          console.error("Error refreshing token:", error);
          navigate("/login"); // Redirect to login if refresh fails
        }
      } else {
        fetchData();
      }
    };

    validateSession();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

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
    <SessionHandler>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow-lg rounded p-6">
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              Active Users
            </h2>
            <p className="text-3xl font-bold text-gray-800">
              {stats.activeUsers}
            </p>
          </div>
        </div>

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

        <div className="bg-white shadow-lg rounded p-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Recent Activity
          </h2>
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
    </SessionHandler>
  );
};

export default Dashboard;
