import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Link} from 'react-router-dom';
export default class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }
  wrapperFunction= () => {
    if (this.props.function) {
      this.props.function();
      this.toggle();
    }else this.toggle();
    
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    
    return (
      <div>
        <Button color="success" onClick={this.toggle}>{this.props.children}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Change Profile</ModalHeader>
          <ModalBody>
            Do You Want To Change Your {this.props.title} ?
          </ModalBody>
          <ModalFooter>
            <Link to={this.props.url}>
            <Button color="primary" onClick={this.wrapperFunction}>Yes</Button>{' '}
            </Link>
            
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
