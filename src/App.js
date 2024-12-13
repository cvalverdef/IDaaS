import "./App.css";
import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Compliance from "./pages/Compliance";
import Dashboard from "./pages/Dashboard";
import ManageAPIs from "./pages/ManageAPIs";
import CustomizeThemes from "./pages/CustomizeThemes";
import ManageRoles from "./pages/ManageRoles";
import HomeLoggedIn from "./pages/HomeLoggedIn";
import HomeNotLoggedIn from "./pages/HomeNotLoggedIn";
import Register from "./pages/Register";
import NeuronAccountManager from "./components/NeuronAccountManager";
import Login from "./pages/Login";
import AccountOnboardingSuccess from "./pages/AccountOnboardingSuccess";
import AccountCreateForm from "./pages/AccountCreateForm";
import { getJwt } from "./components/tokenStorage";
import Recover from "./components/Recover"
import CryptoAlgorithms from "./pages/CryptoAlgorithms";

const App = () => {
  const [user, setUser] = useState(null); // Initially, no user is logged in
  const PrivateRoute = ({ jwt, children }) => {
    return jwt ? children : <navigate to="/login" />;
  };
  useEffect(() => {
    const Info = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):[]
    setUser(Info);
  }, []);
  return (
    <Router>
      <div className="bg-background min-h-screen flex flex-col">
        {/* Pass user object and setUser function to Navbar */}
        <Navbar user={user} setUser={setUser} />
        <main className="flex-grow p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/home-not-logged-in" element={<HomeNotLoggedIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route
              path="/verify-account"
              element={<AccountOnboardingSuccess />}
            />
            <Route path="/create-account" element={<AccountCreateForm />} />
            <Route path="/recover" element={<Recover />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute jwt={getJwt()}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/manage-apis"
              element={
                <PrivateRoute jwt={getJwt()}>
                  <ManageAPIs />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/customize-themes"
              element={
                <PrivateRoute jwt={getJwt()}>
                  <CustomizeThemes />
                </PrivateRoute>
              }
            />
            <Route
              path="/superadmin/manage-roles"
              element={
                <PrivateRoute jwt={getJwt()}>
                  <ManageRoles />
                </PrivateRoute>
              }
            />
            <Route
              path="/neuron-manager"
              element={
                <PrivateRoute jwt={getJwt()}>
                  <NeuronAccountManager />
                </PrivateRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute jwt={getJwt()}>
                  <HomeLoggedIn />
                </PrivateRoute>
              }
            />
            <Route
              path="/crypto-algorithms"
              element={
                <PrivateRoute jwt={getJwt()}>
                  <CryptoAlgorithms />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
