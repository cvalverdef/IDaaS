import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import LanguageSelector from "./LanguageSelector";
import AdminMenu from "./AdminMenu";

const Navbar = ({ user }) => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between h-16">
        {/* Logo and Text Redirect to Home */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="IDaaS Logo" className="h-10 w-10" />
          <h1 className="text-lg font-bold">IDaaS</h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <Link to="/onboarding" className="hover:text-gray-300 text-sm font-medium">
              Onboarding
            </Link>
          </li>
          <li>
            <Link to="/compliance" className="hover:text-gray-300 text-sm font-medium">
              Compliance
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:text-gray-300 text-sm font-medium">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/create-account" className="hover:text-gray-300 text-sm font-medium">
              Account
            </Link>
          </li>
          <li>
            <LanguageSelector />
          </li>
          {/* Admin Menu for Superadmins */}
          {user?.isSuperAdmin && (
            <li>
              <AdminMenu user={user} />
            </li>
          )}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => {
              // Add mobile toggle functionality here if needed
            }}
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
