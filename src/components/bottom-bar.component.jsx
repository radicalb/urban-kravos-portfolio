import React, { Component } from 'react';

class BottomBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <footer className="footer text-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 mb-5 mb-lg-0">
                <h4 className="lead mb-4">e-pošta:</h4>
                <p className="lead mb-0">urban.rbsoftware@gmail.com</p>
              </div>

              <div className="col-lg-4 mb-5 mb-lg-0">
                <h4 className="text-uppercase mb-4">Kontakt</h4>
                <a
                  className="btn btn-outline-light btn-social mx-1"
                  href="https://www.facebook.com/radicalb"
                >
                  <i className="fab fa-fw fa-facebook-f"></i>
                </a>
                <a
                  className="btn btn-outline-light btn-social mx-1"
                  href="https://github.com/radicalb"
                >
                  <i className="fab fa-fw fa-github"></i>
                </a>
                <a
                  className="btn btn-outline-light btn-social mx-1"
                  href="https://www.linkedin.com/in/urban-kravos-1755512a/"
                >
                  <i className="fab fa-fw fa-linkedin-in"></i>
                </a>
                <a
                  className="btn btn-outline-light btn-social mx-1"
                  href="tel:040166123"
                >
                  <i className="fas fa-fw fa-phone"></i>
                </a>
              </div>

              <div className="col-lg-4">
                <h4 className="lead mb-4">telefon:</h4>
                <p className="lead mb-0">040-166-123</p>
              </div>
            </div>
          </div>
        </footer>

        <section class="copyright py-4 text-center text-white">
          <div class="container">
            <small>Copyright &copy; Urban Kravos 2019</small>
          </div>
        </section>

        <div class="scroll-to-top d-lg-none position-fixed ">
          <a
            class="js-scroll-trigger d-block text-center text-white rounded"
            href="#page-top"
          >
            <i class="fa fa-chevron-up"></i>
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default BottomBar;
