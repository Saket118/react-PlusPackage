import React from 'react';

const Register = () => (


    
    <div className="border container">
      <h2>Register</h2>
      <hr />
      <div className="container mt-4">
        <form method="post">
          <input type="hidden" name="form_type" id="form_type" value="register" />

          {/* Login Details */}
          <fieldset className="border p-3 mb-4">
            <legend className="w-auto px-2">Login Details</legend>

            <div className="row mb-3">
              <label htmlFor="reg_email" className="col-sm-3 col-form-label">Email<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="reg_email" name="reg_email" />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="reg_pass" className="col-sm-3 col-form-label">Password<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <input type="password" className="form-control" id="reg_pass" name="reg_pass" />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="reg_cpass" className="col-sm-3 col-form-label">Confirm Password<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <input type="password" className="form-control" id="reg_cpass" name="reg_cpass" />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="reg_type" className="col-sm-3 col-form-label">User Type<span className="text-danger">*</span></label>
              <div className="col-sm-4">
                <select className="form-select" id="reg_type" name="reg_type">
                  <option value="" selected disabled>Select One</option>
                  <option value="Author">Author</option>
                  <option value="Reviewer">Reviewer</option>
                </select>
              </div>
            </div>
          </fieldset>

          {/* Personal Details */}
          <fieldset className="border p-3 mb-4">
            <legend className="w-auto px-2">Personal Details</legend>

            <div className="row mb-3">
              <label htmlFor="reg_title" className="col-sm-3 col-form-label">Title</label>
              <div className="col-sm-4">
                <select className="form-select" id="reg_title" name="reg_title">
                  <option value="" selected disabled>Select One</option>
                  <option>Mr.</option>
                  <option>Ms.</option>
                  <option>Dr.</option>
                  <option>Prof.</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="reg_name" className="col-sm-3 col-form-label">Name<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="reg_name" name="reg_name" />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="reg_qual" className="col-sm-3 col-form-label">Qualification<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="reg_qual" name="reg_qual" />
              </div>
            </div>
          </fieldset>

          {/* Contact Details */}
          <fieldset className="border p-3 mb-4">
            <legend className="w-auto px-2">Contact Details</legend>

            <div className="row mb-3">
              <label htmlFor="reg_addr" className="col-sm-3 col-form-label">Address<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <textarea className="form-control" id="reg_addr" name="reg_addr" rows="2"></textarea>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="reg_city" className="col-sm-3 col-form-label">City<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="reg_city" name="reg_city" />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="reg_state" className="col-sm-3 col-form-label">State<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="reg_state" name="reg_state" />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="reg_zip" className="col-sm-3 col-form-label">Zipcode<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="reg_zip" name="reg_zip" />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="reg_country" className="col-sm-3 col-form-label">Country<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <select className="form-select" id="reg_country" name="reg_country">
                  <option value="" selected disabled>Country</option>
                  {/* Replace this with a JavaScript array or API call to fetch countries */}
                  <option value="Country1">Country1</option>
                  <option value="Country2">Country2</option>
                  <option value="Country3">Country3</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="reg_phone" className="col-sm-3 col-form-label">Phone<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="reg_phone" name="reg_phone" />
              </div>
            </div>
          </fieldset>

          <div className="mb-3 d-flex justify-content-center gap-3">
            <button type="button"  className="btn btn-primary">Register</button>
            <button type="reset" className="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>

 
);

export default Register;