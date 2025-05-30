import React from 'react';
import '../css/style.css';
import Header from './header';
import Footer from './footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 container my-2">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
