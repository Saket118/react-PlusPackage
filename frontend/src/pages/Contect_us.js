import React, { useState } from 'react';
import { validateContactForm } from './script/formValidation';

const ContactUs = () => {
  const [values, setValues] = useState({
    applicant_name: '',
    applicant_email: '',
    applicant_subject: '',
    applicant_address: '',
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleValidation = (event) => {
    event.preventDefault();
    const { tempErrors, isValid } = validateContactForm(values);
    setErrors(tempErrors);

    if (isValid) {
      console.log('Form submitted:', values);
      // Add your API submission logic here
    }
  };

  return (
    <div className="card my-3 container">
      <h2>Contact Us</h2>
      <hr />
      <form onSubmit={handleValidation}>
        <div className="row mb-3">
          <label htmlFor="applicant_name" className="col-sm-3 ps-4 col-form-label">
            Name <span className="text-danger">*</span>
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="applicant_name"
              name="applicant_name"
              value={values.applicant_name}
              onChange={handleInput}
              placeholder="Enter your name"
            />
            {errors.applicant_name && <small className="text-danger">{errors.applicant_name}</small>}
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="applicant_email" className="col-sm-3 ps-4 col-form-label">
            Email <span className="text-danger">*</span>
          </label>
          <div className="col-sm-9">
            <input
              type="email"
              className="form-control"
              id="applicant_email"
              name="applicant_email"
              value={values.applicant_email}
              onChange={handleInput}
              placeholder="Enter your email"
            />
            {errors.applicant_email && <small className="text-danger">{errors.applicant_email}</small>}
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="applicant_subject" className="col-sm-3 ps-4 col-form-label">
            Subject <span className="text-danger">*</span>
          </label>
          <div className="col-sm-9">
            <select
              className="form-select"
              id="applicant_subject"
              name="applicant_subject"
              value={values.applicant_subject}
              onChange={handleInput}
            >
              <option value="">Select Subject</option>
              <option value="Subscription of a Journal">Subscription of a Journal</option>
              <option value="Submission of New Manuscript">Submission of New Manuscript</option>
              <option value="Submission of revised Manuscript">Submission of Revised Manuscript</option>
              <option value="Submission of Final Proof Corrections">Submission of Final Proof Corrections</option>
              <option value="Processing Cost">Processing Cost</option>
              <option value="Joining as Editor Reviewer">Joining as Editor Reviewer</option>
              <option value="Abstracting/Indexing of a Journal">Abstracting/Indexing of a Journal</option>
              <option value="Published Articles">Published Articles</option>
              <option value="Manuscript Assistance">Manuscript Assistance</option>
            </select>
            {errors.applicant_subject && <small className="text-danger">{errors.applicant_subject}</small>}
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="applicant_address" className="col-sm-3 ps-4 col-form-label">
            Address <span className="text-danger">*</span>
          </label>
          <div className="col-sm-9">
            <textarea
              className="form-control"
              id="applicant_address"
              name="applicant_address"
              value={values.applicant_address}
              onChange={handleInput}
              placeholder="Enter your address"
            ></textarea>
            {errors.applicant_address && <small className="text-danger">{errors.applicant_address}</small>}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-9 offset-sm-3">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
