import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../pages/RolesPage.css'
import {
  MdDelete
} from 'react-icons/md';
export default class ModalRemoveUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }
  wrapperFunction= () => {
    this.props.function();
    this.toggle();
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
       <Button className='button-delete' onClick={this.toggle} color='danger'><MdDelete /></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Are you sure to delete this user ?</ModalHeader>
          <ModalBody>
           Fullname : {this.props.item.fullname}
          </ModalBody>
          <ModalBody>
           Email : {this.props.item.email}
          </ModalBody>
          <ModalBody>
           Phone : {this.props.item.phone}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.wrapperFunction}>Yes, I'm sure</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
