// import React, { useState } from "react";
// import { useHistory } from "react-router-dom"; // For navigation back to SignIn
import "./register.css";

import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // For navigation back to SignIn


const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        login: "",
        password: ""
    });
    const history = useHistory(); // To redirect after submission

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate storing in a database (e.g., console log or localStorage)
        console.log("Storing in database:", formData);
        localStorage.setItem("user", JSON.stringify(formData)); // Simulated DB storage

        // Redirect to SignIn with the new login/password pre-filled
        history.push({
            pathname: "/login",
            state: { login: formData.login, password: formData.password }
        });
    };

    return (
        <div className="container register-container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-success text-white">
                            <h3 className="text-center">Create Account</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control mb-2"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control mb-2"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="login"
                                    className="form-control mb-2"
                                    placeholder="Username"
                                    value={formData.login}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control mb-2"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button type="submit" className="btn btn-success w-100">
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

