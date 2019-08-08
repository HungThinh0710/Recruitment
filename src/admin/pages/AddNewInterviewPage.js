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
import { Link } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
const animatedComponents = makeAnimated();

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
export default class AddNewInterviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      timeStart: '',
      timeEnd: '',
      errorData: '',
      modalError: false,
      modalSuccess: false,
      modalErrorDate: false,
      showErrorMessage: false,

      optionInterviewer: [],
      optionCandidate: [],
      dataCandidate: [],
      dataInterviewer: [],
      selectedStreetOption: {
        id: 1,
        value: '453-455 Hoang Dieu Str',
        label: '453-455 Hoang Dieu Str'
      },
      selectedFloorOption: {
        id: 2,
        value: 2,
        label: 2
      },
      selectedInterviewerOption: [],
      selectedCandidateOption: [],
      urlInterview: '',
      errorNameMessage: 'Name is required',
      errorInterviewers: [],
      errorCandidates: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggleModalErrorDate = this.toggleModalErrorDate.bind(this);
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
    var dataCandidateFilter = data2.filter(e => e.status === 3);
    dataCandidateFilter.map(e => {
      var candidate = {
        id: e.id,
        value: e.fullname,
        label: e.fullname
      };
      optionCandidate.push(candidate);
      return optionCandidate;
    });
    this.setState({
      optionInterviewer: optionInterviewer,
      optionCandidate: optionCandidate
    });
  }

  backToPreviousPage = () => {
    this.props.history.push('/dashboard/interview');
  };

  handleSelectStreetChange = selectedStreetOption => {
    this.setState({ selectedStreetOption });
  };
  handleSelectFloorChange = selectedFloorOption => {
    this.setState({ selectedFloorOption });
  };
  handleSelectInterviewerChange = selectedInterviewerOption => {
    var dataInterviewer = [];
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
        var candidate = {
          fullname: res.fullname,
          interviews: res.interviews
        };
        dataFetchCandidate.push(candidate);
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
        var url = 'https://api.enclavei3dev.tk/api/interview';
        fetch(url, {
          method: 'POST',
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
              this.toggleModalSuccess();
              res.json().then(data => {
                console.log(data);
                this.setState({
                  urlInterview: '/dashboard/interview/' + data.id
                });
              });
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
    const { errorNameMessage, urlInterview } = this.state;

    return (
      <Card className="dashboard-card" style={{ marginBottom: '200px' }}>
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
                Successfully! Click to see the detail of the new interview
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

        <CardHeader className="card-header-custom">
          Create A New Interview
        </CardHeader>
        <CardBody>
          <Form>
            <FormGroup>
              <Label className="title-input" for="exampleName">
                Name
              </Label>
              <Input type="text" name="name" onChange={this.handleChange} />
              {errorNameMessage !== '' && this.state.showErrorMessage && (
                <span style={{ color: 'red' }}>
                  {this.state.errorNameMessage}
                </span>
              )}
            </FormGroup>
            <FormGroup>
              <Label className="title-input" for="exampleName">
                Time
              </Label>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                  {this.state.timeEnd === '' && this.state.showErrorMessage && (
                    <span style={{ color: 'red' }}>Time End is required</span>
                  )}
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <Label className="title-input" for="exampleName">
                Address
              </Label>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                  <span style={{ color: 'red' }}>Interviewer is required</span>
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
            <FormGroup style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
