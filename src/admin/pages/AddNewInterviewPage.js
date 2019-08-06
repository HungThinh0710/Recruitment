import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardHeader,
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

export default class AddNewInterviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      timeStart: '',
      errorData: '',
      modalError: false,
      modalSuccess: false,
      showErrorMessage: false,
      errorPermissionMessage: "Role's permissions cannot be empty",
      optionInterviewer: [],
      optionCandidate: [],
      dataCandidate: [],
      selectedInterviewerOption: null,
      selectedCandidateOption: null,
      urlInterview: ''
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
    var { optionInterviewer, optionCandidate } = this.state;
    var url1 = 'https://api.enclavei3dev.tk/api/list-interviewer';
    var url2 = 'https://api.enclavei3dev.tk/api/list-candidate';
    const data1 = await fetch(url1, {
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
    const data2 = await fetch(url2, {
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

    data1.map(e => {
      var interviewer = {
        id: e.id,
        value: e.fullname,
        label: e.fullname
      };
      optionInterviewer.push(interviewer);
      return optionInterviewer;
    });
    console.log(data2.data);
    data2.data.map(e => {
      var candidate = {
        id: e.id,
        value: e.fullname,
        label: e.fullname
      };
      optionCandidate.push(candidate);
      return optionCandidate;
    });
    this.setState({
      optionInterviewer: optionInterviewer
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
    const { errorRoleMessage, urlInterview } = this.state;
    return (
      <Card className="dashboard-card">
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
            <Link to={urlInterview}>
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

        <CardHeader className="card-header-custom">
          Create A New Interview
        </CardHeader>
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
              <Label className="title-input">Interviewers</Label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                //onChange={this.handleSelectPermissionChange.bind(this)}
                defaultValue={this.state.selectedInterviewerOption}
                options={this.state.optionInterviewer}
              />
              {!this.state.selectedPermissionOption &&
                this.state.showErrorMessage && (
                  <span style={{ color: 'red' }}>Permissions are required</span>
                )}
            </FormGroup>
            <FormGroup>
              <Label className="title-input">Candidates</Label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                //onChange={this.handleSelectPermissionChange.bind(this)}
                defaultValue={this.state.selectedCandidateOption}
                options={this.state.optionCandidate}
              />
              {!this.state.selectedPermissionOption &&
                this.state.showErrorMessage && (
                  <span style={{ color: 'red' }}>Permissions are required</span>
                )}
            </FormGroup>
            <br />
            <FormGroup style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
    );
  }
}
