import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./signin"; // Adjust path based on your structure
import Register from "./register"; // Adjust path based on your structure



const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        alert("You have been logged out.");
        navigate("/signin");
    }

    useEffect(() => {
        const handleResize = () => {
            const navbar = document.getElementById("navbarNav");
            if (window.innerWidth < 992) {
                navbar.classList.remove("show");
            } else {
                navbar.classList.add("show");
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        // <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">

            <div className="container">
                <Link className="navbar-brand" to="/">SeptaSys7ems</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><a className="nav-link" href="/about.html">About</a></li>
                        <li className="nav-item"><a className="nav-link" href="/contact.html">Contact</a></li>
                        <li className="nav-item"><Link className="nav-link" to="/signin">Sign In</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                        <li className="nav-item"><button className="nav-link btn btn-link" onClick={handleLogout}>Sign Out</button></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
