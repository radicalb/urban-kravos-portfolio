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
              <a role="button" href="/addproject" className="btn btn-primary">
                Dodaj projekt
              </a>

              <table className="w-100 h-100 text-right">
                {this.state.projects.map(project => (
                  <AdminProjectListElement
                    project={project}
                    onRemove={this.handleDelete}
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
