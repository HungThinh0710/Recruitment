import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Label,
  Input
} from 'reactstrap';
import { MdCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

const roleNameRegex = /^[a-zA-Z0-9\s]+$/;

export default class AddNewRolePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: '',
      description: '',
      errorRoleMessage: "Role's name is required",
      errorData: '',
      modalError: false,
      modalSuccess: false,
      showErrorMessage: false,
      errorPermissionMessage: "Role's permissions cannot be empty",
      optionPermission: [],
      selectedPermissionOption: null,
      urlRole: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
    this.handleErrorMessage = this.handleErrorMessage.bind(this);
  }
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/login');
    }
  }
  async componentDidMount() {
    var { optionPermission } = this.state;
    var url = 'https://api.enclavei3dev.tk/api/permission';

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
      var permission = { id: e.id, value: e.name, label: e.name };
      optionPermission.push(permission);
      return optionPermission;
    });

    this.setState({
      optionPermission: optionPermission
    });
  }

  backToPreviousPage = () => {
    this.props.history.push('/dashboard/role');
  };

  handleSelectPermissionChange = selectedPermissionOption => {
    this.setState({ selectedPermissionOption });
  };

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

  handleSubmit() {
    const { role, selectedPermissionOption, description } = this.state;
    var array = [];
    selectedPermissionOption.map(e => {
      array.push(e.id);
      return array;
    });
    var url = 'https://api.enclavei3dev.tk/api/role';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: role,
        description: description,
        permissions: array
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
              urlRole: '/dashboard/role/' + data.role.id
            });
          });
        }
      })
      .catch(error => console.error('Error:', error));
  }

  render() {
    var i = 0;
    const { errorRoleMessage, urlRole } = this.state;
    return (
      <div
        className="profile-card"
        style={{ marginBottom: '250px', width: '70%', marginTop: '6%' }}
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
            <Link to={urlRole}>
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
            Create A New Role
            <Link to="/dashboard/role">
              <MdCancel />
            </Link>
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label className="title-input" for="exampleName">
                  Name
                </Label>
                <Input type="text" name="role" onChange={this.handleChange} />
                {errorRoleMessage !== '' && this.state.showErrorMessage && (
                  <span style={{ color: 'red' }}>
                    {this.state.errorRoleMessage}
                  </span>
                )}
              </FormGroup>
              <FormGroup>
                <Label className="title-input" for="exampleDescription">
                  Description
                </Label>
                <textarea
                  style={{ width: '100% ' }}
                  name="description"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label className="title-input">Permissions</Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  onChange={this.handleSelectPermissionChange.bind(this)}
                  defaultValue={this.state.selectedPermissionOption}
                  options={this.state.optionPermission}
                />
                {!this.state.selectedPermissionOption &&
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
                    width: '180px',
                    justifyContent: 'space-between'
                  }}
                >
                  {this.state.errorRoleMessage == '' &&
                  this.state.selectedPermissionOption ? (
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
