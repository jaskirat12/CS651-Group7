import React from "react";

const About = () => {
    return (
        <div className="container mt-5">
            <h1>About Us</h1>
            <iframe
                src="/about.html"
                width="100%"
                height="800px"
                style={{ border: "none" }}
                title="About Us"
            ></iframe>
        </div>
    );
};

export default About;
