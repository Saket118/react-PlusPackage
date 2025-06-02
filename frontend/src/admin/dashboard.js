import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    console.log(email);
    if (!email) {
      navigate('/login'); // redirect if not logged in
    } else {
      setUserEmail(email);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear(); // Clear all stored data
    navigate('/login');
  };
  

  return (
    <div className="container-fluid p-0">
      {/* Top Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <img 
          src="/images/1659945098_unnamed_(1).png"
          alt="Logo"
          className="navbar-brand" 
          style={{ height: '40px', marginRight: '10px' }}
        />
        <span className="navbar-brand">Admin Dashboard</span>
        <div className="ms-auto d-flex align-items-center">
          <span className="text-white me-3">Logged in as: <strong>{userEmail}</strong></span>
          <button className="btn btn-light btn-sm" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Sidebar + Main Content */}
      <div className="row g-0" >
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-primary border-top border-end min-vh-100 p-3">
          <h5 className="mb-3">Menu</h5>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link text-dark">🏠 Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link text-dark">👥 Users</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/posts" className="nav-link text-dark">📝 Posts</Link>
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
          <p>Welcome <strong>{userEmail}</strong>! You can manage your system here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
