import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./nav"; // Adjust based on actual file names
import Home from "./home";
// import About from "./About";
// import Contact from "./Contact";
import SignIn from "./signin"; // Assuming SignIn is in the same folder
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


function App() {
  return (
    <Router>
      <Navbar />
      {/* <ScrollToTop />  */}
      <Routes>
        <Route path="/" element={<SignIn />} />
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
