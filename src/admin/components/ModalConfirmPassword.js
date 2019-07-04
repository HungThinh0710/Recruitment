import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, 
  ModalFooter,Card,CardBody,FormGroup,Form,Label,Input} from 'reactstrap';
import {Link} from 'react-router-dom';
import './ModalConfirmPassword.css';
export default class ModalConfirmPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    
    return (
      <div className={this.props.className}>
        <Button color="primary" onClick={this.toggle}>{this.props.children}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Enter Password To See Full Of Your {this.props.title}</ModalHeader>
          <ModalBody>
            
            <Card>
              <CardBody>
                <Form>
                  <FormGroup className="password-input">
                  <Label for="exampleName" className="username-title">Username:</Label>
                  <Label for="exampleName">admin</Label>
                  </FormGroup>
                  <FormGroup className="password-input">
                  <Label for="examplePassword" className="password-input-title">Password:</Label>
                  <Input
                    type="password"
                    name="currentPassword"
                  />
              </FormGroup>
                </Form>

              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Link to={this.props.url}>
            <Button color="primary" onClick={this.toggle}>Submit</Button>{' '}
            </Link>
            
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>

    );
  }
}
