import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import LanguageSelector from "./LanguageSelector";
import AdminMenu from "./AdminMenu";
import { getJwt, clearJwt } from "./tokenStorage";
import { refreshToken } from "../components/authService";

const Navbar = ({ user, setUser }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(null);
  const expired = localStorage.getItem("expired")
  ? new Date(localStorage.getItem("expired") * 1000)
  : null;

  useEffect(  () => {
    setIsLogged(getJwt());
      if (expired && expired < new Date()) {
       refreshToken() 
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    // Clear session data and reset user state
    clearJwt()
    setUser(null);
    navigate("/login");
    navigate(0);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between h-16">
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
          {isLogged && (
          <li>
            <Link to="/dashboard" className="hover:text-gray-300 text-sm font-medium">
              Dashboard
            </Link>
          </li>)}
          <li>
            <Link to="/create-account" className="hover:text-gray-300 text-sm font-medium">
              Account
            </Link>
          </li>
          <li>
            <LanguageSelector />
          </li>
          {isLogged ? (
            <>
              <li>
                <span className="text-sm font-medium">Logged in as {user?.userName || "User"}</span>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-300 text-sm font-medium"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="hover:text-gray-300 text-sm font-medium">
                Login
              </Link>
            </li>
          )}
          {isLogged && (
            <li>
              <AdminMenu user={user} />
            </li>
          )}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-700 py-4">
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link
                to="/onboarding"
                className="hover:text-gray-300 text-sm font-medium"
                onClick={toggleMobileMenu}
              >
                Onboarding
              </Link>
            </li>
            <li>
              <Link
                to="/compliance"
                className="hover:text-gray-300 text-sm font-medium"
                onClick={toggleMobileMenu}
              >
                Compliance
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-gray-300 text-sm font-medium"
                onClick={toggleMobileMenu}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/create-account"
                className="hover:text-gray-300 text-sm font-medium"
                onClick={toggleMobileMenu}
              >
                Account
              </Link>
            </li>
            <li>
              <LanguageSelector />
            </li>
            {isLogged ? (
              <>
                <li>
                  <span className="text-sm font-medium">Logged in as {user?.userName || "User"}</span>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="hover:text-gray-300 text-sm font-medium"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="hover:text-gray-300 text-sm font-medium"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
              </li>
            )}
            {isLogged && (
              <li>
                <AdminMenu user={user} onClick={toggleMobileMenu} />
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
