import React, { Component } from 'react';

class Aboutme extends Component {
  state = {};
  render() {
    return (
      <section className="page-section portfolio" id="aboutme">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
            About
          </h2>

          <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>

          <div className="row">
            <div className="col-lg-10 mx-auto">
              <p className="lead">
                Hello, I'm Urban Kravos, Bachelor of Computer and Informational
                Science. In my spare time I like to develop desktop and web
                apps. I am well versed in C#, Java, JavaScript, HTML and CSS. I
                also have limited knowledge of Phyton and VB. I am familiar with
                both relational and nonrelational databases. In old days I used
                to deal a lot with Delphi too.
              </p>
              <p className="lead">
                Recently, I gained some knowledge from React framework and
                Bootstrap. I was dealing a lot with automatic creation of
                PowerPoint reports from SharePoint lists using Excel (VBA)
                lately.
              </p>

              <p className="lead">
                You can see some of my projects below. I wish you a pleasant
                experience. Feel free to contact me if you have any questions.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Aboutme;
