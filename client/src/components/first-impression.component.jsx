import React, { Component, ReactDOM } from 'react';

class FirstImpression extends Component {
  state = {};

  render() {
    return (
      <header
        className="masthead bg-primary text-white text-center"
        id="page-top"
      >
        <div className="container d-flex align-items-center flex-column">
          <img
            className="masthead-avatar mb-5 rounded-circle border border-white"
            src="img/circle-cropped.png"
            alt=""
          ></img>

          <h1 className="masthead-heading text-uppercase mb-0">Urban Kravos</h1>

          <div className="divider-custom divider-light">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>

          <p className="masthead-subheading font-weight-light mb-0">
            Web Development - C# Programming
          </p>
        </div>
      </header>
    );
  }
}

export default FirstImpression;
