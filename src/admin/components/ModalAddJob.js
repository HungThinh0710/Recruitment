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
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './ModalAddJob.css';

export default class ModalAddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: '',
      description: '',
      address: '453-455 Hoang Dieu',
      position: '',
      category: 'Internship',
      salaryBegin: '',
      salaryEnd: '',
      status: 'Full-time',
      experience: '1 year',
      amount: 0,
      publishedOn: '',
      deadline: '',
      formError: {
        name: 'Name is required',
        position: 'Position is required',
        salary: 'Salary is required',
        publishedOn: 'Published date is required',
        deadline: 'Closed date is required',
        amount: 'Amount is required',
        salaryBegin: 'Starting salary is required',
        salaryEnd: ''
      },
      modalError: false,
      modalSuccess: false,
      errorData: '',
      showErrorMessage: false
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
  }

  wrapperFunction = () => {
    this.handleSubmit();
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
        description: '',
        address: '453-455 Hoang Dieu',
        position: '',
        category: 'Internship',
        salaryBegin: '',
        salaryEnd: '',
        status: 'Full-time',
        experience: '1 year',
        amount: 0,
        publishedOn: '',
        deadline: '',
        formError: {
          name: 'Name is required',
          address: 'Address is required',
          position: 'Position is required',
          salary: 'Salary is required',
          status: 'Status is required',
          publishedOn: 'Published date is required',
          deadline: 'Closed date is required',
          amount: 'Amount is required',
          salaryBegin: 'Starting salary is required',
          salaryEnd: ''
        },
        modalError: false,
        modalSuccess: false,
        errorData: '',
        showErrorMessage: false
      }));
    } else {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }
  }
  handlePossitiveNumber(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (/\+|-/.test(keyValue)) event.preventDefault();
  }
  handleSubmit = () => {
    const {
      name,
      description,
      address,
      position,
      salaryBegin,
      salaryEnd,
      status,
      category,
      experience,
      amount,
      publishedOn,
      deadline
    } = this.state;

    const publishedOnFormat = moment(publishedOn).format();
    const deadlineFormat = moment(deadline).format();
    const i = publishedOnFormat.indexOf('T');
    const j = deadlineFormat.indexOf('T');
    const newDateString = (s, i) => {
      return s.substr(0, i) + ' ' + s.substr(i + 1, 8);
    };
    var salary = '';
    var exp = 0;
    if (salaryEnd !== '') {
      if (salaryBegin === salaryEnd) {
        salary = salaryBegin + '$';
      } else {
        salary = salaryBegin + '$ - ' + salaryEnd + '$';
      }
    } else {
      salary = salaryBegin + '$';
    }

    switch (experience) {
      case '1 year':
        exp = 1;
        break;
      case '2 years':
        exp = 2;
        break;
      case '3 years':
        exp = 3;
        break;
      case '4 years':
        exp = 4;
        break;
      case '5 years':
        exp = 5;
        break;
      case 'More than 5 years':
        exp = 6;
        break;
    }
    var url = 'https://api.enclavei3dev.tk/api/job';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        description: description,
        address: address,
        position: position,
        salary: salary,
        status: status,
        category: category,
        experience: exp,
        amount: amount,
        publishedOn: newDateString(publishedOnFormat, i),
        deadline: newDateString(deadlineFormat, j)
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
          //this.toggle();
          this.setState(prevState => ({
            modal: !prevState.modal,
            modalError: false,
            modalSuccess: true
          }));
          res.json().then(data => {
            var url2 =
              'https://api.enclavei3dev.tk/api/list-job?page=' +
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

  handleChangeDatePublishPicker(date) {
    this.setState({
      publishedOn: date
    });
  }
  handleChangeDateDeadlinePicker(date) {
    this.setState({
      deadline: date
    });
  }

  handleChange(event) {
    var { formError } = this.state;
    switch (event.target.name) {
      case 'name':
        if (event.target.value.length === 0) {
          formError.name = 'Name is required';
        } else {
          formError.name = '';
        }
        break;
      case 'publishedOn':
        if (event.target.value.length === 0) {
          formError.publishedOn = 'Published date is required';
        } else {
          formError.publishedOn = '';
        }
        break;
      case 'deadline':
        if (event.target.value.length === 0) {
          formError.deadline = 'Closed date is required';
        } else {
          formError.deadline = '';
        }
        break;
      case 'position':
        if (event.target.value.length === 0) {
          formError.position = 'Position is required';
        } else {
          formError.position = '';
        }
        break;
      case 'amount':
        if (event.target.value.length === 0) {
          formError.amount = 'Amount is required';
        } else {
          formError.amount = '';
        }
        break;
      case 'salaryBegin':
        if (event.target.value.length === 0) {
          formError.salaryBegin = 'Starting salary is required';
        } else {
          formError.salaryBegin = '';
        }
        this.setState({
          salaryBegin: event.target.value
        });
        break;
      case 'salaryEnd':
        if (event.target.value.length === 0) {
          formError.salaryEnd = '';
        } else if (event.target.value.length !== 0) {
          if (
            parseInt(event.target.value, 10) <
            parseInt(this.state.salaryBegin, 10)
          ) {
            formError.salaryEnd =
              'Ending salary must be greater than starting salary';
          } else {
            formError.salaryEnd = '';
          }
        }

        break;
    }
    this.setState({
      [event.target.name]: event.target.value,
      formError: {
        name: formError.name,
        position: formError.position,
        salary: formError.salary,
        amount: formError.amount,
        salaryBegin: formError.salaryBegin,
        salaryEnd: formError.salaryEnd
      }
    });
  }
  handleErrorMessage = () => {
    this.setState({
      showErrorMessage: true
    });
  };
  render() {
    var i = 0;
    const { formError } = this.state;
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
            <span style={{ color: '#45b649' }}>Added succesfully</span>
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
          <ModalHeader toggle={this.toggle}>Create A New Job</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label
                  style={{ fontSize: '18px', fontWeight: 'bold' }}
                  for="Name"
                >
                  Name
                </Label>
                <Input type="text" name="name" onChange={this.handleChange} />
                {formError.name !== '' && this.state.showErrorMessage && (
                  <span style={{ color: 'red' }}>{formError.name}</span>
                )}
              </FormGroup>
              <FormGroup>
                <Label
                  style={{ fontSize: '18px', fontWeight: 'bold' }}
                  for="Description"
                >
                  Description
                </Label>
                <textarea
                  style={{ width: '100%' }}
                  name="description"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label
                  style={{ fontSize: '18px', fontWeight: 'bold' }}
                  for="time"
                >
                  Time
                </Label>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div style={{ width: '45%' }}>
                    <Label for="Published">From</Label>
                    <div className="input-calendar">
                      <DatePicker
                        selected={this.state.publishedOn}
                        onChange={this.handleChangeDatePublishPicker.bind(this)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="time"
                      />
                    </div>

                    {formError.publishedOn !== '' &&
                      this.state.showErrorMessage && (
                        <span style={{ color: 'red' }}>
                          {formError.publishedOn}
                        </span>
                      )}
                  </div>
                  <div style={{ width: '45%' }}>
                    <Label for="Deadline">To</Label>
                    <div className="input-calendar">
                      <DatePicker
                        selected={this.state.deadline}
                        onChange={this.handleChangeDateDeadlinePicker.bind(
                          this
                        )}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="time"
                      />
                    </div>
                    {formError.deadline !== '' &&
                      this.state.showErrorMessage && (
                        <span style={{ color: 'red' }}>
                          {formError.deadline}
                        </span>
                      )}
                  </div>
                </div>
              </FormGroup>

              <FormGroup
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div style={{ width: '45%' }}>
                  <Label
                    style={{ fontSize: '18px', fontWeight: 'bold' }}
                    for="Salary"
                    for="Address"
                  >
                    Address
                  </Label>
                  <Input
                    type="select"
                    name="address"
                    id="exampleSelect"
                    onChange={this.handleChange}
                  >
                    <option>453-455 Hoang Dieu</option>
                    <option>117 Nguyen Huu Tho</option>
                  </Input>
                </div>
                <div style={{ width: '45%' }}>
                  <Label
                    style={{ fontSize: '18px', fontWeight: 'bold' }}
                    for="Salary"
                    for="Category"
                  >
                    Category
                  </Label>
                  <Input
                    type="select"
                    name="category"
                    id="exampleSelect"
                    onChange={this.handleChange}
                  >
                    <option>Internship</option>
                    <option>Engineer</option>
                  </Input>
                </div>
              </FormGroup>
              <FormGroup />
              <FormGroup
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div style={{ width: '45%' }}>
                  <Label
                    style={{ fontSize: '18px', fontWeight: 'bold' }}
                    for="Position"
                  >
                    Position
                  </Label>
                  <Input
                    type="text"
                    name="position"
                    onChange={this.handleChange}
                  />
                  {formError.position !== '' && this.state.showErrorMessage && (
                    <span style={{ color: 'red' }}>{formError.position}</span>
                  )}
                </div>
                <div style={{ width: '45%' }}>
                  <Label
                    style={{ fontSize: '18px', fontWeight: 'bold' }}
                    for="Status"
                  >
                    Status
                  </Label>
                  <Input
                    type="select"
                    name="status"
                    id="exampleSelect"
                    onChange={this.handleChange}
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                  </Input>
                </div>
              </FormGroup>
              <FormGroup>
                <Label
                  style={{ fontSize: '18px', fontWeight: 'bold' }}
                  for="Salary"
                >
                  Salary
                </Label>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div style={{ width: '45%' }}>
                    <Label for="SalaryBegin">From</Label>
                    <InputGroup>
                      <Input
                        type="number"
                        name="salaryBegin"
                        onChange={this.handleChange}
                        min="0"
                        onKeyPress={this.handlePossitiveNumber.bind(this)}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText style={{ marginTop: '-1px' }}>
                          $
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {formError.salaryBegin !== '' &&
                      this.state.showErrorMessage && (
                        <span style={{ color: 'red' }}>
                          {formError.salaryBegin}
                        </span>
                      )}
                  </div>
                  <div style={{ width: '45%' }}>
                    <Label for="SalaryEnd">To</Label>
                    <InputGroup>
                      <Input
                        type="number"
                        name="salaryEnd"
                        onChange={this.handleChange}
                        min="0"
                        onKeyPress={this.handlePossitiveNumber.bind(this)}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText style={{ marginTop: '-1px' }}>
                          $
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {formError.salaryEnd !== '' &&
                      this.state.showErrorMessage && (
                        <span style={{ color: 'red' }}>
                          {formError.salaryEnd}
                        </span>
                      )}
                  </div>
                </div>
              </FormGroup>
              <FormGroup
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div style={{ width: '45%' }}>
                  <Label
                    style={{ fontSize: '18px', fontWeight: 'bold' }}
                    for="Status"
                  >
                    Experience
                  </Label>
                  <Input
                    type="select"
                    name="experience"
                    id="exampleSelect"
                    onChange={this.handleChange}
                  >
                    <option>1 year</option>
                    <option>2 years</option>
                    <option>3 years</option>
                    <option>4 years</option>
                    <option>5 years</option>
                    <option>More than 5 years</option>
                  </Input>
                </div>
                <div style={{ width: '45%' }}>
                  <Label
                    style={{ fontSize: '18px', fontWeight: 'bold' }}
                    for="Amount"
                  >
                    Amount
                  </Label>
                  <Input
                    type="number"
                    name="amount"
                    onChange={this.handleChange}
                    min="1"
                    onKeyPress={this.handlePossitiveNumber.bind(this)}
                  />
                  {formError.amount !== '' && this.state.showErrorMessage && (
                    <span style={{ color: 'red' }}>{formError.amount}</span>
                  )}
                </div>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            {formError.name == '' &&
            formError.position == '' &&
            formError.amount == '' &&
            formError.salaryBegin == '' &&
            formError.salaryEnd == '' ? (
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
