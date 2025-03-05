import React from "react";
import "./home.css"; // Import CSS for styling
// import homeImage from "./assets/home-image.jpg"; // Make sure you have an image in assets folder

const Home = () => {
    return (
        <div className="container mt-5">
            <div className="row"> 
                {/* Left side text content */}<center>
                <div className="col-md-6">
                    <h1>SignInn</h1>
                    {/* <p>
                        Explore our platform and learn more about us. We offer amazing features and services for our users.
                    </p> */}
                </div>
</center>
                {/* Right side image */}
                {/* <div className="col-md-6">
                    <img src={homeImage} alt="Home" className="img-fluid rounded" />
                </div> */}
            </div>

            {/* Floating div for additional content */}
            {/* <div className="floating-box">
                <p>Special Offer: Sign up today and get exclusive benefits!</p>
            </div> */}
        </div>
    );
};

export default Home;
