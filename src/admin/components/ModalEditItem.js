import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, 
  ModalFooter,Card,CardBody,FormGroup,Form,Label,Input } from 'reactstrap';
  import './ModalConfirmPassword.css';
  import '../pages/RolesPage.css'
export default class ModalEditItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }
  wrapperFunction= () => {
    
    if(this.props.function){
      this.props.function();
      this.toggle();
    }
    else this.toggle();
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  render() {
    return (
      <div>
        {(this.props.buttonLabel==='Add New Role') ? 
          (<Button color={this.props.color} onClick={this.toggle}>{this.props.buttonLabel}</Button>) 
          :(
            <Button className='button-first' color={this.props.color} onClick={this.toggle}>{this.props.buttonLabel}</Button>
          )
        }
        
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit Role</ModalHeader>
          <ModalBody>
          <Card>
              <CardBody>
                <Form>
                  <FormGroup className="password-input">
                  <Label for="exampleName" className="username-title">Role:</Label>
                  {this.props.item ?(
                  <Input
                    className="input-first"
                    type="text"
                    name="role"
                    placeholder={this.props.item.role}
                  />) :(
                    <Input
                    className="input-first"
                    type="text"
                    name="role"
                    placeholder='Enter New Role'
                  />
                  )}
                  </FormGroup>
                  <FormGroup className="password-input">
                  <Label for="examplePassword" className="password-input-title">Permission:</Label>
                  {this.props.item ?(
                  <Input
                   
                    type="text"
                    name="permission"
                    placeholder={this.props.item.permission}
                  />) :(
                    <Input
                    
                    type="text"
                    name="role"
                    placeholder='Enter New Role'
                  />
                  )}
              </FormGroup>
                </Form>

              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.wrapperFunction}>{this.props.nameButtonAccept}</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
