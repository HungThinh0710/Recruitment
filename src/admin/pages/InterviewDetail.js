import React, { Component } from 'react';

export default class InterviewDetail extends Component {
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/admin');
    }
  }
  render() {
    return (
      <div>
        <h5>InterviewDetail</h5>
      </div>
    );
  }
}
