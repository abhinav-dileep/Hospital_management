import React from "react";

const Hero = () => {
  return (
    <div className="hero d-flex min-vh-100 ">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div
            className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center text-center px-5 hero-left"
            style={{ paddingTop: '12rem', paddingBottom: '3rem' }}
          >
            <h1 className="fw-bold hero-title">
              MediCare+,
              Redefining Smart
              Healthcare with Heart+
            </h1>
            <p className="hero-subtitle mb-4 mt-3">
              MediCare+ combines advanced digital healthcare solutions with compassionate medical expertise to deliver
               a seamless patient experience. From smart appointment scheduling to secure medical records management, 
               our platform ensures efficiency, accuracy, and personalized care at every step of your healthcare journey.
            </p>

          </div>
          <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center hero-right ">

            <div className="hero-image-wrapper" style={{ maxWidth: '500px', maxHeight: '150px' }}>
              <img
                src="/hero.png"
                alt="Healthcare Illustration"
                className="hero-img img-fluid"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;