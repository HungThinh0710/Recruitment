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

const roleNameRegex = /^[a-zA-Z0-9\s]+$/;

export default class ModalEditRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: '',
      description: '',
      errorRoleMessage: '',
      errorData: '',
      modalError: false,
      modal: false,
      modalSuccess: false,
      showErrorMessage: false,
      optionPermission: [],
      selectedPermissionOption: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
    this.handleErrorMessage = this.handleErrorMessage.bind(this);
  }

  async componentDidMount() {
    var { optionPermission, selectedPermissionOption } = this.state;
    const { id, dataPermissions } = this.props;
    var url1 = 'https://api.enclavei3dev.tk/api/role/' + id;
    const data1 = await fetch(url1, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    data1.permissions.map(e => {
      var currentPermission = { id: e.id, value: e.name, label: e.name };
      selectedPermissionOption.push(currentPermission);
      return selectedPermissionOption;
    });
    dataPermissions.map(e => {
      var permission = { id: e.id, value: e.name, label: e.name };
      optionPermission.push(permission);
      return optionPermission;
    });
    this.setState({
      role: data1.name,
      description: data1.description,
      optionPermission: optionPermission,
      selectedPermissionOption: selectedPermissionOption
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
    this.setState({
      showErrorMessage: true
    });
  };

  handleSelectPermissionChange = selectedPermissionOption => {
    if (selectedPermissionOption == null) {
      selectedPermissionOption = [];
    }
    this.setState({ selectedPermissionOption });
  };

  handleSubmit() {
    const { role, selectedPermissionOption, description } = this.state;
    const { id } = this.props;
    var array = [];
    selectedPermissionOption.map(e => {
      array.push(e.id);
      return array;
    });
    var url = 'https://api.enclavei3dev.tk/api/role/' + id;
    fetch(url, {
      method: 'PUT',
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
    return (
      <div>
        {/*--------Modal-Success-----*/}
        <Modal
          isOpen={this.state.modalSuccess}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModalSuccess}>
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
          <ModalHeader toggle={this.toggleModalError}>
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
            {' '}
            <span className="dashboard-modal-header">Update role</span>{' '}
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="roleName" className="title-input">
                  Role:
                </Label>
                <Input
                  type="text"
                  name="role"
                  onChange={this.handleChange}
                  value={this.state.role}
                />
              </FormGroup>
              {this.state.errorRoleMessage !== '' &&
                this.state.showErrorMessage && (
                  <span style={{ color: 'red' }}>
                    {this.state.errorRoleMessage}
                  </span>
                )}
              <FormGroup>
                <Label className="title-input" for="exampleDescription">
                  Description
                </Label>
                <textarea
                  className="dashboard-textarea-input"
                  name="description"
                  onChange={this.handleChange}
                  value={this.state.description}
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
                {this.state.selectedPermissionOption.length === 0 &&
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
                  this.state.selectedPermissionOption.length !== 0 ? (
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
