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
import ManageContracts from "./pages/ManageContracts";
import ValidatePNr from "./pages/ValidatePNr";
import GetApplicationAttributes from "./pages/GetApplicationAttributes";
import ApplyId from "./pages/ApplyId";
import AddIdAttachment from "./pages/AddIdAttachments";
import ReadyForApproval from "./pages/ReadyForApproval";
import ServiceProvidersReview from "./pages/ServiceProvidersReview";
// import SelectReviewService from "./components/SelectReviewService";
// import AuthorizeAccessToId from "./components/AuthorizeAccessToId";
// import PetitionPeerReview from "./components/PetitionPeerReview";
// import PetitionId from "./components/PetitionId";
// import PetitionSignature from "./components/PetitionSignature";
import CreateContract from "./pages/CreateContract";
// import GetIdentity from "./components/GetIdentity";
// import GetContract from "./components/GetContract";
import SignContract from "./pages/SignContract";
// import SignData from "./components/SignData";
// import GetIdentities from "./components/GetIdentities";
// import GetCreatedContracts from "./components/GetCreatedContracts";
// import AuthorizeAccessToContract from "./components/AuthorizeAccessToContract";
import AuthorizeAndPetition from "./pages/AuthorizeAndPetition";
import PetitionActions from "./pages/PetitionActions";
import IdentityManagement from "./pages/IdentityManagement";
import SignAndAuthorize from "./pages/SignAndAuthorize";

const App = () => {
  const [user, setUser] = useState(null); // Initially, no user is logged in
  const PrivateRoute = ({ jwt, children }) => {
    return jwt ? children : <navigate to="/login" />;
  };
  useEffect(() => {
    const Info = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : []
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
            <Route
              path="/manage-contracts"
              element={
                <PrivateRoute jwt={getJwt()}>
                  <ManageContracts />
                </PrivateRoute>
              }
            />
            <Route
              path="/validate-pnr"
              element={
                <PrivateRoute jwt={getJwt()}>
                  <ValidatePNr />
                </PrivateRoute>
              }
            />
            <Route
              path="/getappattributes"
              element={
                <PrivateRoute jwt={getJwt()}>
                  <GetApplicationAttributes />
                </PrivateRoute>
              }
            />
            <Route
              path="/apply-id"
              element={
                <PrivateRoute jwt={getJwt()}>
                  <ApplyId />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-id-attachment"
              element={
                <PrivateRoute jwt={getJwt()}>
                  <AddIdAttachment />
                </PrivateRoute>
              }
            />
            <Route
              path="/ready-approval"
              element={
                <PrivateRoute jwt={getJwt()}>
                  <ReadyForApproval />
                </PrivateRoute>
              }
            />
            <Route
              path="/service-providers-review"
              element={<PrivateRoute jwt={getJwt()}><ServiceProvidersReview /></PrivateRoute>}
            />
            {/* <Route path="/select-review-service" element={<PrivateRoute jwt={getJwt()}><SelectReviewService /></PrivateRoute>} />
            <Route path="/authorize-access-id" element={<PrivateRoute jwt={getJwt()}><AuthorizeAccessToId /></PrivateRoute>} />
            <Route path="/petition-peer-review" element={<PrivateRoute jwt={getJwt()}><PetitionPeerReview /></PrivateRoute>} />
            <Route path="/petition-id" element={<PrivateRoute jwt={getJwt()}><PetitionId /></PrivateRoute>} />
            <Route path="/petition-signature" element={<PrivateRoute jwt={getJwt()}><PetitionSignature /></PrivateRoute>} /> */}
            <Route path="/create-contract" element={<PrivateRoute jwt={getJwt()}><CreateContract /></PrivateRoute>} />
            {/* <Route path="/get-identity" element={<PrivateRoute jwt={getJwt()}><GetIdentity /></PrivateRoute>} />
            <Route path="/get-contract" element={<PrivateRoute jwt={getJwt()}><GetContract /></PrivateRoute>} /> */}
            <Route path="/sign-contract" element={<PrivateRoute jwt={getJwt()}><SignContract /></PrivateRoute>} />
            {/* <Route path="/sign-data" element={<PrivateRoute jwt={getJwt()}><SignData /></PrivateRoute>} />
            <Route path="/get-identities" element={<PrivateRoute jwt={getJwt()}><GetIdentities /></PrivateRoute>} />
            <Route path="/get-created-contracts" element={<PrivateRoute jwt={getJwt()}><GetCreatedContracts /></PrivateRoute>} />
            <Route path="/authorize-access-contract" element={<PrivateRoute jwt={getJwt()}><AuthorizeAccessToContract /></PrivateRoute>}/> */} 
            <Route path="/authorize-petition" element={<PrivateRoute jwt={getJwt()}><AuthorizeAndPetition /></PrivateRoute>} />
            <Route path="/petition-actions" element={<PrivateRoute jwt={getJwt()}><PetitionActions /></PrivateRoute>} />
            <Route path="/identity-management" element={<PrivateRoute jwt={getJwt()}><IdentityManagement /></PrivateRoute>} />
            <Route path="/sign-and-authorize" element={<PrivateRoute jwt={getJwt()}><SignAndAuthorize /></PrivateRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
