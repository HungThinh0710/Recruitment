import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
export default class ModalAddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: '',
      description: '',
      address: '',
      position: '',
      salary: '',
      status: '',
      experience: '',
      amount: 0,
      datePublishedOn: '',
      timePublishedOn: '',
      publishedOn: '',
      dateDeadline: '',
      timeDeadline: '',
      deadline: ''
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  wrapperFunction = () => {
    this.handleSubmit();
    this.toggle();
  };

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleSubmit = () => {
    const {
      name,
      description,
      address,
      position,
      salary,
      status,
      experience,
      amount,
      publishedOn,
      deadline
    } = this.state;
    const i = publishedOn.indexOf('T');
    const j = deadline.indexOf('T');
    const newDateString = (s, i) => {
      return s.substr(0, i) + ' ' + s.substr(i + 1);
    };
    var url = 'https://api.enclavei3.tk/api/job';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        description: description,
        address: address,
        position: position,
        salary: salary,
        status: status,
        experience: experience,
        amount: amount,
        publishedOn: newDateString(publishedOn, i),
        deadline: newDateString(deadline, j)
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    })
      .then(res => {
        if (res.status === 401) {
          alert('Add Failed');
        }
        if (res.status === 422) {
          alert('Add Failed');
        }
        if (res.status === 200) {
          alert('Add Successfully');
          res.json().then(data => {
            var url2 =
              'https://api.enclavei3.tk/api/list-job?page=' +
              this.props.page;
            fetch(url2, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
              }
            }).then(res => {
              res.json().then(data => {
                this.props.function(data);
              });
            });
          });
        }
      })
      .catch(error => console.error('Error:', error));
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div>
        <Button color={this.props.color} onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>
        <Modal
          size="lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Create A New Job</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="Name">Name</Label>
                <Input type="text" name="name" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="Description">Description</Label>
                <Input
                  type="text"
                  name="description"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Address">Address</Label>
                <Input
                  type="text"
                  name="address"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Position">Position</Label>
                <Input
                  type="text"
                  name="position"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Salary">Salary</Label>
                <Input type="text" name="salary" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="Status">Status</Label>
                <Input type="text" name="status" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="Experience">Experience</Label>
                <Input
                  type="text"
                  name="experience"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Amount">Amount</Label>
                <Input
                  type="number"
                  name="amount"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Published">Published On</Label>
                <Input
                  type="datetime-local"
                  name="publishedOn"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Deadline">Deadline</Label>
                <Input
                  type="datetime-local"
                  name="deadline"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.wrapperFunction}>
              Submit
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
