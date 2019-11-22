import React, { Component } from 'react';
import NextProjectButton from './next-project-button.component';
import ProjectsModal from './projects-modal.component';

class Project extends Component {
  state = {};
  render() {
    let sectionClassname;
    let h2className;
    let dividerClassName;
    let gitButtonClassName = 'btn btn-xl btn-outline-';
    let thumbImageClassName = 'img-fit-cover  rounded border border-';
    if ((this.props.nrOfProjects - this.props.projectNr) % 2 !== 0) {
      sectionClassname = 'page-section portfolio';
      h2className =
        'page-section-heading text-center text-uppercase text-secondary mb-0';
      dividerClassName = 'divider-custom';
      gitButtonClassName += 'primary';
      thumbImageClassName += 'primary';
    } else {
      sectionClassname = 'page-section portfolio bg-primary text-white';
      h2className =
        'page-section-heading text-center text-uppercase text-white';
      dividerClassName = 'divider-custom divider-light';
      gitButtonClassName += 'light';
      thumbImageClassName += 'white';
    }

    let nextProjectButton = '';
    if (
      this.props.nrOfProjects + 1 - this.props.projectsDisplayed ===
        this.props.projectNr &&
      this.props.projectNr > 1
    ) {
      nextProjectButton = (
        <NextProjectButton
          gitButtonClassName={gitButtonClassName}
          onClick={this.props.onShowMoreProjects}
        />
      );
    }

    return (
      <section className={sectionClassname} id="projects">
        <div className="container">
          <h2 className={h2className}>
            #{this.props.projectNr}: {this.props.project.tittle}
          </h2>

          <div className={dividerClassName}>
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <p className="lead">{this.props.project.postBody}</p>
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col-lg-3 ml-auto">
              <div
                className="portfolio-item mx-auto"
                data-toggle="modal"
                data-target={'#projectModal1' + this.props.projectNr}
              >
                <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div className="portfolio-item-caption-content text-center text-white">
                    <i className="fas fa-plus fa-3x"></i>
                  </div>
                </div>
                <img
                  className={thumbImageClassName}
                  src={this.props.project.img1thumbnail}
                  alt=""
                />
              </div>
            </div>

            <div className="col-lg-3 mx-2">
              <div
                className="portfolio-item mx-auto"
                data-toggle="modal"
                data-target={'#projectModal2' + this.props.projectNr}
              >
                <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div className="portfolio-item-caption-content text-center text-white">
                    <i className="fas fa-plus fa-3x"></i>
                  </div>
                </div>
                <img
                  className={thumbImageClassName}
                  src={this.props.project.img2thumbnail}
                  alt=""
                />
              </div>
            </div>

            <div className="col-lg-3 mr-auto">
              <div
                className="portfolio-item mx-auto"
                data-toggle="modal"
                data-target={'#projectModal3' + this.props.projectNr}
              >
                <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div className="portfolio-item-caption-content text-center text-white">
                    <i className="fas fa-plus fa-3x"></i>
                  </div>
                </div>
                <img
                  className={thumbImageClassName}
                  src={this.props.project.img3thumbnail}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <a className={gitButtonClassName} href={this.props.project.gitUrl}>
              <i className="fab fa-github mr-2"></i>
              GitHub
            </a>
          </div>

          {nextProjectButton}
        </div>

        <ProjectsModal
          theId={'projectModal1' + this.props.projectNr}
          imgUrl={this.props.project.img1}
        />
        <ProjectsModal
          theId={'projectModal2' + this.props.projectNr}
          imgUrl={this.props.project.img2}
        />
        <ProjectsModal
          theId={'projectModal3' + this.props.projectNr}
          imgUrl={this.props.project.img3}
        />
      </section>
    );
  }
}

export default Project;
