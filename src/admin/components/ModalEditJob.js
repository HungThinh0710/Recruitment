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
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from 'reactstrap';
import { MdEdit } from 'react-icons/md';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
const animatedComponents = makeAnimated();

const cutStringSalary = (s, i) => {
  return s.substr(0, i);
};
const removeStringSalary = (s, i) => {
  return s.substr(i + 4);
};

export default class ModalEditJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      category: '',
      address: '',
      position: '',
      salary: '',
      salaryBegin: '',
      salaryEnd: '',
      experience: '',
      amount: '',
      publishedOn: '',
      deadline: '',
      formError: {
        name: '',
        position: '',
        salary: '',
        publishedOn: '',
        deadline: '',
        amount: '',
        salaryBegin: '',
        salaryEnd: ''
      },
      modal: false,
      modalError: false,
      modalSuccess: false,
      errorData: '',
      showErrorMessage: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
    this.handleErrorMessage = this.handleErrorMessage.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props;
    var url = 'https://api.enclavei3dev.tk/api/job/' + id;
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    if (data.message !== 'Unauthenticated.') {
      const n = data.salary.indexOf('$');
      const stringSalary2 = removeStringSalary(data.salary, n);
      const m = stringSalary2.indexOf('$');
      setTimeout(() => {
        this.setState({
          name: data.name,
          description: data.description,
          category: data.category,
          address: data.address,
          position: data.position,
          salaryBegin: cutStringSalary(data.salary, n),
          salaryEnd: cutStringSalary(stringSalary2, m),
          status: data.status,
          experience: data.experience,
          amount: data.amount,
          publishedOn: new Date(data.publishedOn),
          deadline: new Date(data.deadline)
        });
      }, 500);
    }
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

  handleSubmit() {
    const { id } = this.props;
    const {
      name,
      description,
      address,
      position,
      salaryEnd,
      salaryBegin,
      status,
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
    var url = 'https://api.enclavei3dev.tk/api/job/' + id;
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        name: name,
        description: description,
        address: address,
        position: position,
        salary: salary,
        status: status,
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
          alert('Update Failed');
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

  handlePossitiveNumber(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (/\+|-/.test(keyValue)) event.preventDefault();
  }

  handleChangeDatePublishPicker(date) {
    this.setState({
      publishedOn: date
    });
  }

  handleErrorMessage = () => {
    this.setState({
      showErrorMessage: true
    });
  };

  handleChangeDateDeadlinePicker(date) {
    this.setState({
      deadline: date
    });
  }

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
            <span className="dashboard-modal-header">Update Job</span>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}
                  for="Name"
                >
                  Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
                {formError.name !== '' && this.state.showErrorMessage && (
                  <span style={{ color: 'red' }}>{formError.name}</span>
                )}
              </FormGroup>
              <FormGroup>
                <Label
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}
                  for="Description"
                >
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
                <Label
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}
                  for="time"
                >
                  Time
                </Label>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
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
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ width: '45%' }}>
                  <Label
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}
                    for="Address"
                  >
                    Address
                  </Label>
                  <Input
                    type="select"
                    name="address"
                    value={this.state.address}
                    onChange={this.handleChange}
                  >
                    <option>453-455 Hoang Dieu</option>
                    <option>117 Nguyen Huu Tho</option>
                  </Input>
                </div>
                <div style={{ width: '45%' }}>
                  <Label
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}
                    for="Category"
                  >
                    Category
                  </Label>
                  <Input
                    type="select"
                    name="category"
                    value={this.state.category}
                    onChange={this.handleChange}
                  >
                    <option>Internship</option>
                    <option>Engineer</option>
                  </Input>
                </div>
              </FormGroup>
              <FormGroup
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ width: '45%' }}>
                  <Label
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}
                    for="Position"
                  >
                    Position
                  </Label>
                  <Input
                    type="text"
                    name="position"
                    onChange={this.handleChange}
                    value={this.state.position}
                  />
                  {formError.position !== '' && this.state.showErrorMessage && (
                    <span style={{ color: 'red' }}>{formError.position}</span>
                  )}
                </div>
                <div style={{ width: '45%' }}>
                  <Label
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}
                    for="Status"
                  >
                    Status
                  </Label>
                  <Input
                    type="select"
                    name="status"
                    value={this.state.status}
                    onChange={this.handleChange}
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                  </Input>
                </div>
              </FormGroup>
              <FormGroup>
                <Label
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}
                  for="Salary"
                >
                  Salary
                </Label>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ width: '45%' }}>
                    <Label for="SalaryBegin">From</Label>
                    <InputGroup>
                      <Input
                        type="number"
                        name="salaryBegin"
                        onChange={this.handleChange}
                        value={this.state.salaryBegin}
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
                        value={this.state.salaryEnd}
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
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ width: '45%' }}>
                  <Label
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}
                    for="Status"
                  >
                    Experience
                  </Label>
                  <Input
                    type="select"
                    name="experience"
                    value={this.state.experience}
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
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}
                    for="Amount"
                  >
                    Amount
                  </Label>
                  <Input
                    type="number"
                    name="amount"
                    onChange={this.handleChange}
                    value={this.state.amount}
                    onKeyPress={this.handlePossitiveNumber.bind(this)}
                  />
                  {formError.amount !== '' && this.state.showErrorMessage && (
                    <span style={{ color: 'red' }}>{formError.amount}</span>
                  )}
                </div>
              </FormGroup>
              <br />
              <FormGroup
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <div
                  style={{
                    width: '180px',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  {formError.name == '' &&
                  formError.position == '' &&
                  formError.amount == '' &&
                  formError.salaryBegin == '' &&
                  formError.salaryEnd == '' ? (
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
