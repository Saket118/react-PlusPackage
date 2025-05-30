import React from 'react';
import PublicationChart from './script/PublicationChart';
import ArticleChart from './script/ArticleChart';
const LeftSidebar = () => (
  <div>
    <div className="card text-center">
      <div className="card-header top-header">
        Total Published Articles
      </div>
      <div className="card-body">
        3
      </div>
    </div>
    <div className="card mt-2 text-center">
      <div className="card-header top-header">
        Subscribe for TOC Alerts
      </div>
      <div className="card-body">
       
            <form data-type="TOCAlert">
              <div className="mb-3">
                <input type="text" name="emailInput" className="form-control" placeholder="Subscribe to Newsletter" />
              </div>
              <div id="alert1" className="alert d-none" role="alert"></div>
              <div className="text-center">
                <button type="button" className="btn btn-outline-success">Subscribe</button>
              </div>
            </form>
      </div>
    </div>
    <div className="card mt-2 text-center">
      <div className="card-header top-header">
        Worldwide Visitors
      </div>
      <div className="card-body">
        {/* Add visitor statistics here */}
      </div>
    </div>
    <div className="card mt-2 text-center">
      <div className="card-header top-header">
        News
      </div>
     
      <div className="card-body vertical-marquee-wrapper">
        <div className="marquee">
          <p>Dummy Ad 1: Get 50% off on your first purchase!</p>
          <hr/>
           <p> Dummy Ad 2: Subscribe now and get exclusive content!</p>    <hr/> 
           <p>  Dummy Ad 3: Limited time offer: Free shipping on orders over $50!</p>   <hr/>
       
      </div>
      </div>
    </div>
    <div className="card mt-2 text-center">
      <div className="card-header top-header">
        Advertisements
      </div>
      <div className="card-body vertical-marquee-wrapper">
        <div className="marquee">
          <p>Dummy Ad 1: Get 50% off on your first purchase!</p>
          <hr/>
           <p> Dummy Ad 2: Subscribe now and get exclusive content!</p>    <hr/> 
           <p>  Dummy Ad 3: Limited time offer: Free shipping on orders over $50!</p>   <hr/>
        </div>
      </div>
    </div>
    <div className="card mt-2 text-center">
      <div className="card-header top-header">
        <a href='/login' className='text-decoration-none'>Sign in</a> / <a href='/register' className='text-decoration-none'>Sign up</a>
      </div>
    </div>
    <div className="card mt-2 text-center">
      <div className="card-header top-header">
        Publication Statistics
      </div>
      <div className="card-body">
        <PublicationChart /> {/* Use the PublicationChart component */}
      </div>
    </div>
    <div className="card mt-2 text-center">
      <div className="card-header top-header">
        Articles Statistics
      </div>
      <div className="card-body">
        <ArticleChart /> {/* Add article statistics here */}
      </div>
    </div>
    <div className="card mt-2 text-center">
      <div className="card-header top-header">
        Hit Counter
      </div>
      <div className="card-body">
        1234
      </div>
    </div>
   
  </div>
);

export default LeftSidebar; // Export the component