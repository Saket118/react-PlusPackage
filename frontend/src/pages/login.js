import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../utils/auth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'admin'
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/Reactjs/react-PlusPackage/backend/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success && result.token) {
        setToken(result.token);
        localStorage.setItem('userType', formData.userType);
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userName', result.name); // 👈 Add this
                console.log(result);
        switch (formData.userType) {
          case 'admin':
            navigate('/dashboard');
            break;
          case 'author':
            navigate('/AuthorDashboard');
            break;
          case 'reviewer':
            navigate('/ReviewerDashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        setMessage(result.message || 'Login failed.');
      }
    } catch (error) {
      setMessage('Something went wrong.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg border-0" style={{ width: '320px' }}>
        <div className="card-body p-4">
          <h4 className="text-center mb-4">Login</h4>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <label>Email address</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <label>Password</label>
            </div>

            <div className="form-floating mb-3">
              <select
                className="form-select"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
              >
                <option value="admin">Admin</option>
                <option value="author">Author</option>
                <option value="reviewer">Reviewer</option>
              </select>
              <label>User Type</label>
            </div>

            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          {message && <p className="mt-3 text-danger text-center">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
