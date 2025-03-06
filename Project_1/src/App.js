import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
// import { BrowserRouter as Router, Route, Routes, Switch, Link } from "react-router-dom";
import Navbar from "./nav"; // Adjust based on actual file names


import SignIn from "./signin"; // Adjust path based on your structure
import Register from "./register"; // Adjust path based on your structure


import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./home";



function App() {
  return (
    <Router>
      <Navbar />
      {/* <ScrollToTop />  */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    
  );
}

export default App;
