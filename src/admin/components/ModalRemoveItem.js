import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../pages/RolesPage.css';
import { MdDelete } from 'react-icons/md';
export default class ModalRemoveItem extends Component {
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
    return (
      <div style={{ width: 'auto' }}>
        {this.props.buttonLabel ? (
          <Button
            className="button-delete"
            onClick={this.toggle}
            color="danger"
          >
            {this.props.buttonLabel}
          </Button>
        ) : (
          <Button
            className="button-delete"
            onClick={this.toggle}
            color="danger"
          >
            <MdDelete />
          </Button>
        )}

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            Are you sure to delete {this.props.itemName}?
          </ModalHeader>
          <ModalFooter>
            <Button color="primary" onClick={this.wrapperFunction}>
              Yes
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
