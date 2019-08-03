import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Card,
  CardTitle,
  CardBody,
  FormGroup,
  Form
} from 'reactstrap';
import CollapsePermission from '../components/CollapsePermission';
import { MdCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
/*-------Regex----------*/
const nameRegex = /^[a-zA-Z0-9]+$/;
const fullNameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
/*-------Regex----------*/
export default class AddNewUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      fullname: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      passwordConfirm: '',
      rows: [],
      listChecked: [],
      activePage: 1,
      currentPage: 1,
      totalItems: '',
      formError: {
        name: 'Username is required',
        fullname: 'Fullname is required',
        email: 'Email is required',
        phone: 'Phone is required',
        password: 'Password is required',
        passwordConfirm: 'Password does not match'
      },
      modalError: false,
      modalSuccess: false,
      errorData: '',
      errorRoleMessage: "User's roles cannot be empty",
      showErrorMessage: false,
      urlUser: '',
      optionRole: [],
      selectedRoleOption: [{ id: 2, value: 'User', label: 'User' }]
    };
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleErrorMessage = this.handleErrorMessage.bind(this);
  }
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/login');
    }
  }
  async componentDidMount() {
    var { optionRole } = this.state;
    var url = 'https://api.enclavei3dev.tk/api/list-role';
    const data = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        all: 1
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    data.map(e => {
      var role = { id: e.id, value: e.name, label: e.name };
      optionRole.push(role);
      return optionRole;
    });
    this.setState({
      optionRole: optionRole
    });
  }

  backToPreviousPage = () => {
    this.props.history.push('/dashboard/user');
  };

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

  handleSubmit = () => {
    const {
      name,
      fullname,
      email,
      phone,
      address,
      password,
      passwordConfirm,
      selectedRoleOption
    } = this.state;
    var array = [];
    selectedRoleOption.map(e => {
      array.push(e.id);
      return array;
    });
    var url = 'https://api.enclavei3dev.tk/api/user';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        fullname: fullname,
        email: email,
        phone: phone,
        address: address,
        password: password,
        password_confirmation: passwordConfirm,
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
          alert('Add Failed');
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
          this.toggleModalSuccess();
          res.json().then(data => {
            this.setState({
              urlUser: '/dashboard/user/' + data.user.id
            });
          });
        }
      })
      .catch(error => console.error('Error:', error));
  };

  handleSelectRoleChange = selectedRoleOption => {
    this.setState({ selectedRoleOption });
  };

  handleErrorMessage = () => {
    var { listChecked, errorRoleMessage } = this.state;
    var array1 = [...new Set(listChecked)];
    var array2 = [];
    array1.map(element => {
      var count = listChecked.filter(e => e === element);
      var length = count.length;
      if (length % 2 !== 0) {
        array2.push(element);
      }
      return array2;
    });
    array2.length === 0
      ? (errorRoleMessage = "User's roles cannot be empty")
      : (errorRoleMessage = '');
    this.setState({
      showErrorMessage: true,
      errorRoleMessage: errorRoleMessage
    });
  };

  handleChange(event) {
    var { formError } = this.state;
    switch (event.target.name) {
      case 'name':
        if (event.target.value.length === 0) {
          formError.name = 'Username is required';
        } else {
          nameRegex.test(event.target.value)
            ? (formError.name = '')
            : (formError.name =
                'Username cannot contain the blank/special characters');
        }
        break;
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
      case 'password':
        if (event.target.value.length === 0) {
          formError.password = 'Password is required';
        } else {
          formError.password = '';
        }
        break;
      case 'passwordConfirm':
        if (event.target.value !== this.state.password) {
          formError.passwordConfirm = 'Password does not match';
        } else {
          formError.passwordConfirm = '';
        }
    }

    this.setState({
      [event.target.name]: event.target.value,
      formError: {
        name: formError.name,
        fullname: formError.fullname,
        email: formError.email,
        phone: formError.phone,
        password: formError.password,
        passwordConfirm: formError.passwordConfirm
      }
    });
  }

  render() {
    var i = 0;
    const {
      formError,
      name,
      fullname,
      email,
      phone,
      password,
      passwordConfirm,
      urlUser
    } = this.state;
    return (
      <div
        className="profile-card"
        style={{ marginBottom: '150px', width: '70%', marginTop: '6%' }}
      >
        {/*--------Modal-Success-----*/}
        <Modal
          isOpen={this.state.modalSuccess}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModalSuccess}>
            Notification
          </ModalHeader>
          <ModalBody>
            <Link to={urlUser}>
              <span style={{ color: '#45b649' }}>
                Successfully! Click to see the detail of the new role
              </span>
            </Link>
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
          <ModalHeader toggle={this.toggleModalError}>Notification</ModalHeader>
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

        <Card className="card-body">
          <CardTitle className="title">
            <MdCancel className="first" />
            Create A New User
            <Link to="/dashboard/user">
              <MdCancel />
            </Link>
          </CardTitle>
          <CardBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label className="title-input" for="Name">
                  Username
                </Label>
                <Input type="text" name="name" onChange={this.handleChange} />
                {formError.name !== '' && this.state.showErrorMessage && (
                  <span style={{ color: 'red' }}>{formError.name}</span>
                )}
              </FormGroup>
              <FormGroup>
                <Label className="title-input" for="Fullname">
                  Fullname
                </Label>
                <Input
                  type="text"
                  name="fullname"
                  onChange={this.handleChange}
                />
                {formError.fullname !== '' && this.state.showErrorMessage && (
                  <span style={{ color: 'red' }}>{formError.fullname}</span>
                )}
              </FormGroup>
              <FormGroup>
                <Label className="title-input" for="Email">
                  Email
                </Label>
                <Input type="email" name="email" onChange={this.handleChange} />
                {formError.email !== '' && this.state.showErrorMessage && (
                  <span style={{ color: 'red' }}>{formError.email}</span>
                )}
              </FormGroup>
              <FormGroup>
                <Label className="title-input" for="Phone">
                  Phone
                </Label>
                <Input type="text" name="phone" onChange={this.handleChange} />
                {formError.phone !== '' && this.state.showErrorMessage && (
                  <span style={{ color: 'red' }}>{formError.phone}</span>
                )}
              </FormGroup>
              <FormGroup>
                <Label className="title-input" for="Fullname">
                  Address
                </Label>
                <Input
                  type="text"
                  name="address"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label className="title-input" for="Password">
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                />
                {formError.password !== '' && this.state.showErrorMessage && (
                  <span style={{ color: 'red' }}>{formError.password}</span>
                )}
              </FormGroup>
              <FormGroup>
                <Label className="title-input" for="ConfirmPassword">
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  name="passwordConfirm"
                  onChange={this.handleChange}
                />
                {formError.passwordConfirm !== '' &&
                  this.state.showErrorMessage && (
                    <span style={{ color: 'red' }}>
                      {formError.passwordConfirm}
                    </span>
                  )}
              </FormGroup>
              <FormGroup>
                <Label className="title-input">Roles</Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  onChange={this.handleSelectRoleChange.bind(this)}
                  defaultValue={this.state.selectedRoleOption}
                  options={this.state.optionRole}
                />
                {!this.state.selectedRoleOption &&
                  this.state.showErrorMessage && (
                    <span style={{ color: 'red' }}>Roles are required</span>
                  )}
              </FormGroup>
              <FormGroup
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <div
                  style={{
                    display: 'flex',
                    width: '180px',
                    justifyContent: 'space-between'
                  }}
                >
                  {formError.name == '' &&
                  formError.fullname == '' &&
                  formError.email == '' &&
                  formError.phone == '' &&
                  formError.password == '' &&
                  formError.passwordConfirm == '' &&
                  this.state.selectedRoleOption ? (
                    <Button color="success" onClick={this.handleSubmit}>
                      Submit
                    </Button>
                  ) : (
                    <Button color="success" onClick={this.handleErrorMessage}>
                      Submit
                    </Button>
                  )}
                  <Button
                    onClick={() => this.backToPreviousPage()}
                    color="secondary"
                  >
                    Back
                  </Button>
                </div>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
