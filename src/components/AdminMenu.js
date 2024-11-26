import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!user.isSuperAdmin) return null;

  return (
    <div className="relative">
      {/* Admin Menu Button */}
      <button
        onMouseEnter={() => setIsOpen(true)} // Open dropdown on hover
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Admin Menu ▼
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute mt-2 w-48 bg-white shadow-lg rounded"
          onMouseLeave={() => setIsOpen(false)} // Close dropdown when leaving list area
          onMouseEnter={() => setIsOpen(true)} // Keep dropdown open when hovering items
        >
          <Link
            to="/superadmin/manage-apis"
            className="block px-4 py-2 text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Manage APIs
          </Link>
          <Link
            to="/superadmin/customize-themes"
            className="block px-4 py-2 text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Customize Themes
          </Link>
          <Link
            to="/superadmin/manage-roles"
            className="block px-4 py-2 text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Manage Roles
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
