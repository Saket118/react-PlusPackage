import React from 'react';


const ContectUs = () => (
  <div>
   

    <div className="card my-3 container">
      <h2>Contact Us</h2> {/* Corrected spelling */}
      <hr />
      <form> {/* Ensure the form is properly closed */}
        <div className="row mb-3">
          <label htmlFor="applicant_name" className="col-sm-3 ps-4 col-form-label">
            Name <span className="text-danger">*</span>
          </label>
          <div className="col-sm-9">
            <input type="text" className="form-control" id="applicant_name" name="applicant_name" placeholder="Enter your name" />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="applicant_email" className="col-sm-3 ps-4 col-form-label">
            Email <span className="text-danger">*</span>
          </label>
          <div className="col-sm-9">
            <input type="email" className="form-control" id="applicant_email" name="applicant_email" placeholder="Enter your email" />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="subject" className="col-sm-3 ps-4 col-form-label">
            Subject <span className="text-danger">*</span>
          </label>
          <div className="col-sm-9">
            <select className="form-select" id="subject" aria-label="Default select example">
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
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="address" className="col-sm-3 ps-4 col-form-label">
            Address <span className="text-danger">*</span>
          </label>
          <div className="col-sm-9">
            <textarea className="form-control" id="address" aria-label="With textarea" placeholder="Enter your address"></textarea>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-9 offset-sm-3">
            <button type="submit" className="btn btn-primary">Submit</button> {/* Added submit button */}
          </div>
        </div>
      </form> {/* Closing form tag added here */}
    </div> {/* Closing div for card */}

  </div>
);

export default ContectUs;