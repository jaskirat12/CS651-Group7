import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";

// import sqlite3 from "sqlite3";




const SignIn = () => {
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const [formData, setFormData] = useState({ login: "", password: "", name: "", email: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        alert(`Logged in as: ${formData.login}`);
    };

    const handleCreateAccountSubmit = (e) => {
        e.preventDefault();
        setShowCreateAccount(false);
        alert("Account Created!");
    };

    return (
        <div className="signin-container">
            <div className="login-card">
                <img src="https://i.imgur.com/fubQ4Lr.png" alt="Logo" className="logo" />
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <input type="text" name="login" className="form-control" placeholder="Username" value={formData.login} onChange={handleChange} required />
                    <input type="password" name="password" className="form-control" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                </form>
                <button type="button" className="btn btn-secondary btn-block mt-2" onClick={() => setShowCreateAccount(!showCreateAccount)}>Create Account</button>
            </div>

            {showCreateAccount && (
                <div className="login-card">
                    <h2>Create Account</h2>
                    <form onSubmit={handleCreateAccountSubmit}>
                        <input type="text" name="name" className="form-control" placeholder="Full Name" onChange={handleChange} required />
                        <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} required />
                        <input type="text" name="login" className="form-control" placeholder="Username" onChange={handleChange} required />
                        <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} required />
                        <button type="submit" className="btn btn-success btn-block">Create Account</button>
                    </form>
                </div>
            )}
        </div>
    );
};


//     return (
//         <div className="container mt-5">
//             <div className="row">
//                 <div className="col-md-6">
//                     <div className="card">
//                         <div className="card-header bg-primary text-white">
//                             <h3 className="text-center">Sign In</h3>
//                         </div>
//                         <div className="card-body">
//                             <form onSubmit={handleLoginSubmit}>
//                                 <input type="text" name="login" className="form-control mb-2" placeholder="Username" value={formData.login} onChange={handleChange} required />
//                                 <input type="password" name="password" className="form-control mb-2" placeholder="Password" value={formData.password} onChange={handleChange} required />
//                                 <button type="submit" className="btn btn-primary w-100">Sign In</button>
//                                 <button type="button" className="btn btn-secondary w-100 mt-2" onClick={() => setShowCreateAccount(!showCreateAccount)}>Create Account</button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>

//                 {showCreateAccount && (
//                     <div className="col-md-6">
//                         <div className="card">
//                             <div className="card-header bg-success text-white">
//                                 <h3 className="text-center">Create Account</h3>
//                             </div>
//                             <div className="card-body">
//                                 <form onSubmit={handleCreateAccountSubmit}>
//                                     <input type="text" name="name" className="form-control mb-2" placeholder="Full Name" onChange={handleChange} required />
//                                     <input type="email" name="email" className="form-control mb-2" placeholder="Email" onChange={handleChange} required />
//                                     <input type="text" name="login" className="form-control mb-2" placeholder="Username" onChange={handleChange} required />
//                                     <input type="password" name="password" className="form-control mb-2" placeholder="Password" onChange={handleChange} required />
//                                     <button type="submit" className="btn btn-success w-100">Create Account</button>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

export default SignIn;
