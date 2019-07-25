import React, { Component } from 'react';

export default class InterviewsPage extends Component {
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/admin');
    }
  }
  render() {
    return (
      <div>
        <h5>InterviewsPage</h5>
      </div>
    );
  }
}
