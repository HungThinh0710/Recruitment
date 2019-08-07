import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Form,
  Label,
  Input
} from 'reactstrap';
import { MdEdit } from 'react-icons/md';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

const fullNameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      fullname: '',
      email: '',
      phone: '',
      address: '',
      formError: {
        fullname: '',
        email: '',
        phone: ''
      },
      errorData: '',
      modalError: false,
      modal: false,
      modalSuccess: false,
      showErrorMessage: false,
      optionRoles: [],
      selectedRoleOption: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
    this.handleErrorMessage = this.handleErrorMessage.bind(this);
  }

  async componentDidMount() {
    var { optionRoles, selectedRoleOption } = this.state;
    const { id, dataRoles } = this.props;
    var url1 = 'https://api.enclavei3.tk/api/user/' + id;
    const data1 = await fetch(url1, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    // data1.roles.map(e => {
    //   var currentRole = { id: e.id, value: e.name, label: e.name };
    //   selectedRoleOption.push(currentRole);
    //   return selectedRoleOption;
    // });
    selectedRoleOption = [{ id: 100, value: 'hieu', label: 'hieu' }];
    dataRoles.map(e => {
      var permission = { id: e.id, value: e.name, label: e.name };
      optionRoles.push(permission);
      return optionRoles;
    });
    this.setState({
      fullname: data1.fullname,
      email: data1.email,
      address: data1.address,
      phone: data1.phone,
      optionRoles: optionRoles,
      selectedRoleOption: selectedRoleOption
    });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggleModalSuccess() {
    this.setState(prevState => ({
      modalSuccess: !prevState.modalSuccess
    }));
  }

  toggleModalError() {
    this.setState(prevState => ({
      modalError: !prevState.modalError
    }));
  }

  handleChange(event) {
    var { formError } = this.state;
    switch (event.target.name) {
      case 'fullname':
        if (event.target.value.length === 0) {
          formError.fullname = 'Full name is required';
        } else {
          fullNameRegex.test(event.target.value)
            ? (formError.fullname = '')
            : (formError.fullname =
                'Full name cannot contain the number/special characters');
        }
        break;
      case 'email':
        if (event.target.value.length === 0) {
          formError.email = 'Email is required';
        } else {
          emailRegex.test(event.target.value)
            ? (formError.email = '')
            : (formError.email = 'Invalid Email');
        }
        break;
      case 'phone':
        if (event.target.value.length === 0) {
          formError.phone = 'Phone number is required';
        } else if (event.target.value.length < 10) {
          if (isNaN(Number(event.target.value))) {
            formError.phone = 'Phone number cannot contain the letter';
          } else {
            formError.phone = 'Phone number must have at least 10 characters';
          }
        } else {
          if (isNaN(Number(event.target.value))) {
            formError.phone = 'Phone number cannot contain the letter';
          } else {
            formError.phone = '';
          }
        }
        break;
    }

    this.setState({
      [event.target.name]: event.target.value,
      formError: {
        fullname: formError.fullname,
        email: formError.email,
        phone: formError.phone
      }
    });
  }
  handleErrorMessage = () => {
    this.setState({
      showErrorMessage: true
    });
  };

  handleSelectRoleChange = selectedRoleOption => {
    if (selectedRoleOption == null) {
      selectedRoleOption = [];
    }
    this.setState({ selectedRoleOption });
  };

  handleSubmit() {
    const { fullname, email, phone, address, selectedRoleOption } = this.state;
    const { id } = this.props;
    var array = [];
    selectedRoleOption.map(e => {
      array.push(e.id);
      return array;
    });
    var url = 'https://api.enclavei3.tk/api/user/' + id;
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        fullname: fullname,
        email: email,
        phone: phone,
        address: address,
        roles: array
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    })
      .then(res => {
        if (res.status === 401) {
          alert('Edit Failed');
        }
        if (res.status === 422) {
          this.toggleModalError();
          res.json().then(data => {
            const dataArray = Object.keys(data.errors).map(i => data.errors[i]);
            this.setState({
              errorData: dataArray
            });
          });
        }
        if (res.status === 200) {
          var update = true;
          this.toggleModalSuccess();
          this.props.getUpdate(update);
        }
      })
      .catch(error => console.error('Error:', error));
  }

  render() {
    var i = 0;
    const { formError } = this.state;
    return (
      <div>
        {/*--------Modal-Success-----*/}
        <Modal
          isOpen={this.state.modalSuccess}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader
            toggle={this.toggleModalSuccess}
            className="card-header-custom"
          >
            <span className="dashboard-modal-header">Notification</span>
          </ModalHeader>
          <ModalBody>
            <span style={{ color: '#45b649' }}>Update Successfully</span>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalSuccess}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/*--------Modal-Success-----*/}
        {/*--------Modal-Error-----*/}
        <Modal
          isOpen={this.state.modalError}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader
            toggle={this.toggleModalError}
            className="card-header-custom"
          >
            <span className="dashboard-modal-header">Notification</span>
          </ModalHeader>
          <ModalBody>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {this.state.errorData !== undefined &&
                this.state.errorData.length !== 0 &&
                this.state.errorData.map(e => {
                  i++;
                  return (
                    <span key={i} style={{ color: 'red' }}>
                      {e[0]}
                    </span>
                  );
                })}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalError}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/*--------Modal-Error-----*/}
        {this.props.icon ? (
          <Button
            className="button-first"
            color={this.props.color}
            onClick={this.toggle}
            style={{ color: 'white' }}
          >
            <MdEdit />
          </Button>
        ) : (
          <Button
            className="button-first"
            color={this.props.color}
            onClick={this.toggle}
          >
            Edit
          </Button>
        )}
        <Modal
          size="lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            <span className="dashboard-modal-header">Update User</span>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="fullname" className="title-input">
                  Fullname:
                </Label>
                <Input
                  type="text"
                  name="fullname"
                  onChange={this.handleChange}
                  value={this.state.fullname}
                />
                {formError.fullname !== '' && this.state.showErrorMessage && (
                  <span style={{ color: 'red' }}>{formError.fullname}</span>
                )}
              </FormGroup>

              <FormGroup>
                <Label for="Email" className="title-input">
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                {formError.email !== '' && this.state.showErrorMessage && (
                  <span style={{ color: 'red' }}>{formError.email}</span>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="Phone" className="title-input">
                  Phone
                </Label>
                <Input
                  type="text"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
                {formError.phone !== '' && this.state.showErrorMessage && (
                  <span style={{ color: 'red' }}>{formError.phone}</span>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="Fullname" className="title-input">
                  Address
                </Label>
                <Input
                  type="text"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label className="title-input">Roles</Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  onChange={this.handleSelectRoleChange.bind(this)}
                  defaultValue={this.state.selectedRoleOption}
                  options={this.state.optionRoles}
                />
                {this.state.selectedRoleOption.length === 0 &&
                  this.state.showErrorMessage && (
                    <span style={{ color: 'red' }}>
                      Permissions are required
                    </span>
                  )}
              </FormGroup>
              <br />
              <FormGroup
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <div
                  style={{
                    display: 'flex',
                    width: '160px',
                    justifyContent: 'space-between'
                  }}
                >
                  {formError.fullname == '' &&
                  formError.email == '' &&
                  formError.phone == '' &&
                  this.state.selectedRoleOption.length !== 0 ? (
                    <Button color="success" onClick={this.handleSubmit}>
                      Submit
                    </Button>
                  ) : (
                    <Button color="success" onClick={this.handleErrorMessage}>
                      Submit
                    </Button>
                  )}
                  <Button onClick={this.toggle} color="secondary">
                    Back
                  </Button>
                </div>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
