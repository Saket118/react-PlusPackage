import React, { useState } from 'react';
import { validateRegisterForm } from './script/formValidation';

const Register = () => {
  const [values, setValues] = useState({
    reg_email: '',
    reg_pass: '',
    reg_cpass: '',
    reg_type: '',
    reg_title: '',
    reg_name: '',
    reg_qual: '',
    reg_addr: '',
    reg_city: '',
    reg_state: '',
    reg_zip: '',
    reg_country: '',
    reg_phone: '',
  });

  const [errors, setErrors] = useState({});
  const [responseMsg, setResponseMsg] = useState('');

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleValidation = async (event) => {
    event.preventDefault();
    const { tempErrors, isValid } = validateRegisterForm(values);
    setErrors(tempErrors);

    if (isValid) {
      const response = await fetch('http://localhost/Reactjs/react-pluspackage/backend/register_back', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        setResponseMsg('Registration successful!');
        setValues({
          reg_email: '',
          reg_pass: '',
          reg_cpass: '',
          reg_type: '',
          reg_title: '',
          reg_name: '',
          reg_qual: '',
          reg_addr: '',
          reg_city: '',
          reg_state: '',
          reg_zip: '',
          reg_country: '',
          reg_phone: '',
        });
      } else {
        setResponseMsg(result.message || 'Registration failed.');
      }
    }
  };

  return (
    <div className="border container">
      <h2>Register</h2>
      <hr />
      <div className="container mt-4">
        <form onSubmit={handleValidation}>
          <input type="hidden" name="form_type" id="form_type" value="register" />

          {/* LOGIN DETAILS */}
          <fieldset className="border p-3 mb-4">
            <legend className="w-auto px-2">Login Details</legend>

            {/* Email */}
            <div className="row mb-3">
              <label htmlFor="reg_email" className="col-sm-3 col-form-label">Email<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="reg_email" name="reg_email" value={values.reg_email} onChange={handleInput} />
                {errors.reg_email && <small className="text-danger">{errors.reg_email}</small>}
              </div>
            </div>

            {/* Password */}
            <div className="row mb-3">
              <label htmlFor="reg_pass" className="col-sm-3 col-form-label">Password<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <input type="password" className="form-control" id="reg_pass" name="reg_pass" value={values.reg_pass} onChange={handleInput} />
                {errors.reg_pass && <small className="text-danger">{errors.reg_pass}</small>}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="row mb-3">
              <label htmlFor="reg_cpass" className="col-sm-3 col-form-label">Confirm Password<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <input type="password" className="form-control" id="reg_cpass" name="reg_cpass" value={values.reg_cpass} onChange={handleInput} />
                {errors.reg_cpass && <small className="text-danger">{errors.reg_cpass}</small>}
              </div>
            </div>

            {/* User Type */}
            <div className="row mb-3">
              <label htmlFor="reg_type" className="col-sm-3 col-form-label">User Type<span className="text-danger">*</span></label>
              <div className="col-sm-4">
                <select className="form-select" id="reg_type" name="reg_type" value={values.reg_type} onChange={handleInput}>
                  <option value="" disabled>Select One</option>
                  <option value="Author">Author</option>
                  <option value="Reviewer">Reviewer</option>
                </select>
                {errors.reg_type && <small className="text-danger">{errors.reg_type}</small>}
              </div>
            </div>
          </fieldset>

          {/* PERSONAL DETAILS */}
          <fieldset className="border p-3 mb-4">
            <legend className="w-auto px-2">Personal Details</legend>

            {/* Title */}
            <div className="row mb-3">
              <label htmlFor="reg_title" className="col-sm-3 col-form-label">Title</label>
              <div className="col-sm-4">
                <select className="form-select" id="reg_title" name="reg_title" value={values.reg_title} onChange={handleInput}>
                  <option value="" disabled>Select One</option>
                  <option>Mr.</option>
                  <option>Ms.</option>
                  <option>Dr.</option>
                  <option>Prof.</option>
                </select>
                {errors.reg_title && <small className="text-danger">{errors.reg_title}</small>}
              </div>
            </div>

            {/* Name */}
            <div className="row mb-3">
              <label htmlFor="reg_name" className="col-sm-3 col-form-label">Name<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="reg_name" name="reg_name" value={values.reg_name} onChange={handleInput} />
                {errors.reg_name && <small className="text-danger">{errors.reg_name}</small>}
              </div>
            </div>

            {/* Qualification */}
            <div className="row mb-3">
              <label htmlFor="reg_qual" className="col-sm-3 col-form-label">Qualification<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="reg_qual" name="reg_qual" value={values.reg_qual} onChange={handleInput} />
                {errors.reg_qual && <small className="text-danger">{errors.reg_qual}</small>}
              </div>
            </div>
          </fieldset>

          {/* CONTACT DETAILS */}
          <fieldset className="border p-3 mb-4">
            <legend className="w-auto px-2">Contact Details</legend>

            {/* Address */}
            <div className="row mb-3">
              <label htmlFor="reg_addr" className="col-sm-3 col-form-label">Address<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <textarea className="form-control" id="reg_addr" name="reg_addr" value={values.reg_addr} onChange={handleInput} rows="2"></textarea>
                {errors.reg_addr && <small className="text-danger">{errors.reg_addr}</small>}
              </div>
            </div>

            {/* City */}
            <div className="row mb-3">
              <label htmlFor="reg_city" className="col-sm-3 col-form-label">City<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="reg_city" name="reg_city" value={values.reg_city} onChange={handleInput} />
                {errors.reg_city && <small className="text-danger">{errors.reg_city}</small>}
              </div>
            </div>

            {/* State */}
            <div className="row mb-3">
              <label htmlFor="reg_state" className="col-sm-3 col-form-label">State<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="reg_state" name="reg_state" value={values.reg_state} onChange={handleInput} />
                {errors.reg_state && <small className="text-danger">{errors.reg_state}</small>}
              </div>
            </div>

            {/* Zip */}
            <div className="row mb-3">
              <label htmlFor="reg_zip" className="col-sm-3 col-form-label">Zipcode<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="reg_zip" name="reg_zip" value={values.reg_zip} onChange={handleInput} />
                {errors.reg_zip && <small className="text-danger">{errors.reg_zip}</small>}
              </div>
            </div>

            {/* Country */}
            <div className="row mb-3">
              <label htmlFor="reg_country" className="col-sm-3 col-form-label">Country<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <select className="form-select" id="reg_country" name="reg_country" value={values.reg_country} onChange={handleInput}>
                  <option value="" disabled>Country</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                </select>
                {errors.reg_country && <small className="text-danger">{errors.reg_country}</small>}
              </div>
            </div>

            {/* Phone */}
            <div className="row mb-3">
              <label htmlFor="reg_phone" className="col-sm-3 col-form-label">Phone<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="reg_phone" name="reg_phone" value={values.reg_phone} onChange={handleInput} />
                {errors.reg_phone && <small className="text-danger">{errors.reg_phone}</small>}
              </div>
            </div>
          </fieldset>

          {/* Submit / Reset */}
          <div className="mb-3 d-flex justify-content-center gap-3">
            <button type="submit" className="btn btn-primary">Register</button>
            <button type="reset" className="btn btn-secondary">Cancel</button>
          </div>

          {/* Response Message */}
          {responseMsg && <div className="alert alert-info mt-3">{responseMsg}</div>}
        </form>
      </div>
    </div>
  );
};

export default Register;
