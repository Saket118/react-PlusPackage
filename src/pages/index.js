import React from 'react';
import LeftSidebar from './leftSidebar';
import RightSidebar from './rightSidebar';

const Index = () => {
  return (
    <div className="container-fluid mt-1">
      <div className="row">
        {/* Left Sidebar */}
        <aside className="col-md-2 mb-3">
          <LeftSidebar />
        </aside>

        {/* Main Content */}
        <main className="col-md-8 mb-3">
          <section>
            <h2>Home</h2>
            <hr />
            {/* Main content goes here */}
            <p>Welcome to the homepage. Customize this section with your actual content.</p>
          </section>
        </main>

        {/* Right Sidebar */}
        <aside className="col-md-2 mb-3">
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
};

export default Index;
