// import logo from './logo.svg';
import './App.css';
import React from "react";
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
import HomeLoggedIn from './pages/HomeLoggedIn';
import HomeNotLoggedIn from './pages/HomeNotLoggedIn';
import Register from './pages/Register';
import NeuronAccountManager from './components/NeuronAccountManager'; 
import Login from './pages/Login';
import AccountOnboardingSuccess from './pages/AccountOnboardingSuccess'; 
import AccountCreateForm from './pages/AccountCreateForm';

const App = () => {
  // Mock user object
  const user = {
    name: "Superadmin User", // Replace with actual user data from authentication system
    isSuperAdmin: true, // Set to false to test non-superadmin views
  };

  return (
    <Router>
      <div className="bg-background min-h-screen flex flex-col">
        {/* Pass user object to Navbar */}
        <Navbar user={user} />
        <main className="flex-grow p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<HomeLoggedIn />} />
            <Route path="/home-not-logged-in" element={<HomeNotLoggedIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/neuron-manager" element={<NeuronAccountManager />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-account" element={<AccountOnboardingSuccess />} /> 
            <Route path="/create-account" element={<AccountCreateForm />} />
            {/* Superadmin Routes */}
            {user.isSuperAdmin && (
              <>
                <Route path="/superadmin/manage-apis" element={<ManageAPIs />} />
                <Route path="/superadmin/customize-themes" element={<CustomizeThemes />} />
                <Route path="/superadmin/manage-roles" element={<ManageRoles />} />
              </>
            )}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
