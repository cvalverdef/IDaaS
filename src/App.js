// import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Compliance from "./pages/Compliance";
import Dashboard from "./pages/Dashboard.js";

const App = () => (
  <Router>
  <div className="bg-background min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow p-8">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
);

export default App;
