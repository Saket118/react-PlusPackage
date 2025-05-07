import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Header = () => (
  <div>
    <header>
      <nav>
        <div className="container-fluid d-flex justify-content-end top-header top-header">
          <a href="/" className="me-3 text-decoration-none text-dark fw-semibold" aria-label="Login to your account">Login</a>
          <a href="register" className="me-3 text-decoration-none text-dark fw-semibold" aria-label="Register a new account">Register</a>
          <a href="mailto:Saket@gmail.com" className="me-3 text-decoration-none text-dark fw-semibold" aria-label="Email saket@gmail.com">Saket@gmail.com</a>
        </div>
      </nav>
    </header>
    <div className="container-fluid bg-success">
      <div className="row d-flex justify-content-between">
        <div className="col-md-4 py-2 text-center">
          <img src="/include/image/logo.png" alt="Logo" height="100" width="100"/>
        </div>
        <div className="col-md-4 text-center pt-4 fs-3">Ubi journal</div>
        <div className="col-md-4 text-center py-3 fs-5 fw-semibold">soon</div>
      </div>
    </div>
    <nav className="navbar navbar-expand-lg top-header">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <img src="/include/image/logo.png" alt="Logo" height="30" width="30"/>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
          <div className="navbar-nav gap-2 text-center">
            <a className="nav-link  active" aria-current="page" href="/">Home</a>
            <a className="nav-link " href="AboutUs">About Us</a>
            <a className="nav-link " href="EditorialBoard">Editorial Board</a>
            <a className="nav-link " href= "CurrentIssue" >Current Issue</a>
            <a className="nav-link " href= "ForthcommingIssue" >Forthcomming Issue</a>
            <a className="nav-link " href= "Archives" >Archives</a>
            <a className="nav-link " href= "AuthorGuidlines" >Author Guidlines</a>
            <a className="nav-link " href= "SubmitManuscript" >Submit Manuscript</a>
            <a className="nav-link " href= "ContectUs" >Contect Us</a>

          </div>
        </div>
      </div>
    </nav>
  </div>
);

export default Header;