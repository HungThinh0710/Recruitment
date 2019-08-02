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
import CollapsePermission from '../components/CollapsePermission';

/*-------Regex----------*/
const nameRegex = /^[a-zA-Z0-9]+$/;
const fullNameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
/*-------Regex----------*/
export default class ModalAddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
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
      showErrorMessage: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleErrorMessage = this.handleErrorMessage.bind(this);
  }

  async componentDidMount() {
    var { listChecked } = this.state;
    var url = 'https://api.enclavei3dev.tk/api/list-role?page=1';
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    data.data.map(e => {
      return (e.action = (
        <input
          type="checkbox"
          onChange={() => this.handleCheck(e, listChecked)}
        />
      ));
    });
    this.setState({
      rows: data.data,
      listChecked: listChecked,
      totalItems: data.total,
      currentPage: data.current_page
    });
  }

  handleCheck(e, listChecked) {
    listChecked.push(e.id);
    var { errorRoleMessage } = this.state;
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
      listChecked: listChecked,
      errorRoleMessage: errorRoleMessage
    });
  }

  wrapperFunction = () => {
    this.handleSubmit();
    this.toggle();
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
  toggle() {
    if (this.state.modal) {
      this.setState(prevState => ({
        modal: !prevState.modal,
        name: '',
        fullname: '',
        phone: '',
        email: '',
        password: '',
        passwordConfirm: '',
        formError: {
          name: 'Username is required',
          fullname: 'Fullname is required',
          email: 'Email is required',
          phone: 'Phone is required',
          address: '',
          password: 'Password is required',
          passwordConfirm: 'Password does not match'
        },
        errorData: '',
        showErrorMessage: false,
        errorRoleMessage: "User's permissions cannot be empty"
      }));
    } else {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }
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
      listChecked
    } = this.state;
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
        roles: array2
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
          this.toggle();
          this.setState(prevState => ({
            modal: !prevState.modal,
            modalError: false,
            modalSuccess: true
          }));
          res.json().then(data => {
            var url2 =
              'https://api.enclavei3dev.tk/api/list-user?page=' +
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

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber, currentPage: pageNumber });
    var { listChecked } = this.state;
    var url = 'https://api.enclavei3dev.tk/api/list-role?page=' + pageNumber;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      res.json().then(data => {
        data.data.map(e => {
          return (e.action = (
            <input
              type="checkbox"
              onChange={() => this.handleCheck(e, listChecked)}
            />
          ));
        });
        this.setState({
          rows: data.data,
          listChecked: listChecked,
          totalItems: data.total,
          currentPage: data.current_page
        });
      });
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
      passwordConfirm
    } = this.state;
    return (
      <div>
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
            <span style={{ color: '#45b649' }}>Created successfully</span>
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

        <Button color={this.props.color} onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>
        <Modal
          size="lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Create A New User</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="Name">Username</Label>
                <Input type="text" name="name" onChange={this.handleChange} />
                {formError.name !== '' && this.state.showErrorMessage && (
                  <span style={{ color: 'red' }}>{formError.name}</span>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="Fullname">Fullname</Label>
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
                <Label for="Email">Email</Label>
                <Input type="email" name="email" onChange={this.handleChange} />
                {formError.email !== '' && this.state.showErrorMessage && (
                  <span style={{ color: 'red' }}>{formError.email}</span>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="Phone">Phone</Label>
                <Input type="text" name="phone" onChange={this.handleChange} />
                {formError.phone !== '' && this.state.showErrorMessage && (
                  <span style={{ color: 'red' }}>{formError.phone}</span>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="Fullname">Address</Label>
                <Input
                  type="text"
                  name="address"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Password">Password</Label>
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
                <Label for="ConfirmPassword">Confirm Password</Label>
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
                <CollapsePermission
                  style={{ width: '100%' }}
                  name="Roles"
                  data={this.state.rows}
                  activePage={this.state.activePage}
                  itemsCountPerPage={10}
                  totalItemsCount={this.state.totalItems}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange}
                />
              </FormGroup>
              {this.state.errorRoleMessage !== '' &&
                this.state.showErrorMessage && (
                  <span style={{ color: 'red' }}>
                    User's roles cannot be empty
                  </span>
                )}
            </Form>
          </ModalBody>
          <ModalFooter>
            {formError.name == '' &&
            formError.fullname == '' &&
            formError.email == '' &&
            formError.phone == '' &&
            formError.password == '' &&
            formError.passwordConfirm == '' &&
            this.state.errorRoleMessage == '' ? (
              <Button color="success" onClick={this.wrapperFunction}>
                Submit
              </Button>
            ) : (
              <Button color="success" onClick={this.handleErrorMessage}>
                Submit
              </Button>
            )}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
