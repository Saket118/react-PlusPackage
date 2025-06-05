import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faMapMarkerAlt, faPhoneAlt, faEnvelope, faUserEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

const Users = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('admin');

  useEffect(() => {
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');
    if (!email) {
      navigate('/login');
    } else {
   
      setUserName(name);
    }

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

  const getUsersByType = (type) => users.filter(user => user.user_type.toLowerCase() === type);
    
  const renderUserCards = (userType) => {
    const filteredUsers = getUsersByType(userType);
    if (filteredUsers.length === 0) {
      return <p className="text-muted fst-italic">No {userType}s found.</p>;
    }
    return (
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {filteredUsers.map(user => {
          console.log(user);
          return (
            <div key={user.id} className="col">
              <div className="card h-100 shadow-sm border-0 rounded-3">
                <div className="card-header bg-primary text-white text-center fw-semibold">
                  {user.user_type || 'User'}
                </div>
                <div className="card-body d-flex flex-column align-items-center text-center p-3">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png" 
                    alt="avatar" 
                    className="rounded-circle mb-3 border border-2 border-primary"
                    width="80" 
                    height="80" 
                    style={{ objectFit: 'cover' }}
                  />
                  <h5 className="card-title mb-1 text-truncate" style={{ maxWidth: '100%' }}>
                    {user.name}
                  </h5>
                  <p className="text-muted small mb-0">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1 text-secondary" /> {user.city || 'N/A'}
                  </p>
                  <p className="text-muted small mb-0">
                    <FontAwesomeIcon icon={faPhoneAlt} className="me-1 text-secondary" /> {user.phone || 'N/A'}
                  </p>
                  <p className="text-muted small mb-3 text-truncate" style={{ maxWidth: '100%' }}>
                    <FontAwesomeIcon icon={faEnvelope} className="me-1 text-secondary" /> {user.email}
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-center gap-3 bg-white border-0 pb-3 pt-2">
                  <button 
                    className="btn btn-sm btn-outline-success rounded-circle shadow-sm"
                    aria-label="Edit User"
                    title="Edit User"
                  >
                    <FontAwesomeIcon icon={faUserEdit} />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary rounded-circle shadow-sm"
                    aria-label="View User"
                    title="View User"
                    onClick={() => navigate('/UserProfile', { state: { user } })}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger rounded-circle shadow-sm"
                    aria-label="Delete User"
                    title="Delete User"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const handleDeleteUser = (userId) => {
    fetch(`http://localhost/Reactjs/react-PlusPackage/backend/admin/DeleteUser/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userId }),
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      if (data.success) {
        setUsers(users.filter(user => user.id !== userId));
        console.log('User deleted successfully:', data);
      } else {
        console.error('Error deleting user:', data.message);
      }
    })
    .catch(err => console.error('Error deleting user:', err));
  };

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
            Logged in as:<strong> {userName} </strong>
          </span>
          <button className="btn btn-light btn-sm px-3 shadow" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Main content */}
      <div className="row g-0 flex-grow-1">
        {/* Sidebar */}
        <aside className="col-md-3 col-lg-2 bg-primary border-top border-end min-vh-100 p-3 d-flex flex-column">
          <h5 className="text-white mb-4 fw-bold">Menu</h5>
          <ul className="nav flex-column gap-2">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link text-white fs-6 px-3 py-2 rounded hover-bg-light">
                🏠 Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link active bg-white text-primary fs-6 px-3 py-2 rounded shadow-sm">
                👥 Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/posts" className="nav-link text-white fs-6 px-3 py-2 rounded hover-bg-light">
                📝 Posts
              </Link>
            </li>
            <li className="nav-item mt-auto">
              <Link to="/dashboard/settings" className="nav-link text-white fs-6 px-3 py-2 rounded hover-bg-light">
                ⚙️ Settings
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main panel */}
        <main className="col-md-9 col-lg-10 p-4 bg-white overflow-auto">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h2 className="mb-0 text-primary fw-bold">Users</h2>
            <button className="btn btn-success shadow-sm d-flex align-items-center gap-2 px-4 py-2">
              <FontAwesomeIcon icon={faUserPlus} size="lg" /> 
              <a href='/AddUser' className="text-decoration-none">Add User</a>
            </button>
          </div>

          <hr />

          <ul className="nav nav-pills mb-4 gap-2 flex-wrap">
            {['admin', 'author', 'publisher', 'reviewer', 'editor'].map(type => (
              <li className="nav-item" key={type}>
                <button 
                  className={`nav-link px-3 py-2 rounded-pill fw-semibold ${activeTab === type ? 'active' : 'text-primary border border-primary'}`} 
                  onClick={() => setActiveTab(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}s
                </button>
              </li>
            ))}
          </ul>

          <div className="tab-content">
            {['admin', 'author', 'publisher', 'reviewer', 'editor'].map(type => (
              <div key={type} className={`tab-pane fade ${activeTab === type ? 'show active' : ''}`}>
                <h5 className="mb-3 fw-semibold text-primary">{type.charAt(0).toUpperCase() + type.slice(1)}s</h5>
                {renderUserCards(type)}
              </div>
            ))}
          </div>
        </main>
      </div>

      <style>{`
        /* Custom hover background for sidebar links */
        .hover-bg-light:hover {
          background-color: rgba(255 255 255 / 0.2);
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default Users;
