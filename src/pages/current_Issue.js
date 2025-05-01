import React from 'react';
import Header from './header';
import Footer from './footer';

const currentIssue = () => (
  <div>
    <Header />
    <div className= "container">
      <h2>Current Issue</h2>
      <hr />
     
    </div>
    <Footer />
  </div>
);

export default currentIssue;