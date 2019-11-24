import React, { Component } from 'react';
import AdminProjectListElement from './admin-project-list-element.component';

class Admin extends Component {
  state = {
    projects: []
  };

  componentDidMount() {
    fetch('/api/project')
      .then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            this.setState({
              projects: data.reverse()
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

  handleDelete = id => {
    const options = {
      method: 'DELETE',
      body: JSON.stringify({ _id: id }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch('/api/project/delete', options)
      .then(res => {
        if (res.status === 200) {
          let projects = this.state.projects.filter(
            project => project._id !== id
          );

          this.setState({ projects });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error deleting project please try again');
      });
  };

  handleMoveUp = project => {
    let index = this.state.projects.indexOf(project);
    //if (project.orderingId > 1 && index > 0) {
    if (index > 0) {
      let newProjects = [...this.state.projects];
      newProjects[index].orderingId++;
      newProjects[index - 1].orderingId--;
      newProjects.sort((a, b) => {
        return b.orderingId - a.orderingId;
      });
      //this.setState({ projects: newProjects });

      const options = {
        method: 'POST',
        body: JSON.stringify({
          projects: [
            {
              _id: newProjects[index]._id,
              orderingId: newProjects[index].orderingId
            },
            {
              _id: newProjects[index - 1]._id,
              orderingId: newProjects[index - 1].orderingId
            }
          ]
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      fetch('/api/project/updatemany', options)
        .then(res => {
          if (res.status === 200) {
            //console.log(res.statusText);
            this.setState({ projects: newProjects });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          alert(err);
        });
    }
  };

  handleMoveDown = project => {
    //console.log(project);
    let index = this.state.projects.indexOf(project);
    if (project.orderingId > 1) {
      let newProjects = [...this.state.projects];
      newProjects[index].orderingId--;
      newProjects[index + 1].orderingId++;
      newProjects.sort((a, b) => {
        return b.orderingId - a.orderingId;
      });

      const options = {
        method: 'POST',
        body: JSON.stringify({
          projects: [
            {
              _id: newProjects[index]._id,
              orderingId: newProjects[index].orderingId
            },
            {
              _id: newProjects[index + 1]._id,
              orderingId: newProjects[index + 1].orderingId
            }
          ]
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      fetch('/api/project/updatemany', options)
        .then(res => {
          if (res.status === 200) {
            //console.log(res.statusText);
            this.setState({ projects: newProjects });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          alert(err);
        });
    }
  };

  render() {
    return (
      <section className="page-section portfolio" id="admin">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
            Admin
          </h2>

          <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8 col-md-offset-2">
              <a className="btn btn-primary" role="button" href="/addproject">
                Add project
              </a>

              <table className="w-100 h-100 text-right">
                {this.state.projects.map(project => (
                  <AdminProjectListElement
                    project={project}
                    onRemove={this.handleDelete}
                    onMoveUp={this.handleMoveUp}
                    onMoveDown={this.handleMoveDown}
                    nrOfProjects={this.state.projects.length}
                  />
                ))}
              </table>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Admin;
