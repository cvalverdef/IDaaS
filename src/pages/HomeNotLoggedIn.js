import React from "react";

const HomeNotLoggedIn = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Welcome to IDaaS</h1>
          <p className="mt-4 text-lg">
            Simplifying onboarding, KYC, and KYB compliance with a professional and efficient platform.
          </p>
        </div>
      </header>

      {/* Login Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Login to Your Account</h2>
          <p className="mb-6 text-gray-600">Access your dashboard and manage your compliance tools.</p>
          <div className="space-y-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Login
            </button>
            <button className="bg-gray-200 text-blue-600 px-6 py-2 rounded hover:bg-gray-300">
              Create an Account
            </button>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Section 1 */}
          <div className="bg-gray-50 p-6 rounded shadow hover:bg-gray-100 cursor-pointer">
            <h3 className="text-xl font-bold mb-2">Onboarding</h3>
            <p className="text-gray-600">
              Streamline the user onboarding process with intuitive tools and automated checks.
            </p>
            <img
              src="https://via.placeholder.com/400x200"
              alt="Onboarding Illustration"
              className="mt-4 w-full rounded"
            />
          </div>
          {/* Section 2 */}
          <div className="bg-gray-50 p-6 rounded shadow hover:bg-gray-100 cursor-pointer">
            <h3 className="text-xl font-bold mb-2">Compliance</h3>
            <p className="text-gray-600">
              Ensure regulatory compliance with advanced KYC and KYB verification.
            </p>
            <div
              className="h-48 bg-cover bg-center rounded"
              style={{
                backgroundImage: "url('https://via.placeholder.com/400x200')",
              }}
            ></div>
          </div>
          {/* Section 3 */}
          <div className="bg-gray-50 p-6 rounded shadow hover:bg-gray-100 cursor-pointer">
            <h3 className="text-xl font-bold mb-2">Dashboard</h3>
            <p className="text-gray-600">
              Monitor activity, flagged users, and approvals with a powerful dashboard.
            </p>
            <img
              src="https://via.placeholder.com/400x200"
              alt="Dashboard Illustration"
              className="mt-4 w-full rounded"
            />
          </div>
          {/* Section 4 */}
          <div className="bg-gray-50 p-6 rounded shadow hover:bg-gray-100 cursor-pointer">
            <h3 className="text-xl font-bold mb-2">Reports</h3>
            <p className="text-gray-600">
              Generate detailed reports for compliance and auditing purposes.
            </p>
            <div
              className="h-48 bg-cover bg-center rounded"
              style={{
                backgroundImage: "url('https://via.placeholder.com/400x200')",
              }}
            ></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeNotLoggedIn;
