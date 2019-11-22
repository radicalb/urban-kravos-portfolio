import React, { Component } from 'react';

class AdminProjectListElement extends Component {
  /* state = {
    orderingId: this.props.project.orderingId
  };

  handleOrderingIdChange = event => {
    const { value, name } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleOrderingIdOnKeyUp = event => {
    if (event.keyCode === 13) {
      console.log('Enter pressed');

      const options = {
        method: 'POST',
        body: JSON.stringify({ orderingId: this.state.orderingId }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      fetch('/api/project/update/' + this.props.project._id, options)
        .then(res => {
          console.log('RESPONSE FROM SERVER:');
          if (res.status === 200) {
            alert('Projekt uspešno posodobljen. :D');
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          alert('Error updating project please try again');
        });
    } else if (event.keyCode === 27) {
      console.log('ESC pressed');
      this.setState({
        orderingId: this.props.project.orderingId
      });
    }
  }; */

  render() {
    let upButtonClassName = 'btn btn-sm btn-outline-primary';
    if (this.props.project.orderingId >= this.props.nrOfProjects) {
      upButtonClassName += 'disabled';
    }

    let downButtonClassName = 'btn btn-sm btn-outline-primary';
    if (this.props.project.orderingId <= 1) {
      downButtonClassName += 'disabled';
    }

    let editUrl = '/editproject/' + this.props.project._id;
    let deleteModal =
      'deleteModal1' +
      this.props.project.orderingId +
      Math.floor(Math.random() * 1000 + 1);
    let deleteModalLink = '#' + deleteModal;

    return (
      <tr>
        <td>
          <div class="btn-group-vertical">
            <button
              className={upButtonClassName}
              onClick={() => this.props.onMoveUp(this.props.project)}
            >
              <i class="fas fa-angle-up"></i>
            </button>
            <button
              className={downButtonClassName}
              onClick={() => this.props.onMoveDown(this.props.project)}
            >
              <i class="fas fa-angle-down"></i>
            </button>
          </div>
        </td>
        {/* <td className="w-5">
          <input
            type="number"
            className="form-control input-sm input-vsm"
            name="orderingId"
            value={this.state.orderingId}
            onChange={this.handleOrderingIdChange}
            onKeyUp={this.handleOrderingIdOnKeyUp}
          />
        </td> */}
        <td className="w-100">
          <div className="btn btn-secondary active w-100">
            {this.props.project.tittle}
            <br />
            <span class="badge badge-light">
              {this.props.project.orderingId}
            </span>
          </div>
        </td>
        <td>
          <div class="btn-group-vertical">
            <a role="button" href={editUrl} className="btn btn-primary">
              Edit
            </a>
            <button
              type="button"
              className="btn btn-warning"
              data-toggle="modal"
              data-target={deleteModalLink}
            >
              Delete
            </button>
          </div>
        </td>
        <div
          className="modal fade"
          id={deleteModal}
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Potrditev brisanja
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body text-center">
                Ali res želite izbrisati ta projekt?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Prekliči
                </button>
                <button
                  type="button"
                  data-dismiss="modal"
                  className="btn btn-primary"
                  onClick={() => this.props.onRemove(this.props.project._id)}
                >
                  Izbriši
                </button>
              </div>
            </div>
          </div>
        </div>
      </tr>
    );
  }
}

export default AdminProjectListElement;
