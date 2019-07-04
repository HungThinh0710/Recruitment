import React, { Component } from 'react'
import {Button} from 'reactstrap'

import './ButtonReset.css';

export default class ButtonReset extends Component {
  reset =() => {
    document.getElementById(this.props.idForm).reset();
  }
  render() {
    return (
        <Button className="btn-reset" onClick={this.reset}>Reset</Button>
    )
  }
}
