import React, { Component } from 'react';

class NextProjectButton extends Component {
  state = {};
  render() {
    return (
      <div className="text-center mt-4">
        <button
          className={this.props.gitButtonClassName}
          onClick={this.props.onClick}
        >
          <i className="fas fa-angle-down mr-2"></i>
          Naslednji projekt
        </button>
      </div>
    );
  }
}

export default NextProjectButton;
