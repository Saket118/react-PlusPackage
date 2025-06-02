import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AuthorDashboard = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear auth token
    localStorage.removeItem('email'); // Clear email
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container-fluid p-0">
      {/* Top Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <span className="navbar-brand">Author Dashboard</span>
        <div className="ms-auto d-flex align-items-center">
          <span className="text-white me-3">Welcome, Author</span>
          <button className="btn btn-light btn-sm" onClick={handleLogout}>Logout</button>
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
              <ul className={`nav flex-column ms-3 ${isOpen ? '' : ''}`}>
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
