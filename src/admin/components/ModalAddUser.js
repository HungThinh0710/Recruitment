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
const nameRegex = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
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
        fullname: '',
        email: '',
        phone: ''
      },
      modalError: false,
      modalSuccess: false,
      errorData: ''
    };

    this.toggle = this.toggle.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
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
    this.setState({
      listChecked: listChecked
    });
  }

  wrapperFunction = () => {
    const { listChecked, formError } = this.state;
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
    if (
      formError.name !== '' &&
      formError.fullname !== '' &&
      formError.email !== '' &&
      formError.phone !== '' &&
      this.state.password !== '' &&
      this.state.passwordConfirm !== this.state.password &&
      array2.length !== 0
    ) {
      this.handleSubmit();
      this.toggle();
      this.toggleModalSuccess();
    } else {
      this.handleSubmit();
      this.toggleModalError();
    }
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
    this.setState(prevState => ({
      modal: !prevState.modal,
      name: '',
      fullname: '',
      phone: '',
      email: '',
      password: '',
      passwordConfirm: '',
      formError: {
        name: '',
        fullname: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        passwordConfirm: ''
      },
      errorData: ''
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
          res.json().then(data => {
            const dataArray = Object.keys(data.errors).map(i => data.errors[i]);
            this.setState({
              errorData: dataArray
            });
          });
        }
        if (res.status === 200) {
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
                'Username have at least 6 characters and cannot contain special characters');
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
    }

    this.setState({
      [event.target.name]: event.target.value,
      formError: {
        name: formError.name,
        fullname: formError.fullname,
        email: formError.email,
        phone: formError.phone
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
            <span style={{ color: 'green' }}>Added succesfully</span>
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
                {this.state.name == '' ? (
                  <span style={{ color: 'red' }}>Username is required</span>
                ) : (
                  <span style={{ color: 'red' }}>
                    {this.state.formError.name}
                  </span>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="Fullname">Fullname</Label>
                <Input
                  type="text"
                  name="fullname"
                  onChange={this.handleChange}
                />
                {/* {this.state.formError.fullname.length !== 0 && (
                  <span style={{ color: 'red' }}>
                    {this.state.formError.fullname}
                  </span>
                )} */}
                {this.state.fullname == '' ? (
                  <span style={{ color: 'red' }}>Full name is required</span>
                ) : (
                  <span style={{ color: 'red' }}>
                    {this.state.formError.fullname}
                  </span>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="Email">Email</Label>
                <Input type="email" name="email" onChange={this.handleChange} />
                {this.state.email == '' ? (
                  <span style={{ color: 'red' }}>Email is required</span>
                ) : (
                  <span style={{ color: 'red' }}>
                    {this.state.formError.email}
                  </span>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="Phone">Phone</Label>
                <Input type="text" name="phone" onChange={this.handleChange} />
                {this.state.phone == '' ? (
                  <span style={{ color: 'red' }}>Phone number is required</span>
                ) : (
                  <span style={{ color: 'red' }}>
                    {this.state.formError.phone}
                  </span>
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
                {this.state.password.length === 0 && (
                  <span style={{ color: 'red' }}>Password is required</span>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="ConfirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  name="passwordConfirm"
                  onChange={this.handleChange}
                />
                {this.state.password !== this.state.passwordConfirm && (
                  <span style={{ color: 'red' }}>Password does not match!</span>
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
              {array2.length === 0 && (
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
            name !== '' &&
            fullname !== '' &&
            email !== '' &&
            phone !== '' &&
            password !== '' &&
            array2.length !== 0 &&
            passwordConfirm == password ? (
              <Button color="success" onClick={this.wrapperFunction}>
                Submit
              </Button>
            ) : (
              <Button color="success" onClick={this.wrapperFunction} disabled>
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
