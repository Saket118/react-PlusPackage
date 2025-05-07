import React from 'react';
import MenuscriptChart from './script/Menuscript'

const rightSidebar = () => (
  <div>
<div class="card mt-2 text-center">
  <div class="card-header top-header">
 <a href='register' className='text-decoration-none' > Join as Author/ Reviewer/ Editor</a>
  </div>
</div>

<div class="card mt-2 text-center">
  <div class="card-header top-header">
  Most viewed articles
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
<div class="card mt-2 text-center">
  <div class="card-header top-header">
  Search Articles
  </div>
  <div className="card-body">
   
            <form data-type="EmailAlert">
              <div className="mb-3">
                <input type="text" name="emailInput" className="form-control" placeholder="Subscribe to Newsletter" />
              </div>
              <div className="mb-3">
                <input type="text" name="emailInput" className="form-control" placeholder="Subscribe to Newsletter" />
              </div>
              <div id="alert1" className="alert d-none" role="alert"></div>
              <div className="text-center">
                <button type="button" className="btn btn-outline-success">Search</button>
              </div>
            </form>
      </div>
</div>

<div class="card mt-2 text-center">
  <div class="card-header top-header">
 <a href='track-Manuscript' className='text-decoration-none'>Track Manuscript</a>
  </div>
 
</div>
<div class="card mt-2 text-center">
  <div class="card-header top-header">
 <a href='Conference' className='text-decoration-none'>Conference</a>
  </div>
  <div class="card-body">
  <div className="card-body vertical-marquee-wrapper">
        <div className="marquee">
          <p>Dummy Ad 1: Get 50% off on your first purchase!</p>
          <hr/>
           <p> Dummy Ad 2: Subscribe now and get exclusive content!</p>    <hr/> 
           <p>  Dummy Ad 3: Limited time offer: Free shipping on orders over $50!</p>   <hr/>
       
      </div>
      </div>
  </div>
</div>
<div class="card mt-2 text-center">
  <div class="card-header top-header">
  Manuscript Statistics
  </div>
  <div class="card-body">
    < MenuscriptChart/>
  </div>
</div>
<div class="card mt-2 text-center">
  <div class="card-header top-header">
 <a href='rssFeed'className='text-decoration-none' >RSS feed</a>
  </div>
</div>
<div class="card mt-2 text-center">
  <div class="card-header top-header">
  Most downloaded articles
  </div>
  
  <div className="card-body vertical-marquee-wrapper">
        <div className="marquee">
          <p>Dummy Ad 1: Get 50% off on your first purchase!</p><hr/>
           <p> Dummy Ad 2: Subscribe now and get exclusive content!</p><hr/> 
           <p>  Dummy Ad 3: Limited time offer: Free shipping on orders over $50!</p><hr/>
       
      
      </div>
  </div>
</div>
<div class="card mt-2 text-center">
  <div class="card-header top-header">
  Indexed in
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
  </div>
);

export default rightSidebar;