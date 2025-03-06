import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
// import { BrowserRouter as Router, Route, Routes, Switch, Link } from "react-router-dom";
import Navbar from "./nav"; // Adjust based on actual file names
// import Home from "./home";
// // import About from "./About";
// // import Contact from "./Contact";
// import SignIn from "./signin"; // Assuming SignIn is in the same folder
// import Register from "./register"; // Assuming Register is in the same folder
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
import logo from "./logo.png";

import SignIn from "./signin"; // Adjust path based on your structure
import Register from "./register"; // Adjust path based on your structure
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


// const dome = () => (
//   <div>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//           <a className="navbar-brand" href="/">
//               Welcome, Home page for Group 7
//               <img src="https://i.imgur.com/fubQ4Lr.png" alt="Logo" className="navbar-logo" />
//           </a>
//           <div className="collapse navbar-collapse">
//               <ul className="navbar-nav ml-auto">
//                   <li className="nav-item">
//                       <Link className="nav-link" to="/login">Login</Link>
//                   </li>
//                   <li className="nav-item">
//                       <Link className="nav-link" to="/register">Register</Link>
//                   </li>
//               </ul>
//           </div>
//       </nav>

//       <div className="hero">
//           <h1>Welcome to Group 7</h1>
//           <img src="https://i.imgur.com/fubQ4Lr.png" alt="Group 7 Logo" className="hero-logo" />
//           <p>tada.</p>
//           <Link to="/register" className="btn btn-primary btn-lg">Register</Link>
//           <Link to="/login" className="btn btn-secondary btn-lg ml-2">Login</Link>
//       </div>
//   </div>
// );


function App() {
  return (
    <Router>
      <Navbar />
      {/* <ScrollToTop />  */}
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
