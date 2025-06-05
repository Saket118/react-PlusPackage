import React, {useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from "../../utils/auth";
const AuthorDashboard = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load email and name from localStorage
  
    const name = localStorage.getItem('userName');
   
    if (name) setUserName(name);
  }, []);

  const handleLogout = () => {
    logout();            // Clear localStorage
    navigate('/login');  // Redirect to login page
  };

  return (
    <div className="container-fluid p-0">
      {/* Top Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <span className="navbar-brand">Author Dashboard</span>
        <div className="ms-auto d-flex align-items-center">
          <span className="text-white me-3">Welcome, {userName}</span>
          <button className="btn btn-light btn-sm px-3 shadow" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Sidebar + Main Content */}
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-primary border-top border-end min-vh-100 p-3">
          <h5 className="mb-3 text-white">Menu</h5>
          <ul className="nav flex-column">
           
     
            <li className="nav-item">
                  <Link to="/certificate" className="nav-link text-dark">📝 certificate</Link>
                </li>
          
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 p-4">
          <h2>Author Dashboard</h2>
          <hr />
          <p>Welcome <strong>{userName}</strong> You can manage your Author tasks here.</p>
        
        </div>
      </div>
    </div>
  );
};
export default AuthorDashboard;
