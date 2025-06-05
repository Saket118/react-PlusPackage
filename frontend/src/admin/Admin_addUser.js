import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  const [values, setValues] = useState({
    reg_email: '', reg_pass: '', reg_cpass: '', reg_type: '',
    reg_title: '', reg_name: '', reg_qual: '', reg_addr: '',
    reg_city: '', reg_state: '', reg_zip: '', reg_country: '',
    reg_phone: ''
  });

  const [errors, setErrors] = useState({});
  const [responseMsg, setResponseMsg] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleValidation = (e) => {
    e.preventDefault();
    let tempErrors = {};
    if (!values.reg_email) tempErrors.reg_email = "Email is required";
    if (!values.reg_pass) tempErrors.reg_pass = "Password is required";
    if (values.reg_pass !== values.reg_cpass) tempErrors.reg_cpass = "Passwords do not match";
    if (!values.reg_name) tempErrors.reg_name = "Name is required";
    if (!values.reg_type) tempErrors.reg_type = "User type is required";
    
    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      if (image) {
        formData.append('reg_image', image);
      }

      fetch('http://localhost/Reactjs/react-PlusPackage/backend/admin/registerUser', {
        method: 'POST',
        body: formData,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setResponseMsg("User registered successfully!");
        console.log(data);
      })
      .catch(error => {
        setResponseMsg("Error registering user: " + error.message);
      });
    }
  };
  

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const userName = localStorage.getItem("userName") || "User";

  return (
    <div className="container-fluid p-0 bg-light min-vh-100 d-flex flex-column">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 shadow-sm">
        <img src="/images/1659945098_unnamed_(1).png" alt="Logo" className="navbar-brand pe-2" style={{ height: '40px' }} />
        <span className="navbar-brand fw-semibold fs-4">Admin Dashboard</span>
        <div className="ms-auto d-flex align-items-center gap-3">
          <span className="text-white fs-6">
            Logged in as: <strong>{userName}</strong>
          </span>
          <button className="btn btn-outline-light btn-sm px-3" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Layout */}
      <div className="row flex-grow-1 g-0">
        {/* Sidebar */}
        <aside className="col-md-3 col-lg-2 bg-primary p-3">
          <h5 className="text-white fw-bold">Menu</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link to="/dashboard" className="nav-link text-white">🏠 Home</Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/dashboard/users" className="nav-link active bg-white text-primary fw-semibold rounded px-3 py-2">👥 Users</Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/dashboard/posts" className="nav-link text-white">📝 Posts</Link>
            </li>
            <li className="nav-item mt-auto">
              <Link to="/dashboard/settings" className="nav-link text-white">⚙️ Settings</Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="col-md-9 col-lg-10 p-4 overflow-auto">
          <form onSubmit={handleValidation} encType="multipart/form-data">
            <input type="hidden" name="form_type" value="register" />

            <div className="row">
              {/* Form Fields */}
              <div className="col-md-9">
                {/* Login Details */}
                <fieldset className="border p-3 mb-4">
                  <legend className="w-auto px-2">Add User</legend>
                  <hr />
                  {/* Email */}
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Email<span className="text-danger">*</span></label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="reg_email" value={values.reg_email} onChange={handleInput} />
                      {errors.reg_email && <small className="text-danger">{errors.reg_email}</small>}
                    </div>
                  </div>
                  {/* Password */}
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Password<span className="text-danger">*</span></label>
                    <div className="col-sm-9">
                      <input type="password" className="form-control" name="reg_pass" value={values.reg_pass} onChange={handleInput} />
                      {errors.reg_pass && <small className="text-danger">{errors.reg_pass}</small>}
                    </div>
                  </div>
                  {/* Confirm Password */}
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Confirm Password<span className="text-danger">*</span></label>
                    <div className="col-sm-9">
                      <input type="password" className="form-control" name="reg_cpass" value={values.reg_cpass} onChange={handleInput} />
                      {errors.reg_cpass && <small className="text-danger">{errors.reg_cpass}</small>}
                    </div>
                  </div>
                  {/* User Type */}
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">User Type<span className="text-danger">*</span></label>
                    <div className="col-sm-4">
                      <select className="form-select" name="reg_type" value={values.reg_type} onChange={handleInput}>
                        <option value="">Select One</option>
                        <option>Admin</option>
                        <option>Author</option>
                        <option>Publisher</option>
                        <option>Reviewer</option>
                      </select>
                      {errors.reg_type && <small className="text-danger">{errors.reg_type}</small>}
                    </div>
                  </div>
                </fieldset>

                {/* Personal Details */}
                <fieldset className="border p-3 mb-4">
                  <legend className="w-auto px-2">Personal Details</legend>
                  {/* Title */}
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Title</label>
                    <div className="col-sm-4">
                      <select className="form-select" name="reg_title" value={values.reg_title} onChange={handleInput}>
                        <option value="">Select One</option>
                        <option>Mr.</option>
                        <option>Ms.</option>
                        <option>Dr.</option>
                        <option>Prof.</option>
                      </select>
                    </div>
                  </div>
                  {/* Name */}
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Name<span className="text-danger">*</span></label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="reg_name" value={values.reg_name} onChange={handleInput} />
                      {errors.reg_name && <small className="text-danger">{errors.reg_name}</small>}
                    </div>
                  </div>
                  {/* Qualification */}
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Qualification</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="reg_qual" value={values.reg_qual} onChange={handleInput} />
                    </div>
                  </div>
                </fieldset>

                {/* Contact Details */}
                <fieldset className="border p-3 mb-4">
                  <legend className="w-auto px-2">Contact Details</legend>
                  {/* Address */}
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Address</label>
                    <div className="col-sm-9">
                      <textarea className="form-control" name="reg_addr" rows="2" value={values.reg_addr} onChange={handleInput}></textarea>
                    </div>
                  </div>
                  {/* City, State, Zip, Country, Phone */}
                  {["City", "State", "Zip", "Country", "Phone"].map((field, idx) => (
                    <div className="mb-3 row" key={idx}>
                      <label className="col-sm-3 col-form-label">{field}</label>
                      <div className="col-sm-9">
                        {field === "Country" ? (
                          <select className="form-select" name={`reg_${field.toLowerCase()}`} value={values[`reg_${field.toLowerCase()}`]} onChange={handleInput}>
                            <option value="">Country</option>
                            <option>India</option>
                            <option>USA</option>
                            <option>UK</option>
                          </select>
                        ) : (
                          <input type="text" className="form-control" name={`reg_${field.toLowerCase()}`} value={values[`reg_${field.toLowerCase()}`]} onChange={handleInput} />
                        )}
                      </div>
                    </div>
                  ))}
                </fieldset>

                {/* Submit Buttons */}
                <div className="d-flex justify-content-center gap-3">
                  <button type="submit" className="btn btn-primary">Register</button>
                  <button type="reset" className="btn btn-secondary">Cancel</button>
                </div>

                {/* Response Message */}
                {responseMsg && <div className="alert alert-info mt-3">{responseMsg}</div>}
              </div>

              {/* Profile Image Upload */}
              <div className="col-md-3 text-center">
                <label className="form-label">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  name="reg_image"
                  className="form-control mb-2"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImage(file);
                    setPreviewUrl(URL.createObjectURL(file));
                  }}
                />
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="img-thumbnail" style={{ width: '150px', height: '180px', objectFit: 'cover' }} />
                ) : (
                  <div className="border rounded bg-light d-flex align-items-center justify-content-center" style={{ width: '150px', height: '180px' }}>
                    <span className="text-muted">No Image</span>
                  </div>
                )}
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default RegistrationForm;
