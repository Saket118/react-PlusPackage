import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout as logoutUtil } from '../../utils/auth';

const AuthorDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const logout = () => {
    logoutUtil(); // clear tokens
    navigate('/login'); // navigate to login page after logout
  };

  return (
    <div className="container-fluid p-0">
      {/* Top Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <span className="navbar-brand">Author Dashboard</span>
        <div className="ms-auto d-flex align-items-center">
          <span className="text-white me-3">Welcome, Author</span>
          <button className="btn btn-light btn-sm" onClick={logout}>Logout</button>
        </div>
      </nav>

      {/* Sidebar + Main Content */}
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-light border-end min-vh-100 p-3">
          <h5 className="mb-3">Menu</h5>
          <ul className="nav flex-column">
            <li className="nav-item">
              <button className="nav-link text-dark" onClick={toggleDropdown}>
                📁 Manage Content
              </button>
              <ul className={`nav flex-column ms-3 ${isOpen ? '' : 'd-none'}`}>
                <li className="nav-item">
                  <Link to="/certificate" className="nav-link text-dark">📝 certificate</Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/settings" className="nav-link text-dark">⚙️ Settings</Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 p-4">
          <h2>Dashboard</h2>
          <hr />
          <p>Welcome to the author dashboard! You can manage your content here.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthorDashboard;
