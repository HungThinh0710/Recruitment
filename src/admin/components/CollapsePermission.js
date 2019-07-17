import React, { Component } from 'react'
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import $ from 'jquery';
import Pagination from '../components/Pagination.js';
export default class CollapsePermission extends Component {
  constructor(props) {
    super(props);
      
      this.state = { 
      collapse: false
    };
    this.toggle = this.toggle.bind(this);
  }
   toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }
  componentDidMount(){
    $(".dataTables_paginate").remove();
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle} style={this.props.style}>{this.props.name}</Button>
        <Collapse isOpen={this.state.collapse} >
          <Card>
            <CardBody>
            <MDBDataTable
            striped
            bordered
            hover
            data={this.props.data}
          />
            {/* <Pagination 
            
            
            /> */}

            </CardBody>
          </Card>
        </Collapse>
      </div>
    )
  }
}
