import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../pages/RolesPage.css';
import { MdDelete } from 'react-icons/md';
export default class ModalRemoveUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }
  wrapperFunction = () => {
    this.props.function();
    this.toggle();
  };
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    var i = 0;
    console.log(this.props.arrayName);
    return (
      <div>
        <Button className="button-delete" onClick={this.toggle} color="danger">
          {this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            Are you sure to delete this users ?
          </ModalHeader>

          {this.props.arrayName.map(e => {
            i++;
            return (
              <ModalBody key={i}>
                User {i}: {e.fullname}{' '}
              </ModalBody>
            );
          })}

          <ModalFooter>
            <Button color="primary" onClick={this.wrapperFunction}>
              Yes, I'm sure
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
