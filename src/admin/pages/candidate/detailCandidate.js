import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ListCandidate extends Component {
    static propTypes = {
        prop: PropTypes
    }
    componentWillMount() {
        if (!localStorage.getItem('access_token')) {
          this.props.history.push('/dashboard/login');
        }
      }
      async componentDidMount() {
        const { id } = this.props.match.params;
        var url = 'https://api.enclavei3dev.tk/api/candidate/' + id;
        const data = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }
        }).then(res => res.json());
        console.log(data);
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
