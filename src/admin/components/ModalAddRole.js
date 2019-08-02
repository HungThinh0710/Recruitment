import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  FormGroup,
  Form,
  Label,
  Input
} from 'reactstrap';
import './ModalConfirmPassword.css';
import '../pages/RolesPage.css';
import CollapsePermission from '../components/CollapsePermission';
import { MDBBtn } from 'mdbreact';
import { ClipLoader } from 'react-spinners';

const roleNameRegex = /^[a-zA-Z0-9\s]+$/;

export default class ModalAddRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activePage: 1,
      currentPage: 1,
      totalItems: '',
      rows: [],
      itemId: '',
      role: '',
      description: '',
      listChecked: [],
      loading: true,
      errorRoleMessage: "Role's name is required",
      errorData: '',
      modalError: false,
      modalSuccess: false,
      showErrorMessage: false,
      errorPermissionMessage: "Role's permissions cannot be empty"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleErrorMessage = this.handleErrorMessage.bind(this);
  }

  async componentDidMount() {
    var { listChecked } = this.state;
    var url = 'https://api.enclavei3dev.tk/api/permission?page=1';

    const data = await fetch(url, {
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

    setTimeout(() => {
      this.setState({
        rows: data.data,
        listChecked: listChecked,
        totalItems: data.total,
        currentPage: data.current_page,
        loading: false
      });
    }, 500);
  }

  handleCheck(e, listChecked) {
    listChecked.push(e.id);
    var { errorPermissionMessage } = this.state;
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
      ? (errorPermissionMessage = "Role's permissions cannot be empty")
      : (errorPermissionMessage = '');

    this.setState({
      listChecked: listChecked,
      errorPermissionMessage: errorPermissionMessage
    });
  }

  handleChange(event) {
    var { errorRoleMessage } = this.state;
    if (event.target.name == 'role') {
      if (event.target.value.length === 0) {
        errorRoleMessage = "Role's name is required";
      } else {
        roleNameRegex.test(event.target.value)
          ? (errorRoleMessage = '')
          : (errorRoleMessage =
              "Role's name cannot contain special characters");
      }
    }
    this.setState({
      [event.target.name]: event.target.value,
      errorRoleMessage: errorRoleMessage
    });
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber, currentPage: pageNumber });
    var { listChecked } = this.state;
    var url = 'https://api.enclavei3dev.tk/api/permission?page=' + pageNumber;
    fetch(url, {
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

  wrapperFunction = () => {
    this.addItem();
  };

  handleErrorMessage = () => {
    var { listChecked, errorPermissionMessage } = this.state;
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
      ? (errorPermissionMessage = "Role's permissions cannot be empty")
      : (errorPermissionMessage = '');
    this.setState({
      showErrorMessage: true,
      errorPermissionMessage: errorPermissionMessage
    });
  };

  addItem() {
    const { role, listChecked, description } = this.state;
    var message = '';
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
    var url = 'https://api.enclavei3dev.tk/api/role';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: role,
        description: description,
        permissions: array2
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
          var url2 =
            'https://api.enclavei3dev.tk/api/list-role?page=' + this.props.page;
          res.json().then(data => {
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

  toggle() {
    if (this.state.modal == true) {
      this.setState(prevState => ({
        modal: !prevState.modal,
        role: '',
        description: '',
        listChecked: [],
        errorRoleMessage: "Role's name is required",
        errorData: '',
        showErrorMessage: false,
        errorPermissionMessage: "Role's permissions cannot be empty"
      }));
    } else {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }
  }

  render() {
    const {
      listChecked,
      errorRoleMessage,
      role,
      errorPermissionMessage
    } = this.state;
    var i = 0;

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
        <MDBBtn onClick={this.toggle} rounded color={this.props.color}>
          {this.props.buttonLabel}
        </MDBBtn>
        <Modal
          size="lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Create A New Role</ModalHeader>
          <ModalBody>
            <Card>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="exampleName">Name</Label>
                    <Input
                      type="text"
                      name="role"
                      onChange={this.handleChange}
                    />
                    {errorRoleMessage !== '' && this.state.showErrorMessage && (
                      <span style={{ color: 'red' }}>
                        {this.state.errorRoleMessage}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleDescription">Description</Label>
                    <Input
                      style={{ width: '100% ' }}
                      name="description"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <br />
                    <CollapsePermission
                      style={{
                        width: '100%'
                      }}
                      name="Permission"
                      data={this.state.rows}
                      activePage={this.state.activePage}
                      itemsCountPerPage={10}
                      totalItemsCount={this.state.totalItems}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                    />
                    <br />
                    {this.state.errorPermissionMessage !== '' &&
                      this.state.showErrorMessage && (
                        <span style={{ color: 'red' }}>
                          Role's permissions cannot be empty
                        </span>
                      )}
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            {this.state.errorRoleMessage == '' &&
            this.state.errorPermissionMessage == '' ? (
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
