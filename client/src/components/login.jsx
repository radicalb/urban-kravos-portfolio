// Login.jsx
import React, { Component } from 'react';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }
  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    fetch('/api/users/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status === 200) {
          let pathname = this.props.location.pathname;
          pathname = pathname.replace('/login', '');
          this.props.history.push(pathname);
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error logging in please try again');
      });
  };

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
              <form onSubmit={this.onSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
