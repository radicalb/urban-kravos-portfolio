import React, { Component } from 'react';

class ProjectsModal extends Component {
  state = {};
  render() {
    return (
      <div
        className="portfolio-modal modal fade"
        id={this.props.theId}
        tabindex="-1"
        role="dialog"
        aria-labelledby="portfolioModal1Label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-11">
                    <button
                      type="button"
                      className="btn btn-outline-light rounded m-0 p-0"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <img
                        className="img-fluid rounded mb-0"
                        src={this.props.imgUrl}
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectsModal;
