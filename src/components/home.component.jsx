import React, { Component } from 'react';

import FirstImpression from './first-impression.component';
import Project from './project.component';
import Aboutme from './aboutme.component';

class Home extends Component {
  state = {
    projectsDisplayed: 1,
    projects: []
  };

  componentDidMount() {
    fetch('/api/project')
      .then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            this.setState({
              projects: data
            });
          });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleShowMoreProjects = () => {
    console.log('handling show more projects');
    let projectsDisplayed = this.state.projectsDisplayed;
    projectsDisplayed++;
    this.setState({ projectsDisplayed });
  };

  render() {
    return (
      <React.Fragment>
        <FirstImpression />
        <Aboutme />

        {this.state.projects
          .filter(
            project =>
              this.state.projects.indexOf(project) >=
              this.state.projects.length - this.state.projectsDisplayed
          )
          .reverse()
          .map(project => (
            <Project
              project={project}
              projectNr={this.state.projects.indexOf(project) + 1}
              nrOfProjects={this.state.projects.length}
              projectsDisplayed={this.state.projectsDisplayed}
              onShowMoreProjects={this.handleShowMoreProjects}
            />
          ))}
      </React.Fragment>
    );
  }
}

export default Home;
