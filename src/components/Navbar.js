import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-primary text-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/path/to/logo.png" alt="IDaaS Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-lg font-bold">IDaaS</h1>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/onboarding" className="hover:text-gray-300">
              Onboarding
            </Link>
          </li>
          <li>
            <Link to="/compliance" className="hover:text-gray-300">
              Compliance
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => console.log("Toggle Mobile Menu")}
            className="text-white focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
