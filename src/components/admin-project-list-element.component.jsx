import React, { Component } from 'react';

class AdminProjectListElement extends Component {
  state = {};
  editUrl = '/editproject/' + this.props.project._id;
  //deleteUrl = '/deleteproject/' + ;

  render() {
    return (
      <tr>
        <td className="w-75">
          <div className="btn btn-secondary active w-100">
            {this.props.project.tittle}
          </div>
        </td>
        <td className="w-10">
          <a role="button" href={this.editUrl} className="btn btn-primary">
            Edit
          </a>
        </td>
        <td className="w-15">
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => this.props.onRemove(this.props.project._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default AdminProjectListElement;
