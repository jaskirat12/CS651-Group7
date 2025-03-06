import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";

const SignIn = () => {
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const [formData, setFormData] = useState({ login: "", password: "", name: "", email: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (loggedInUser) {
            navigate("/home");
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem(formData.login));
        if (storedUser && storedUser.password === formData.password) {
            localStorage.setItem("loggedInUser", formData.login);
            alert(`Welcome back, ${storedUser.name}!`);
            navigate("/home"); // Redirect to home after login
        } else {
            alert("Invalid username or password.");
        }
    };

    const handleCreateAccountSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem(formData.login, JSON.stringify(formData));
        alert("Account Created Successfully!");
        setShowCreateAccount(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        alert("You have been logged out.");
        navigate("/login");
    };

    return (
        <div className="signin-container">
            {/* Show Sign In form when Create Account is NOT active */}
            {!showCreateAccount && (
                <div className="login-card">
                    <img src="https://i.imgur.com/fubQ4Lr.png" alt="Logo" className="logo" />
                    <h2>Login</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <input type="text" name="login" className="form-control" placeholder="Username" value={formData.login} onChange={handleChange} required />
                        <input type="password" name="password" className="form-control" placeholder="Password" value={formData.password} onChange={handleChange} required />
                        <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                    </form>
                    <button type="button" className="btn btn-secondary btn-block mt-2" onClick={() => setShowCreateAccount(true)}>Create Account</button>
                </div>
            )}

            {/* Show Create Account form when Sign In is hidden */}
            {showCreateAccount && (
                <div className="login-card">
                    <h2>Create Account</h2>
                    <form onSubmit={handleCreateAccountSubmit}>
                        <input type="text" name="name" className="form-control" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                        <input type="email" name="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        <input type="text" name="login" className="form-control" placeholder="Username" value={formData.login} onChange={handleChange} required />
                        <input type="password" name="password" className="form-control" placeholder="Password" value={formData.password} onChange={handleChange} required />
                        <button type="submit" className="btn btn-success btn-block">Create Account</button>
                    </form>
                    <button type="button" className="btn btn-danger btn-block mt-2" onClick={() => setShowCreateAccount(false)}>Back to Sign In</button>
                </div>
            )}
        </div>
    );
};

export default SignIn;
