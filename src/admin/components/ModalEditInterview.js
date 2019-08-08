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
import DatePicker from 'react-datepicker';
import makeAnimated from 'react-select/animated';
import moment from 'moment';
const animatedComponents = makeAnimated();

const roleNameRegex = /^[a-zA-Z0-9\s]+$/;

const optionStreet = [
  { id: 1, value: '453-455 Hoang Dieu Str', label: '453-455 Hoang Dieu Str' },
  { id: 2, value: '117 Nguyen Huu Tho Str', label: '117 Nguyen Huu Tho Str' }
];
const optionsFloor = [
  { id: 2, value: 2, label: 2 },
  { id: 3, value: 3, label: 3 },
  { id: 4, value: 4, label: 4 },
  { id: 5, value: 5, label: 5 }
];
export default class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      timeStart: '',
      timeEnd: '',
      errorData: '',
      modalError: false,
      modal: false,
      modalErrorDate: false,
      modalSuccess: false,
      showErrorMessage: false,
      optionInterviewer: [],
      optionCandidate: [],
      selectedInterviewerOption: [],
      selectedCandidateOption: [],
      errorNameMessage: '',
      selectedFloorOption: null,
      selectedStreetOption: null,
      dataCandidate: [],
      dataInterviewer: [],
      errorInterviewers: [],
      errorCandidates: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
    this.handleErrorMessage = this.handleErrorMessage.bind(this);
    this.toggleModalErrorDate = this.toggleModalErrorDate.bind(this);
  }

  async componentDidMount() {
    var {
      optionInterviewer,
      selectedInterviewerOption,
      optionCandidate,
      selectedCandidateOption,
      selectedFloorOption,
      selectedStreetOption
    } = this.state;
    const { id, dataInterviewers, dataCandidates } = this.props;
    var url1 = 'https://api.enclavei3dev.tk/api/interview/' + id;

    const data1 = await fetch(url1, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    switch (data1.address) {
      case 'Floor 2 - 453-455 Hoang Dieu Str':
        selectedFloorOption = { id: 2, value: 2, label: 2 };
        selectedStreetOption = {
          id: 1,
          value: '453-455 Hoang Dieu Str',
          label: '453-455 Hoang Dieu Str'
        };
        break;
      case 'Floor 3 - 453-455 Hoang Dieu Str':
        selectedFloorOption = { id: 3, value: 3, label: 3 };
        selectedStreetOption = {
          id: 1,
          value: '453-455 Hoang Dieu Str',
          label: '453-455 Hoang Dieu Str'
        };
        break;
      case 'Floor 4 - 453-455 Hoang Dieu Str':
        selectedFloorOption = { id: 4, value: 4, label: 4 };
        selectedStreetOption = {
          id: 1,
          value: '453-455 Hoang Dieu Str',
          label: '453-455 Hoang Dieu Str'
        };
        break;
      case 'Floor 5 - 453-455 Hoang Dieu Str':
        selectedFloorOption = { id: 5, value: 5, label: 5 };
        selectedStreetOption = {
          id: 1,
          value: '453-455 Hoang Dieu Str',
          label: '453-455 Hoang Dieu Str'
        };
        break;
      case 'Floor 2 - 117 Nguyen Huu Tho Str':
        selectedFloorOption = { id: 2, value: 2, label: 2 };
        selectedStreetOption = {
          id: 2,
          value: '117 Nguyen Huu Tho Str',
          label: '117 Nguyen Huu Tho Str'
        };
        break;
      case 'Floor 3 - 117 Nguyen Huu Tho Str':
        selectedFloorOption = { id: 3, value: 3, label: 3 };
        selectedStreetOption = {
          id: 2,
          value: '117 Nguyen Huu Tho Str',
          label: '117 Nguyen Huu Tho Str'
        };
        break;
      case 'Floor 4 - 117 Nguyen Huu Tho Str':
        selectedFloorOption = { id: 4, value: 4, label: 4 };
        selectedStreetOption = {
          id: 2,
          value: '117 Nguyen Huu Tho Str',
          label: '117 Nguyen Huu Tho Str'
        };
        break;
      case 'Floor 5 - 117 Nguyen Huu Tho Str':
        selectedFloorOption = { id: 5, value: 5, label: 5 };
        selectedStreetOption = {
          id: 2,
          value: '117 Nguyen Huu Tho Str',
          label: '117 Nguyen Huu Tho Str'
        };
        break;
    }
    data1.interviewers.map(e => {
      var currentInterviewer = {
        id: e.id,
        value: e.fullname,
        label: e.fullname
      };
      selectedInterviewerOption.push(currentInterviewer);
      return selectedInterviewerOption;
    });

    data1.candidates.map(e => {
      var currentCandidate = {
        id: e.id,
        value: e.fullname,
        label: e.fullname
      };
      selectedCandidateOption.push(currentCandidate);
      return selectedCandidateOption;
    });

    dataInterviewers.map(e => {
      var interviewer = { id: e.id, value: e.fullname, label: e.fullname };
      optionInterviewer.push(interviewer);
      return optionInterviewer;
    });
    var dataCandidatesFilter = dataCandidates.filter(e => e.status === 3);
    dataCandidatesFilter.map(e => {
      var candidate = { id: e.id, value: e.fullname, label: e.fullname };
      optionCandidate.push(candidate);
      return optionCandidate;
    });
    this.setState({
      name: data1.name,
      timeStart: new Date(data1.timeStart),
      timeEnd: new Date(data1.timeEnd),
      optionInterviewer: optionInterviewer,
      selectedInterviewerOption: selectedInterviewerOption,
      optionCandidate: optionCandidate,
      selectedCandidateOption: selectedCandidateOption,
      selectedFloorOption: selectedFloorOption,
      selectedStreetOption: selectedStreetOption
    });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleSelectStreetChange = selectedStreetOption => {
    this.setState({ selectedStreetOption });
  };
  handleSelectFloorChange = selectedFloorOption => {
    this.setState({ selectedFloorOption });
  };
  handleSelectInterviewerChange = selectedInterviewerOption => {
    var dataInterviewer = [];
    if (selectedInterviewerOption == null) {
      selectedInterviewerOption = [];
    }
    selectedInterviewerOption.map(e => {
      dataInterviewer.push(e.id);
      return dataInterviewer;
    });
    this.setState({
      selectedInterviewerOption,
      dataInterviewer: dataInterviewer
    });
  };
  handleSelectCandidateChange = selectedCandidateOption => {
    var dataCandidate = [];
    if (selectedCandidateOption == null) {
      selectedCandidateOption = [];
    }
    selectedCandidateOption.map(e => {
      dataCandidate.push(e.id);
      return dataCandidate;
    });
    this.setState({
      selectedCandidateOption,
      dataCandidate: dataCandidate
    });
  };

  handleChange(event) {
    var { errorNameMessage } = this.state;
    if (event.target.name == 'name') {
      if (event.target.value.length === 0) {
        errorNameMessage = 'Name is required';
      } else {
        errorNameMessage = '';
      }
    }
    this.setState({
      [event.target.name]: event.target.value,
      errorNameMessage: errorNameMessage
    });
  }

  handleChangeTimeStart(date) {
    this.setState({
      timeStart: date
    });
  }
  handleChangeTimeEnd(date) {
    this.setState({
      timeEnd: date
    });
  }

  handleErrorMessage = () => {
    this.setState({
      showErrorMessage: true
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
  toggleModalErrorDate() {
    this.setState(prevState => ({
      modalErrorDate: !prevState.modalErrorDate
    }));
  }
  async fetchInterviewer(id) {
    var url = 'https://api.enclavei3dev.tk/api/interviewer/' + id;
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    return data;
  }

  async fetchCandidate(id) {
    var url = 'https://api.enclavei3dev.tk/api/candidate/' + id;
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    return data;
  }
  handleSubmit() {
    const {
      timeStart,
      timeEnd,
      name,
      selectedInterviewerOption,
      selectedCandidateOption,
      selectedFloorOption,
      selectedStreetOption
    } = this.state;
    var time = moment(timeStart);
    var {
      dataInterviewer,
      dataCandidate,
      errorCandidates,
      errorInterviewers
    } = this.state;
    var dataFetchInterviewer = [];
    var dataFetchCandidate = [];
    dataInterviewer.map(e => {
      var data1 = this.fetchInterviewer(e);
      data1.then(res => {
        var interviewer = {
          fullname: res.fullname,
          interviews: res.interviews
        };
        dataFetchInterviewer.push(interviewer);
      });
      return dataFetchInterviewer;
    });
    dataCandidate.map(e => {
      var data2 = this.fetchCandidate(e);
      data2.then(res => {
        var interviewer = {
          fullname: res.fullname,
          interviews: res.interviews
        };
        dataFetchCandidate.push(interviewer);
      });
      return dataFetchCandidate;
    });
    setTimeout(() => {
      var interviewerArray = [];
      var candidateArray = [];
      var itemInterviewer = '';
      var itemCandidate = '';
      dataFetchInterviewer.map(e => {
        if (e.interviews.length === 0) {
          itemInterviewer = [0];
        } else {
          itemInterviewer = e.interviews;
        }
        interviewerArray.push(itemInterviewer);
        return interviewerArray;
      });
      interviewerArray.map(element => {
        element.map(interview => {
          if (interview.timeStart) {
            var timeStartInterview = interview.timeStart;
            if (time.isSame(moment(timeStartInterview))) {
              errorInterviewers.push(
                dataFetchInterviewer[interviewerArray.indexOf(element)]
              );
            }
          }
        });
        return errorInterviewers;
      });
      dataFetchCandidate.map(e => {
        if (e.interviews.length === 0) {
          itemCandidate = [0];
        } else {
          itemCandidate = e.interviews;
        }
        candidateArray.push(itemCandidate);
        return candidateArray;
      });
      candidateArray.map(element => {
        element.map(interview => {
          if (interview.timeStart) {
            var timeStartInterview = interview.timeStart;
            if (time.isSame(moment(timeStartInterview))) {
              errorCandidates.push(
                dataFetchCandidate[candidateArray.indexOf(element)]
              );
            }
          }
        });
        return errorCandidates;
      });
      if (errorInterviewers.length === 0 && errorCandidates.length === 0) {
        var arrayInterviewer = [];
        var arrayCandidate = [];
        selectedInterviewerOption.map(e => {
          arrayInterviewer.push(e.id);
          return arrayInterviewer;
        });
        if (selectedCandidateOption) {
          selectedCandidateOption.map(e => {
            arrayCandidate.push(e.id);
            return arrayCandidate;
          });
        }

        var address = selectedFloorOption.id + '-' + selectedStreetOption.id;
        const timeStartFormat = moment(timeStart).format();
        const timeEndFormat = moment(timeEnd).format();
        const i = timeStartFormat.indexOf('T');
        const j = timeEndFormat.indexOf('T');
        const newDateString = (s, i) => {
          return s.substr(0, i) + ' ' + s.substr(i + 1, 8);
        };
        var body = '';
        if (selectedCandidateOption) {
          body = {
            name: name,
            address: address,
            timeStart: newDateString(timeStartFormat, i),
            timeEnd: newDateString(timeEndFormat, j),
            interviewerId: arrayInterviewer,
            candidateId: arrayCandidate
          };
        } else {
          body = {
            name: name,
            address: address,
            timeStart: newDateString(timeStartFormat, i),
            timeEnd: newDateString(timeEndFormat, j),
            interviewerId: arrayInterviewer
          };
        }
        const { id } = this.props;
        var url = 'https://api.enclavei3dev.tk/api/interview/' + id;
        fetch(url, {
          method: 'PUT',
          body: JSON.stringify(body),
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
                const dataArray = Object.keys(data.errors).map(
                  i => data.errors[i]
                );
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
      } else {
        this.toggleModalErrorDate();
        this.setState({
          errorInterviewers: errorInterviewers,
          errorCandidates: errorCandidates
        });
      }
    }, 500);
  }

  render() {
    var i = 0;
    var j = 0;
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
        {/*--------Modal-Error-Validate-Date-----*/}
        <Modal
          isOpen={this.state.modalErrorDate}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader
            toggle={this.toggleModalErrorDate}
            className="card-header-custom"
          >
            <span className="dashboard-modal-header">Notification</span>
          </ModalHeader>
          <ModalBody>
            {this.state.errorInterviewers.length !== 0 && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Label style={{ fontWeight: 'bold' }}>Interviewer:</Label>
                {this.state.errorInterviewers.map(e => {
                  j++;
                  return (
                    <span style={{ color: 'red' }} key={j}>
                      {e.fullname} is in another interview at this time{' '}
                    </span>
                  );
                })}
              </div>
            )}
            {this.state.errorCandidates.length !== 0 && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Label style={{ fontWeight: 'bold' }}>Candidate:</Label>
                {this.state.errorCandidates.map(e => {
                  j++;
                  return (
                    <span style={{ color: 'red' }} key={j}>
                      {e.fullname} is in another interview at this time{' '}
                    </span>
                  );
                })}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalErrorDate}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/*--------Modal-Error-Validate-Date-----*/}

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
            <span className="dashboard-modal-header">Update Interview</span>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label className="title-input" for="exampleName">
                  Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                {this.state.errorNameMessage !== '' &&
                  this.state.showErrorMessage && (
                    <span style={{ color: 'red' }}>
                      {this.state.errorNameMessage}
                    </span>
                  )}
              </FormGroup>
              <FormGroup>
                <Label className="title-input" for="exampleName">
                  Time
                </Label>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div style={{ width: '45%' }}>
                    <Label for="exampleName">Start</Label>
                    <div className="input-calendar">
                      <DatePicker
                        selected={this.state.timeStart}
                        onChange={this.handleChangeTimeStart.bind(this)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="time"
                      />
                    </div>
                    {this.state.timeStart === '' &&
                      this.state.showErrorMessage && (
                        <span style={{ color: 'red' }}>
                          Time start is required
                        </span>
                      )}
                  </div>

                  <div style={{ width: '45%' }}>
                    <Label for="exampleName">End</Label>
                    <div className="input-calendar">
                      <DatePicker
                        selected={this.state.timeEnd}
                        onChange={this.handleChangeTimeEnd.bind(this)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="time"
                      />
                    </div>
                    {this.state.timeEnd === '' &&
                      this.state.showErrorMessage && (
                        <span style={{ color: 'red' }}>
                          Time End is required
                        </span>
                      )}
                  </div>
                </div>
              </FormGroup>
              <FormGroup>
                <Label className="title-input" for="exampleName">
                  Address
                </Label>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div style={{ width: '45%' }}>
                    <Label for="exampleName">Street</Label>
                    <Select
                      components={animatedComponents}
                      onChange={this.handleSelectStreetChange.bind(this)}
                      defaultValue={this.state.selectedStreetOption}
                      options={optionStreet}
                    />
                  </div>

                  <div style={{ width: '45%' }}>
                    <Label for="exampleName">Floor</Label>
                    <Select
                      components={animatedComponents}
                      onChange={this.handleSelectFloorChange.bind(this)}
                      defaultValue={this.state.selectedFloorOption}
                      options={optionsFloor}
                    />
                  </div>
                </div>
              </FormGroup>
              <FormGroup>
                <Label className="title-input">Interviewers</Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  onChange={this.handleSelectInterviewerChange.bind(this)}
                  defaultValue={this.state.selectedInterviewerOption}
                  options={this.state.optionInterviewer}
                />
                {!this.state.selectedInterviewerOption &&
                  this.state.showErrorMessage && (
                    <span style={{ color: 'red' }}>
                      Interviewer is required
                    </span>
                  )}
              </FormGroup>
              <FormGroup>
                <Label className="title-input">Candidates</Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  onChange={this.handleSelectCandidateChange.bind(this)}
                  defaultValue={this.state.selectedCandidateOption}
                  options={this.state.optionCandidate}
                />
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
                  {this.state.errorNameMessage == '' &&
                  this.state.timeStart !== '' &&
                  this.state.timeEnd !== '' &&
                  this.state.selectedInterviewerOption.length !== 0 ? (
                    <Button color="success" onClick={this.handleSubmit}>
                      Submit
                    </Button>
                  ) : (
                    <Button color="success" onClick={this.handleErrorMessage}>
                      Submit
                    </Button>
                  )}
                  <Button onClick={() => this.toggle()} color="secondary">
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
