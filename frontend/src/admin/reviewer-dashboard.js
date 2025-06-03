import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../utils/auth';

const ReviewerDashboard = () => {


 
  return (
    <div className="container-fluid p-0">
      {/* Top Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <span className="navbar-brand">reviewer Dashboard</span>
        <div className="ms-auto d-flex align-items-center">
          <button className="btn btn-light btn-sm" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Sidebar + Main Content */}
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-primary border-end min-vh-100 p-3">
          <h5 className="mb-3">Menu</h5>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link text-dark">
                🏠 Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/users" className="nav-link text-dark">
                👥 Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/posts" className="nav-link text-dark">
                📝 Posts
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/settings" className="nav-link text-dark">
                ⚙️ Settings
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 p-4">
          <h2>Dashboard</h2>
          <hr />
          <p>Welcome to the reviewer dashboard! You can manage your system here.</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewerDashboard;
