import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate
import "./register.css";

const Register = ({ setShowRegister }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        login: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem(formData.login, JSON.stringify(formData));
        alert("Account created successfully!");
        navigate("/login", { state: { login: formData.login, password: formData.password } });
    };

    return (
        <div className="container register-container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg text-white">
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
                                <button type="submit" className="btn btn text-white w-100">
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



