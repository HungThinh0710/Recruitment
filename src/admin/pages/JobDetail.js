import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardImg,
  Button,
  CardText,
  Row,
  Col,
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from 'reactstrap';
import { MdSettings, MdMap, MdBook, MdCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './AddNewJobPage.css';
import './JobDetail.css';
const cutStringSalary = (s, i) => {
  return s.substr(0, i);
};
const removeStringSalary = (s, i) => {
  return s.substr(i + 4);
};
export default class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      name: '',
      description: '',
      category: '',
      address: '',
      position: '',
      salary: '',
      status: '',
      experience: '',
      amount: '',
      publishedOn: '',
      deadline: '',
      editname: '',
      editdescription: '',
      editcategory: '',
      editaddress: '',
      editposition: '',
      editsalary: '',
      editsalaryBegin: '',
      editsalaryEnd: '',
      editexperience: '',
      editamount: '',
      editpublishedOn: '',
      editdeadline: '',
      loading: true,
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
      modalError: false,
      modalSuccess: false,
      errorData: '',
      showErrorMessage: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
  }
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/login');
    }
  }
  async componentDidMount() {
    const { id } = this.props.match.params;
    var url = 'https://api.enclavei3dev.tk/api/job/' + id;
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    console.log(data);
    
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
          salary: data.salary,
          status: data.status,
          experience: data.experience,
          amount: data.amount,
          publishedOn: data.publishedOn,
          deadline: data.deadline,
          editname: data.name,
          editdescription: data.description,
          editcategory: data.category,
          editaddress: data.address,
          editposition: data.position,
          editsalaryBegin: cutStringSalary(data.salary, n),
          editsalaryEnd: cutStringSalary(stringSalary2, m),
          editstatus: data.status,
          editexperience: data.experience,
          editamount: data.amount,
          editpublishedOn: new Date(data.publishedOn),
          editdeadline: new Date(data.deadline),
          loading: false
        });
      }, 500);
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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

  backToPreviousPage = () => {
    this.props.history.push('/dashboard/job');
  };

  handleErrorMessage = () => {
    this.setState({
      showErrorMessage: true
    });
  };

  handlePossitiveNumber(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (/\+|-/.test(keyValue)) event.preventDefault();
  }

  handleChangeDatePublishPicker(date) {
    this.setState({
      editpublishedOn: date
    });
  }
  handleChangeDateDeadlinePicker(date) {
    this.setState({
      editdeadline: date
    });
  }

  handleChange(event) {
    var { formError } = this.state;
    switch (event.target.name) {
      case 'editname':
        if (event.target.value.length === 0) {
          formError.name = 'Name is required';
        } else {
          formError.name = '';
        }
        break;
      case 'editpublishedOn':
        if (event.target.value.length === 0) {
          formError.publishedOn = 'Published date is required';
        } else {
          formError.publishedOn = '';
        }
        break;
      case 'editdeadline':
        if (event.target.value.length === 0) {
          formError.deadline = 'Closed date is required';
        } else {
          formError.deadline = '';
        }
        break;
      case 'editposition':
        if (event.target.value.length === 0) {
          formError.position = 'Position is required';
        } else {
          formError.position = '';
        }
        break;
      case 'editamount':
        if (event.target.value.length === 0) {
          formError.amount = 'Amount is required';
        } else {
          formError.amount = '';
        }
        break;
      case 'editsalaryBegin':
        if (event.target.value.length === 0) {
          formError.salaryBegin = 'Starting salary is required';
        } else {
          formError.salaryBegin = '';
        }
        this.setState({
          editsalaryBegin: event.target.value
        });
        break;
      case 'editsalaryEnd':
        if (event.target.value.length === 0) {
          formError.salaryEnd = '';
        } else if (event.target.value.length !== 0) {
          if (
            parseInt(event.target.value, 10) <
            parseInt(this.state.editsalaryBegin, 10)
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

  handleSubmit = () => {
    const { id } = this.props.match.params;
    const {
      editname,
      editdescription,
      editaddress,
      editposition,
      editsalaryEnd,
      editsalaryBegin,
      editstatus,
      editexperience,
      editamount,
      editpublishedOn,
      editdeadline
    } = this.state;
    const publishedOnFormat = moment(editpublishedOn).format();
    const deadlineFormat = moment(editdeadline).format();
    const i = publishedOnFormat.indexOf('T');
    const j = deadlineFormat.indexOf('T');
    const newDateString = (s, i) => {
      return s.substr(0, i) + ' ' + s.substr(i + 1, 8);
    };

    var salary = '';
    var exp = 0;
    if (editsalaryEnd !== '') {
      if (editsalaryBegin === editsalaryEnd) {
        salary = editsalaryBegin + '$';
      } else {
        salary = editsalaryBegin + '$ - ' + editsalaryEnd + '$';
      }
    } else {
      salary = editsalaryBegin + '$';
    }
    switch (editexperience) {
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
        name: editname,
        description: editdescription,
        address: editaddress,
        position: editposition,
        salary: salary,
        status: editstatus,
        experience: exp,
        amount: editamount,
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
          this.toggleModalSuccess();
          this.setState({
            modalError: false,
            modalSuccess: true
          });
          res.json().then(data => {
            this.setState({
              name: editname,
              description: editdescription,
              address: editaddress,
              position: editposition,
              salary: salary,
              status: editstatus,
              experience: editexperience,
              amount: editamount,
              publishedOn: newDateString(publishedOnFormat, i),
              deadline: newDateString(deadlineFormat, j)
            });
          });
        }
      })
      .catch(error => console.error('Error:', error));
  };

  render() {
    var i = 0;
    const { formError } = this.state;
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
            className="dashboard-modal-header"
          >
            <span className="dashboard-modal-header">Notification</span>
          </ModalHeader>
          <ModalBody>
            <span style={{ color: '#45b649' }}>Updated succesfully</span>
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
            className="dashboard-modal-header"
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
          job's information
        </CardHeader>
        {this.state.loading ? (
          <div
            style={{
              marginTop: '100px',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '100px'
            }}
            className="sweet-loading"
          >
            <PulseLoader
              sizeUnit={'px'}
              size={15}
              color={'#45b649'}
              loading={this.state.loading}
            />
          </div>
        ) : (
          <CardBody>
            <Container>
              <Row style={{ justifyContent: 'center' }}>
                <div className="table-test" style={{ width: '100%' }}>
                  <table style={{ width: '100%' }}>
                    <tbody style={{ width: '100%' }}>
                      <tr className="job-title3" key={1}>
                        <td className="job-title">Name</td>
                        <td className="job-title1">{this.state.name}</td>
                      </tr>
                      <tr className="job-title3" key={2}>
                        <td className="job-title">Description</td>
                        <td className="job-title1">{this.state.description}</td>
                      </tr>
                      <tr className="job-title3" key={3}>
                        <td className="job-title">Address</td>
                        <td className="job-title1">{this.state.address}</td>
                      </tr>
                      <tr className="job-title3" key={4}>
                        <td className="job-title">Category</td>
                        <td className="job-title1">{this.state.category}</td>
                      </tr>
                      <tr className="job-title3" key={5}>
                        <td className="job-title">Position</td>
                        <td className="job-title1">{this.state.position}</td>
                      </tr>
                      <tr className="job-title3" key={6}>
                        <td className="job-title">Salary</td>
                        <td className="job-title1">{this.state.salary}</td>
                      </tr>
                      <tr className="job-title3" key={7}>
                        <td className="job-title">Status</td>
                        <td className="job-title1">{this.state.status}</td>
                      </tr>
                      <tr className="job-title3" key={8}>
                        <td className="job-title">Experience</td>
                        <td className="job-title1">{this.state.experience}</td>
                      </tr>
                      <tr className="job-title3" key={9}>
                        <td className="job-title">Amount</td>
                        <td className="job-title1">{this.state.amount}</td>
                      </tr>
                      <tr className="job-title3" key={10}>
                        <td className="job-title">Publised On</td>
                        <td className="job-title1">{this.state.publishedOn}</td>
                      </tr>
                      <tr className="job-title3" key={11}>
                        <td className="job-title">Deadline</td>
                        <td className="job-title1">{this.state.deadline}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Row>
              <br />
              <Row>
                <div className="job-tabs">
                  <Nav tabs>
                    <NavItem style={{ width: '150px' }}>
                      <NavLink
                        className={classnames({
                          jobtabactive: this.state.activeTab === '1'
                        })}
                        onClick={() => {
                          this.toggle('1');
                        }}
                      >
                        <MdBook style={{ marginRight: '5px' }} />
                        Articles
                      </NavLink>
                    </NavItem>
                    <NavItem style={{ width: '150px' }}>
                      <NavLink
                        className={classnames({
                          jobtabactive: this.state.activeTab === '2'
                        })}
                        onClick={() => {
                          this.toggle('2');
                        }}
                      >
                        <MdMap style={{ marginRight: '5px' }} />
                        Candidates
                      </NavLink>
                    </NavItem>
                    <NavItem style={{ width: '150px' }}>
                      <NavLink
                        className={classnames({
                          jobtabactive: this.state.activeTab === '3'
                        })}
                        onClick={() => {
                          this.toggle('3');
                        }}
                      >
                        <MdSettings style={{ marginRight: '5px' }} />
                        Update
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Row>
              <br />
              <br />
              <Row>
                <TabContent
                  style={{ width: '100%' }}
                  activeTab={this.state.activeTab}
                >
                  <TabPane tabId="1">
                    <Row>
                      <Col>
                        <Card>
                          <CardImg
                            top
                            width="100%"
                            src="https://loremflickr.com/320/240"
                            alt="Card image cap"
                          />
                          <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardSubtitle>Card subtitle</CardSubtitle>
                            <CardText>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </CardText>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col>
                        <Card>
                          <CardImg
                            top
                            width="100%"
                            src="https://loremflickr.com/320/240/paris"
                            alt="Card image cap"
                          />
                          <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardSubtitle>Card subtitle</CardSubtitle>
                            <CardText>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </CardText>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col>
                        <Card>
                          <CardImg
                            top
                            width="100%"
                            src="https://loremflickr.com/320/240/brazil"
                            alt="Card image cap"
                          />
                          <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardSubtitle>Card subtitle</CardSubtitle>
                            <CardText>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </CardText>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col>
                        <Card>
                          <CardImg
                            top
                            width="100%"
                            src="https://loremflickr.com/320/240/dog"
                            alt="Card image cap"
                          />
                          <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardSubtitle>Card subtitle</CardSubtitle>
                            <CardText>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </CardText>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col>
                        <Card>
                          <CardImg
                            top
                            width="100%"
                            src="https://loremflickr.com/320/240/cat"
                            alt="Card image cap"
                          />
                          <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardSubtitle>Card subtitle</CardSubtitle>
                            <CardText>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </CardText>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col>
                        <Card>
                          <CardImg
                            top
                            width="100%"
                            src="https://loremflickr.com/320/240/rio"
                            alt="Card image cap"
                          />
                          <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardSubtitle>Card subtitle</CardSubtitle>
                            <CardText>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </CardText>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Col>
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
                              name="editname"
                              onChange={this.handleChange}
                              value={this.state.editname}
                            />
                            {formError.name !== '' &&
                              this.state.showErrorMessage && (
                                <span style={{ color: 'red' }}>
                                  {formError.name}
                                </span>
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
                              style={{ width: '100%' }}
                              name="editdescription"
                              onChange={this.handleChange}
                              value={this.state.editdescription}
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
                                    selected={this.state.editpublishedOn}
                                    onChange={this.handleChangeDatePublishPicker.bind(
                                      this
                                    )}
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
                                    selected={this.state.editdeadline}
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
                                name="editaddress"
                                value={this.state.editaddress}
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
                                name="editcategory"
                                value={this.state.editcategory}
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
                                name="editposition"
                                onChange={this.handleChange}
                                value={this.state.editposition}
                              />
                              {formError.position !== '' &&
                                this.state.showErrorMessage && (
                                  <span style={{ color: 'red' }}>
                                    {formError.position}
                                  </span>
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
                                name="editstatus"
                                value={this.state.editstatus}
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
                                    name="editsalaryBegin"
                                    onChange={this.handleChange}
                                    value={this.state.editsalaryBegin}
                                    onKeyPress={this.handlePossitiveNumber.bind(
                                      this
                                    )}
                                  />
                                  <InputGroupAddon addonType="append">
                                    <InputGroupText
                                      style={{ marginTop: '-1px' }}
                                    >
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
                                    name="editsalaryEnd"
                                    onChange={this.handleChange}
                                    value={this.state.editsalaryEnd}
                                    onKeyPress={this.handlePossitiveNumber.bind(
                                      this
                                    )}
                                  />
                                  <InputGroupAddon addonType="append">
                                    <InputGroupText
                                      style={{ marginTop: '-1px' }}
                                    >
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
                                name="editexperience"
                                value={this.state.editexperience}
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
                                name="editamount"
                                onChange={this.handleChange}
                                value={this.state.editamount}
                                onKeyPress={this.handlePossitiveNumber.bind(
                                  this
                                )}
                              />
                              {formError.amount !== '' &&
                                this.state.showErrorMessage && (
                                  <span style={{ color: 'red' }}>
                                    {formError.amount}
                                  </span>
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
                                width: '160px',
                                display: 'flex',
                                justifyContent: 'space-between'
                              }}
                            >
                              {formError.name == '' &&
                              formError.position == '' &&
                              formError.amount == '' &&
                              formError.salaryBegin == '' &&
                              formError.salaryEnd == '' ? (
                                <Button
                                  color="success"
                                  onClick={this.handleSubmit}
                                >
                                  Submit
                                </Button>
                              ) : (
                                <Button
                                  color="success"
                                  onClick={this.handleErrorMessage}
                                >
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
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </Row>
            </Container>
            {this.state.activeTab !== '3' && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '20px'
                }}
              >
                <Button
                  onClick={() => this.backToPreviousPage()}
                  color="secondary"
                >
                  Back
                </Button>
              </div>
            )}
          </CardBody>
        )}
      </Card>
    );
  }
}
