/* 
TODO

- Logout
*/

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import MediaQuery from 'react-responsive';

class NavBar extends Component {
  state = {};

  handleClick = id => {
    document.getElementById(id).scrollIntoView();
  };

  render() {
    return (
      <nav
        className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top navbar-shrink"
        id="mainNav"
      >
        <div className="container">
          <a className="navbar-brand js-scroll-trigger" href="/#page-top">
            Urban Kravos
          </a>
          <button
            className="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <MediaQuery query="(max-width: 991.98px)">
                <li className="nav-item mx-0 mx-lg-1">
                  <a
                    className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                    href="#aboutme"
                    data-toggle="collapse"
                    data-target="#navbarResponsive"
                    aria-controls="navbarResponsive"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => this.handleClick('aboutme')}
                  >
                    About
                  </a>
                </li>
              </MediaQuery>
              <MediaQuery query="(min-width: 992px)">
                <li className="nav-item mx-0 mx-lg-1">
                  <a
                    className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                    href="#aboutme"
                  >
                    About
                  </a>
                </li>
              </MediaQuery>
              <MediaQuery query="(max-width: 991.98px)">
                <li className="nav-item mx-0 mx-lg-1">
                  <a
                    className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                    href="#projects"
                    data-toggle="collapse"
                    data-target="#navbarResponsive"
                    aria-controls="navbarResponsive"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => this.handleClick('projects')}
                  >
                    My projects
                  </a>
                </li>
              </MediaQuery>
              <MediaQuery query="(min-width: 992px)">
                <li className="nav-item mx-0 mx-lg-1">
                  <a
                    className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                    href="#projects"
                  >
                    My projects
                  </a>
                </li>
              </MediaQuery>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
