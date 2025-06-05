import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout';
import Index from './pages/index';
import Register from "./pages/register";
import Login from "./pages/login";
import RssFeed from './pages/rssFeed';
import AboutUs from "./pages/about_us";
import ContectUs from "./pages/Contect_us";
import SubmitManuscript from "./pages/SubmitManuscript";
import AuthorGuidlines from "./pages/Author_Guidlines";
import Archives from "./pages/Archives";
import ForthcommingIssue from "./pages/forthcomming_Issue";
import EditorialBoard from "./pages/editorial_board";
import CurrentIssue from "./pages/current_Issue";
import Conference from './pages/conference';
import TrackManuscript from './pages/findManuscript';
import Dashboard from './admin/dashboard';
import AuthorDashboard from './admin/author/author-dashboard';
import ReviewerDashboard from './admin/reviewer/reviewer-dashboard.js';
import CertificateGenerator from './admin/author/genrate_certificate';
import Users from './admin/usersInfo.js';
import UserProfile from './admin/user_profile.js';
import AdminAddUser from './admin/Admin_addUser.js';
import AdminEditUser from './admin/Admin_EditUser.js';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected admin routes */}
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AuthorDashboard"
          element={
            <ProtectedRoute>
              <AuthorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ReviewerDashboard"
          element={
            <ProtectedRoute>
              <ReviewerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddUser"
          element={
            <ProtectedRoute>
              <AdminAddUser />
            </ProtectedRoute>
          }
        />
         <Route
          path="/EditUser"
          element={
            <ProtectedRoute>
              <AdminEditUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/UserProfile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route path="Certificate" element={ <ProtectedRoute><CertificateGenerator /></ProtectedRoute>} />

        {/* Routes with common Layout */}
        <Route element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="register" element={<Register />} />
          <Route path="AboutUs" element={<AboutUs />} />
          <Route path="EditorialBoard" element={<EditorialBoard />} />
          <Route path="ContectUs" element={<ContectUs />} />
          <Route path="SubmitManuscript" element={<SubmitManuscript />} />
          <Route path="AuthorGuidlines" element={<AuthorGuidlines />} />
          <Route path="Archives" element={<Archives />} />
          <Route path="RssFeed" element={<RssFeed />} />
          <Route path="ForthcommingIssue" element={<ForthcommingIssue />} />
          <Route path="CurrentIssue" element={<CurrentIssue />} />
          <Route path="Conference" element={<Conference />} />
          <Route path="track-manuscript" element={<TrackManuscript />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
