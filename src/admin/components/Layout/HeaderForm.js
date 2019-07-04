import React, { Component } from 'react'
import {CardHeader} from 'reactstrap';
import {FaTimes} from 'react-icons/fa';
import {Link} from 'react-router-dom';
const style={
  marginLeft: '65%',
  color: 'black'
}
export default class HeaderForm extends Component {
  render() {
    return (
        <CardHeader>{this.props.children}
          <Link to={this.props.url}>
          <FaTimes style={style} />
          </Link>
          
        </CardHeader>
    )
  }
}
