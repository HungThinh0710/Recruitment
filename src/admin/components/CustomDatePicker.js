import React, { Component } from 'react';

export default class DatePicker extends Component {
  render() {
    return (
      <button className="example-custom-input" onClick={this.props.onClick}>
        ABCD
      </button>
    );
  }
}
