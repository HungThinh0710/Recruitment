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
      totalItems: ''
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  async componentWillMount() {
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
        <input type="checkbox" onChange={() => handleCheck(e)} />
      ));
    });
    function handleCheck(e) {
      listChecked.push(e.id);
    }
    this.setState({
      rows: data.data,
      listChecked: listChecked,
      totalItems: data.total,
      currentPage: data.current_page
    });
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
          alert('Add Failed');
        }
        if (res.status === 200) {
          alert('Add Successfully');
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
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber, currentPage: pageNumber });
    let list = this.state.listChecked;
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
            <input type="checkbox" onChange={() => handleCheck(e)} />
          ));
        });
        function handleCheck(e) {
          list.push(e.id);
        }
        this.setState({
          rows: data.data,
          listChecked: list,
          totalItems: data.total,
          currentPage: data.current_page
        });
      });
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
          <ModalHeader toggle={this.toggle}>Create A New User</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="Name">Username</Label>
                <Input type="text" name="name" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="Fullname">Full Name</Label>
                <Input
                  type="text"
                  name="fullname"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Email">Email</Label>
                <Input type="email" name="email" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="Phone">Phone</Label>
                <Input type="text" name="phone" onChange={this.handleChange} />
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
              </FormGroup>
              <FormGroup>
                <Label for="ConfirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  name="passwordConfirm"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <CollapsePermission
                  name="Roles"
                  data={this.state.rows}
                  activePage={this.state.activePage}
                  itemsCountPerPage={10}
                  totalItemsCount={this.state.totalItems}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange}
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
