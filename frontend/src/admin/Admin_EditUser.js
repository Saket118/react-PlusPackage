import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  const [formData, setFormData] = useState({
    id: null,
    email: "",
    password: "",
    confirmPassword: "",
    user_type: "",
    title: "",
    name: "",
    qualification: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
    image: null,
    existingImage: null,
  });

  useEffect(() => {
    if (user) {
      console.log("Loaded user:", user);
      setFormData(prev => ({
        ...prev,
        ...user,
        id: user.id || null,
        password: "",
        confirmPassword: "",
        existingImage: user.image || null,
        user_type: user.user_type ? user.user_type.toLowerCase() : "", // normalize user_type
      }));
    } else {
      alert("No user data provided.");
      navigate("/users"); // fallback redirect
    }
  }, [user, navigate]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "image") {
      if (files.length > 0) {
        setFormData(prev => ({
          ...prev,
          image: URL.createObjectURL(files[0]),
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          image: `http://localhost/Reactjs/react-PlusPackage/frontend/public/${value}`,
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const submitData = new FormData();
    for (const key in formData) {
      if (key === "existingImage" || formData[key] === null) continue;
      submitData.append(key, formData[key]);
    }

    fetch(`http://localhost/Reactjs/react-PlusPackage/backend/admin/UpdateUser/${formData.id}`, {
      method: "POST",
      body: submitData,
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || "User updated successfully.");
        navigate("/users");
      })
      .catch(err => {
        console.error(err);
        alert("Failed to update user.");
      });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-start flex-wrap">
        <form onSubmit={handleSubmit} className="flex-grow-1 me-4" style={{ minWidth: "300px" }}>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Edit User</h5>
              <hr />
              <div className="mb-3">
                <label>Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Password*</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter new password or leave blank"
                />
              </div>
              <div className="mb-3">
                <label>Confirm Password*</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Confirm new password"
                />
              </div>
              <div className="mb-3">
                <label>User Type*</label>
                <select
                  name="user_type"
                  value={formData.user_type}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select One</option>
                  <option value="admin">Admin</option>
                  <option value="author">Author</option>
                  <option value="reviewer">Reviewer</option>
                  <option value="editor">Editor</option>
                  <option value="publisher">Publisher</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Personal Details</h5>
              <hr />
              <div className="mb-3">
                <label>Title</label>
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Select One</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                  <option value="Prof.">Prof.</option>
                </select>
              </div>
              <div className="mb-3">
                <label>Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Zip</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-success w-100">
                Update User
              </button>
            </div>
          </div>
        </form>

        <div className="text-center" style={{ minWidth: "160px" }}>
          <label>
            <strong>Profile Photo</strong>
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="form-control mb-2"
          />
          {formData.image ? (
            <img
              src={formData.image}
              alt="Preview"
              className="img-thumbnail"
              style={{ width: "140px", height: "180px", objectFit: "cover" }}
            />
          ) : formData.existingImage ? (
            <img
              src={`http://localhost/Reactjs/react-PlusPackage/frontend/public/${formData.existingImage}`}
              alt="Current"
              className="img-thumbnail"
              style={{ width: "140px", height: "180px", objectFit: "cover" }}
            />
          ) : (
            <div
              className="border border-secondary d-flex align-items-center justify-content-center"
              style={{ width: "140px", height: "180px" }}
            >
              No Image
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditUser;
