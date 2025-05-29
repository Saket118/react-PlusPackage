import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error when typing
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Print form data to the console
    // console.log('Form Data:', formData);

    try {
      const response = await fetch('http://localhost/Reactjs/backend/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage('Login successful!');
        // You can redirect or store token here
      } else {
        setMessage(result.message || 'Login failed.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg border-0" style={{ width: '320px' }}>
        <div className="card-body p-4">
          <h4 className="text-center mb-4">Admin Login</h4>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-floating mb-3">
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Email address</label>
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Password</label>
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          {message && (
            <p className="mt-3 text-center text-danger">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
