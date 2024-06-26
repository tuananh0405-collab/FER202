import React from 'react';
import '../../assets/styles/Services.css'; 

function Services() {
  return (
    <section id="services" className="py-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col text-center">
            <h2 className="text-uppercase">Our services</h2>
            <p className="text-muted">Rep all anime categories!</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="service-box">
              <div className="mb-3">
                <i className="bi bi-laptop service-icon"></i>
              </div>
              <h4 className="service-title">Graphics Design</h4>
              <p className="service-description">Design something</p>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="service-box">
              <div className="mb-3">
                <i className="bi bi-layers service-icon"></i>
              </div>
              <h4 className="service-title">Anime Movie</h4>
              <p className="service-description">Design something</p>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="service-box">
              <div className="mb-3">
                <i className="bi bi-layout-text-window-reverse service-icon"></i>
              </div>
              <h4 className="service-title">Figures Design</h4>
              <p className="service-description">Design something</p>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="service-box">
              <div className="mb-3">
                <i className="bi bi-phone service-icon"></i>
              </div>
              <h4 className="service-title">Anime Gaming</h4>
              <p className="service-description">Design something</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
