import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [user, setUser] = useState(location.state?.user || null);

  useEffect(() => {
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');
    if (!email) {
      navigate('/login');
    } else {
      if (name) setUserName(name);
      setUserEmail(email);
      if (!user) {
        fetch(`http://localhost/Reactjs/react-PlusPackage/backend/admin/UserInfo?email=${email}`)
          .then(res => res.ok ? res.json() : Promise.reject('Error fetching user'))
          .then(data => {
            if (data?.length > 0) setUser(data[0]);
            else setUser(null);
          })
          .catch(err => {
            console.error(err);
            setUser(null);
          });
      }
    }
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="container text-center mt-5">
        <h4 className="text-muted">Loading profile...</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0 bg-light min-vh-100 d-flex flex-column">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 shadow-sm">
        <img 
          src="/images/1659945098_unnamed_(1).png"
          alt="Logo"
          className="navbar-brand pe-2" 
          style={{ height: '40px' }}
        />
        <span className="navbar-brand fw-semibold fs-4">Admin Dashboard</span>
        <div className="ms-auto d-flex align-items-center gap-3">
          <span className="text-white fs-6">
            Logged in as: <strong>{userName} </strong>
          </span>
          <button className="btn btn-outline-light btn-sm px-3" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Layout */}
      <div className="row g-0 flex-grow-1">
        {/* Sidebar */}
        <aside className="col-md-3 col-lg-2 bg-primary d-flex flex-column p-3 min-vh-100">
          <h5 className="text-white mb-4 fw-bold">Menu</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link to="/dashboard" className="nav-link text-white hover-effect px-3 py-2 rounded">
                🏠 Home
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/users" className="nav-link active bg-white text-primary fw-semibold px-3 py-2 rounded shadow-sm">
                👥 Users
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/dashboard/posts" className="nav-link text-white hover-effect px-3 py-2 rounded">
                📝 Posts
              </Link>
            </li>
            <li className="nav-item mt-auto">
              <Link to="/dashboard/settings" className="nav-link text-white hover-effect px-3 py-2 rounded">
                ⚙️ Settings
              </Link>
            </li>
          </ul>
        </aside>

        {/* Profile Content */}
        <main className="col-md-9 col-lg-10 p-4 d-flex justify-content-center align-items-center bg-light">
          <div className="card shadow rounded-4 p-4 border-0" style={{ maxWidth: '500px', width: '100%' }}>
            <div className="text-center mb-4 position-relative">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="avatar"
                className="rounded-circle border border-primary shadow"
                width="120"
                height="120"
                style={{ objectFit: 'cover' }}
              />
              <h3 className="mt-3 fw-bold">{user.name || 'N/A'}</h3>
              <span className="badge bg-secondary">
                {user.user_type ? user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1) : 'User'}
              </span>
            </div>
            <hr />
            <div className="text-start">
              <p className="mb-3">
                <FontAwesomeIcon icon={faEnvelope} className="me-2 text-primary" />
                <strong>Email:</strong> {user.email || 'N/A'}
              </p>
              <p className="mb-3">
                <FontAwesomeIcon icon={faPhoneAlt} className="me-2 text-primary" />
                <strong>Phone:</strong> {user.phone || 'N/A'}
              </p>
              <p className="mb-0">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-primary" />
                <strong>City:</strong> {user.city || 'N/A'}
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Additional styling */}
      <style>
        {`
          .hover-effect:hover {
            background-color: rgba(255, 255, 255, 0.2);
            color: #fff !important;
          }
        `}
      </style>
    </div>
  );
};

export default UserProfile;
