import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import LanguageSelector from "./LanguageSelector";
import AdminMenu from "./AdminMenu";

const Navbar = ({ user, setUser }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [expired, setExpired] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const navigate = useNavigate();

  const truncateEmail = (email, maxLength = 40) => {
    if (email.length > maxLength) {
      const partLength = Math.floor((maxLength - 3) / 2); // Length of each visible part
      return `${email.slice(0, partLength)}...${email.slice(-partLength)}`;
    }
    return email;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleMouseEnter = async () => {
    try {
      if (window.AgentAPI) {
        const userInfo = await window.AgentAPI.Account.Info();
        setUserDetails({
          userName: userInfo.userName || "N/A",
          created: new Date(userInfo.created).toLocaleString() || "N/A",
          eMail: truncateEmail(userInfo.eMail || "N/A"),
          phoneNr: userInfo.phoneNr || "N/A",
        });
        setTooltipVisible(true);
      } else {
        console.error("AgentAPI is not available.");
      }
    } catch (error) {
      console.error("Failed to load user details:", error);
    }
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const userData = JSON.parse(localStorage.getItem("user"));
    setIsLogged(!!jwt);
    setUser(userData);

    if (userData?.tokenExpiry) {
      const expiryDate = new Date(userData.tokenExpiry);
      setExpired(expiryDate);
    }
  }, [setUser]);

  useEffect(() => {
    if (expired && expired < new Date()) {
      if (window.AgentAPI) {
        window.AgentAPI.Account.Refresh(3600).then((newToken) => {
          localStorage.setItem("jwt", newToken.jwt);
          setUser((prev) => ({ ...prev, token: newToken.jwt }));
        });
      }
    }
  }, [expired, setUser]);

  return (
    <nav className="bg-blue-600 text-white shadow-md relative">
      <div className="container mx-auto flex items-center justify-between h-16">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="IDaaS Logo" className="h-10 w-10" />
          <h1 className="text-lg font-bold">IDaaS</h1>
        </Link>

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
          {isLogged ? (
            <>
              <li
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className="text-sm font-medium hover:underline cursor-pointer">
                  Logged in as {user?.userName || "User"}
                </span>
                {tooltipVisible && userDetails && (
                  <div className="absolute top-full mt-1 bg-blue-600 text-white shadow-lg p-4 rounded-md">
                    <p className="text-sm font-medium">
                      <strong>Username:</strong> {userDetails.userName}
                    </p>
                    <p className="text-sm font-medium">
                      <strong>Created:</strong> {userDetails.created}
                    </p>
                    <p className="text-sm font-medium">
                      <strong>Email:</strong> {userDetails.eMail}
                    </p>
                    <p className="text-sm font-medium">
                      <strong>Phone:</strong> {userDetails.phoneNr}
                    </p>
                  </div>
                )}
              </li>
              <li>
                <Link to="/crypto-algorithms" className="hover:text-gray-300 text-sm font-medium">
                  Crypto Algorithms
                </Link>
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
          {user?.isSuperAdmin && (
            <li>
              <AdminMenu user={user} />
            </li>
          )}
        </ul>

        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
