// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/header';
import Footer from './pages/footer';
import Index from  './pages/index';
import Register from "./pages/register";
import AboutUs from "./pages/about_us";
import ContectUs from "./pages/Contect_us";
import SubmitManuscript from "./pages/SubmitManuscript";
import AuthorGuidlines from "./pages/Author_Guidlines";
import Archives from "./pages/Archives";
import ForthcommingIssue from "./pages/forthcomming_Issue";
import EditorialBoard from "./pages/editorial_board";
import CurrentIssue  from  "./pages/current_Issue";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/register"element={<Register />}/>
        <Route path="/AboutUs"element={<AboutUs />}/>
        <Route path="/EditorialBoard"element={<EditorialBoard />}/>
        <Route path="/ContectUs"element={<ContectUs />}/>
        <Route path="/SubmitManuscript"element={<SubmitManuscript />}/>
        <Route path="/AuthorGuidlines"element={<AuthorGuidlines />}/>
        <Route path="/Archives"element={<Archives />}/>
        <Route path="/ForthcommingIssue"element={<ForthcommingIssue />}/>
        <Route path="/CurrentIssue"element={<CurrentIssue />}/>
      </Routes>
    </Router>
  );
}

export default App;
