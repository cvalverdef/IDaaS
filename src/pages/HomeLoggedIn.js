import React from "react";

const HomeLoggedIn = ({ user }) => {
  // Mock stats for the dashboard indicators
  const stats = {
    activeUsers: 120,
    flaggedUsers: 10,
    pendingApprovals: 5,
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Welcome Back, {user.name}!</h1>
          <p className="mt-4 text-lg">Your compliance tools are ready for action.</p>
        </div>
      </header>

      {/* Dashboard Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded shadow text-center">
              <h3 className="text-xl font-bold text-blue-600">Active Users</h3>
              <p className="text-3xl font-bold">{stats.activeUsers}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded shadow text-center">
              <h3 className="text-xl font-bold text-yellow-600">Flagged Users</h3>
              <p className="text-3xl font-bold">{stats.flaggedUsers}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded shadow text-center">
              <h3 className="text-xl font-bold text-red-600">Pending Approvals</h3>
              <p className="text-3xl font-bold">{stats.pendingApprovals}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-50 p-6 rounded shadow hover:bg-gray-100 cursor-pointer">
            <h3 className="text-xl font-bold mb-2">Onboarding</h3>
            <p className="text-gray-600">Quickly onboard users with automated checks.</p>
          </div>
          {user.isSuperAdmin && (
            <div className="bg-gray-50 p-6 rounded shadow hover:bg-gray-100 cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Manage APIs</h3>
              <p className="text-gray-600">Configure API providers for compliance.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomeLoggedIn;
