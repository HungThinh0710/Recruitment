import React, { Component } from 'react'
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
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


  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem', paddingLeft:'42%',paddingRight:'42%' }}>Permissions</Button>
        <Collapse isOpen={this.state.collapse} >
          <Card>
            <CardBody>
            <MDBDataTable
            striped
            bordered
            hover
            data={this.props.data}
          />
            </CardBody>
          </Card>
        </Collapse>
      </div>
    )
  }
}
