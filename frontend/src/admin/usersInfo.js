import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faMapMarkerAlt, faPhoneAlt, faEnvelope, faUserEdit, faEye } from '@fortawesome/free-solid-svg-icons';

const Users = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('admin'); // Track active tab

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      navigate('/login');
    } else {
      setUserEmail(email);
    }

    // Fetch users from the backend API
    fetch('http://localhost/Reactjs/react-PlusPackage/backend/admin/UserInfo')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const getUsersByType = (type) => {
    return users.filter(user => user.user_type.toLowerCase() === type);
  };

  const renderUserCards = (userType) => {
    const filteredUsers = getUsersByType(userType);
    return filteredUsers.length > 0 ? (
      filteredUsers.map(user => (
        <div key={user.id} className="card text-center mb-3 shadow-sm" style={{ width: '15rem' }}>
          <div className="card-header bg-light">
            {user.user_type || 'User'}
          </div>
          <div className="card-body p-2">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png" 
              alt="avatar" 
              className="rounded-circle mb-2" 
              width="60" 
              height="60" 
            />
            <h5 className="card-title mb-1">{user.name}</h5>
            <p className="card-text text-muted mb-1">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" /> City: {user.city}<br/>
              <FontAwesomeIcon icon={faPhoneAlt} className="me-1" /> Phone: {user.phone}<br/>
              <FontAwesomeIcon icon={faEnvelope} className="me-1" /> Email: {user.email}
            </p>
          </div>
          <div className="card-footer bg-white">
            <a href="#" className="text-success me-2">
              <FontAwesomeIcon icon={faUserEdit} />
            </a>
            <a href="#" className="text-primary">
              <FontAwesomeIcon icon={faEye} />
            </a>
          </div>
        </div>
      ))
    ) : (
      <p>No {userType}s found.</p>
    );
  };

  return (
    <div className="container-fluid p-0">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <img 
          src="/images/1659945098_unnamed_(1).png"
          alt="Logo"
          className="navbar-brand" 
          style={{ height: '40px', marginRight: '10px' }}
        />
        <span className="navbar-brand">Admin Dashboard</span>
        <div className="ms-auto d-flex align-items-center">
          <span className="text-white me-3">
            Logged in as: <strong>{userEmail}</strong>
          </span>
          <button className="btn btn-light btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="row g-0">
        <div className="col-md-3 col-lg-2 bg-primary border-top border-end min-vh-100 p-3">
          <h5 className="text-white mb-3">Menu</h5>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link text-white">🏠 Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/users" className="nav-link text-white">👥 Users</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/posts" className="nav-link text-white">📝 Posts</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/settings" className="nav-link text-white">⚙️ Settings</Link>
            </li>
          </ul>
        </div>

        <div className="col-md-9 col-lg-10 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Users</h2>
            <button className="btn btn-success">
              <FontAwesomeIcon icon={faUserPlus} /> Add New User
            </button>
          </div>
          <hr />

          <ul className="nav nav-pills mb-3">
            {['admin', 'author', 'publisher', 'reviewer', 'editor'].map(type => (
              <li className="nav-item" key={type}>
                <button 
                  className={`nav-link ${activeTab === type ? 'active' : ''}`} 
                  data-bs-toggle="pill" 
                  data-bs-target={`#${type}`} 
                  onClick={() => setActiveTab(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}s
                </button>
              </li>
            ))}
          </ul>

          <div className="tab-content">
            {['admin', 'author', 'publisher', 'reviewer', 'editor'].map(type => (
              <div className={`tab-pane fade ${activeTab === type ? 'show active' : ''}`} id={type} key={type}>
                <h5>{type.charAt(0).toUpperCase() + type.slice(1)}s</h5>
                {renderUserCards(type)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;