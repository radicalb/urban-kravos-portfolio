import React, { Component } from 'react';

class Error404 extends Component {
  state = {};
  render() {
    return (
      <section className="page-section portfolio" id="newProject">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
            404
          </h2>

          <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8 col-md-offset-2 text-center">
              <p>Oprostite, stran, ki ste jo iskali ne obstaja.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Error404;
