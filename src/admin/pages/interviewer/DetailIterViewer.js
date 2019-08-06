import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Row,
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap';
import { MdBook, MdCancel, MdPageview, MdSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import 'react-datepicker/dist/react-datepicker.css';
import classnames from 'classnames';
import '../JobDetail.css';
import TechnicalSkill from '../../components/TechnicalSkill';
const fullNameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
export default class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      fullname: '',
      email: '',
      phone: '',
      address: '',
      interviews: [],
      technicalSkill: [],
      loading: true,
      editFullname: '',
      editEmail: '',
      editPhone: '',
      editAddress: '',
      formError: {
        fullname: '',
        email: '',
        phone: ''
      },
      amountTechnicalSkills: 0,
      arrayTechnicalSkillComponents: [],
      dataTechnicalSkills: [],
      image: '',
      errorData: '',
      modalError: false,
      modalSuccess: false,
      showErrorMessage: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
    this.handleErrorMessage = this.handleErrorMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/login');
    }
  }
  async componentDidMount() {
    const { id } = this.props.match.params;
    const { dataTechnicalSkills } = this.state;
    var j = -1;
    var url = 'https://api.enclavei3dev.tk/api/interviewer/' + id;
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    data.technicalSkill.map(e => {
      dataTechnicalSkills.push(e.name + '-' + e.year);
      return dataTechnicalSkills;
    });
    setTimeout(() => {
      this.setState({
        fullname: data.fullname,
        editFullname: data.fullname,
        address: data.address,
        editAddress: data.address,
        email: data.email,
        editEmail: data.email,
        phone: data.phone,
        editPhone: data.phone,
        technicalSkill: data.technicalSkill,
        amountTechnicalSkills: data.technicalSkill.length,
        interviews: data.interviews,
        loading: false,
        arrayTechnicalSkillComponents: data.technicalSkill.map(e => {
          j++;
          return (
            <TechnicalSkill
              key={j}
              function={this.getDataTechnicalSkill.bind(this)}
              functionGetElement={this.removeTechnicalSkill.bind(this)}
              id={j}
              data={e}
              isDeleted={true}
            />
          );
        }),
        dataTechnicalSkills: dataTechnicalSkills
      });
    }, 500);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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

  backToPreviousPage = () => {
    this.props.history.push('/dashboard/interviewer');
  };

  handleChange(event) {
    var { formError } = this.state;
    switch (event.target.name) {
      case 'editFullname':
        if (event.target.value.length === 0) {
          formError.fullname = 'Full name is required';
        } else {
          fullNameRegex.test(event.target.value)
            ? (formError.fullname = '')
            : (formError.fullname =
                'Full name cannot contain the number/special characters');
        }
        break;
      case 'editEmail':
        if (event.target.value.length === 0) {
          formError.email = 'Email is required';
        } else {
          emailRegex.test(event.target.value)
            ? (formError.email = '')
            : (formError.email = 'Invalid Email');
        }
        break;
      case 'editPhone':
        if (event.target.value.length === 0) {
          formError.phone = 'Phone number is required';
        } else if (event.target.value.length < 10) {
          if (isNaN(Number(event.target.value))) {
            formError.phone = 'Phone number cannot contain the letter';
          } else {
            formError.phone = 'Phone number must have at least 10 characters';
          }
        } else {
          if (isNaN(Number(event.target.value))) {
            formError.phone = 'Phone number cannot contain the letter';
          } else {
            formError.phone = '';
          }
        }
        break;
    }
    this.setState({
      [event.target.name]: event.target.value,
      formError: {
        fullname: formError.fullname,
        email: formError.email,
        phone: formError.phone
      }
    });
  }

  handleSubmit() {
    const {
      dataTechnicalSkills,
      editFullname,
      editAddress,
      editEmail,
      editPhone
    } = this.state;
    const { id } = this.props.match.params;
    var array = [];
    dataTechnicalSkills.map(e => {
      if (typeof e == 'string') array.push(e);
      return array;
    });
    var arrayString = array.toString();
    var url = 'https://api.enclavei3dev.tk/api/interviewer/' + id;
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        fullname: editFullname,
        email: editEmail,
        phone: editPhone,
        address: editAddress,
        technicalSkill: arrayString
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
          var url = 'https://api.enclavei3dev.tk/api/interviewer/' + id;
          fetch(url, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }
          }).then(response => {
            response.json().then(data => {
              this.setState({
                fullname: editFullname,
                email: editEmail,
                address: editAddress,
                phone: editPhone,
                technicalSkill: data.technicalSkill
              });
            });
          });
        }
      })
      .catch(error => console.error('Error:', error));
  }

  getDataTechnicalSkill(technicalskill, year, id) {
    var { dataTechnicalSkills } = this.state;
    if (technicalskill && year) {
      var tech = technicalskill.value + '-' + year;
      if (!dataTechnicalSkills[id]) {
        dataTechnicalSkills.push(tech);
      } else {
        dataTechnicalSkills[id] = tech;
      }
      this.setState({
        dataTechnicalSkills: dataTechnicalSkills
      });
    }
  }

  removeTechnicalSkill(element, id) {
    var {
      dataTechnicalSkills,
      arrayTechnicalSkillComponents,
      amountTechnicalSkills
    } = this.state;
    dataTechnicalSkills.splice(id, 1, 0);
    element.remove();
    this.setState({
      dataTechnicalSkills: dataTechnicalSkills,
      arrayTechnicalSkillComponents: arrayTechnicalSkillComponents,
      amountTechnicalSkills: amountTechnicalSkills
    });
  }

  createTechnicalSkill = () => {
    var { amountTechnicalSkills, arrayTechnicalSkillComponents } = this.state;
    amountTechnicalSkills = amountTechnicalSkills + 1;
    arrayTechnicalSkillComponents = [];
    for (var j = 0; j < amountTechnicalSkills; j++) {
      arrayTechnicalSkillComponents.push(
        <TechnicalSkill
          key={j}
          function={this.getDataTechnicalSkill.bind(this)}
          functionGetElement={this.removeTechnicalSkill.bind(this)}
          id={j}
          isDeleted={true}
        />
      );
    }
    this.setState({
      amountTechnicalSkills: amountTechnicalSkills,
      arrayTechnicalSkillComponents: arrayTechnicalSkillComponents
    });
  };

  render() {
    var i = 0;
    const { dataTechnicalSkills, formError } = this.state;
    var string = '';
    {
      this.state.technicalSkill.map(e => {
        string += e.name + ': ' + e.year + ' years; ';
        return string;
      });
    }
    var length = string.length;
    var newString = string.slice(0, length - 2);
    var array = [];
    dataTechnicalSkills.map(e => {
      if (typeof e == 'string') array.push(e);
      return array;
    });
    var errorTechnicalSkillMessage = '';
    array.length === 0
      ? (errorTechnicalSkillMessage = 'Technical skill is required')
      : (errorTechnicalSkillMessage = '');
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
            <span style={{ color: 'green' }}>Update Successfully</span>
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
          Interviewer's information
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
                        <td className="job-title">Fullname</td>
                        <td className="job-title1">{this.state.fullname}</td>
                      </tr>
                      <tr className="job-title3" key={2}>
                        <td className="job-title">Address</td>
                        <td className="job-title1">{this.state.address}</td>
                      </tr>
                      <tr className="job-title3" key={3}>
                        <td className="job-title">Email</td>
                        <td className="job-title1">{this.state.email}</td>
                      </tr>

                      <tr className="job-title3" key={4}>
                        <td className="job-title">Phone</td>
                        <td className="job-title1">{this.state.phone}</td>
                      </tr>
                      <tr className="job-title3" key={5}>
                        <td className="job-title">Skill</td>
                        <td className="job-title1">
                          <span>{newString}</span>
                        </td>
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
                        Interviews
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
                        <MdSettings style={{ marginRight: '5px' }} />
                        Update
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Row>
              <Row>
                <TabContent
                  style={{ width: '100%' }}
                  activeTab={this.state.activeTab}
                >
                  <TabPane tabId="1">
                    <CardBody style={{ paddingLeft: 0, paddingRight: 0 }}>
                      <div className="table-test">
                        <table style={{ width: '100%' }}>
                          <thead>
                            <tr
                              style={{
                                background:
                                  '#45b649 linear-gradient(180deg, #61c164, #45b649) repeat-x',
                                color: 'white'
                              }}
                            >
                              <th className="title1">#</th>
                              <th className="title1">Fullname</th>
                              <th className="title1">Address</th>
                              <th className="title1">Start</th>
                              <th className="title1">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.interviews.map(e => {
                              if (e.status == '1') {
                                e.status = 'Pending';
                              }
                              if (e.status == '2') {
                                e.status = 'Opening';
                              }
                              if (e.status == '3') {
                                e.status = 'Closed';
                              }
                              if (e.address == '2-1') {
                                e.address = 'Floor 2 - 453-455 Hoang Dieu Str';
                              }
                              if (e.address == '3-1') {
                                e.address = 'Floor 3 - 453-455 Hoang Dieu Str';
                              }
                              if (e.address == '4-1') {
                                e.address = 'Floor 4 - 453-455 Hoang Dieu Str';
                              }
                              if (e.address == '5-1') {
                                e.address = 'Floor 5 - 453-455 Hoang Dieu Str';
                              }
                              if (e.address == '2-2') {
                                e.address = 'Floor 2 - 117 Nguyen Huu Tho Str';
                              }
                              if (e.address == '3-2') {
                                e.address = 'Floor 3 - 117 Nguyen Huu Tho Str';
                              }
                              if (e.address == '4-2') {
                                e.address = 'Floor 4 - 117 Nguyen Huu Tho Str';
                              }
                              if (e.address == '5-2') {
                                e.address = 'Floor 5 - 117 Nguyen Huu Tho Str';
                              }
                              i++;
                              let url = '/dashboard/candidate/' + e.id;
                              return (
                                <tr style={{ textAlign: 'center' }} key={e.id}>
                                  <td className="title1">{i}</td>
                                  <td className="title1">{e.name}</td>
                                  <td className="title1">{e.address}</td>
                                  <td className="title1">{e.timeStart}</td>
                                  <td className="title1">{e.status}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </CardBody>
                  </TabPane>
                  <TabPane tabId="2">
                    <Form>
                      <br />
                      <br />
                      <Row>
                        <Col xs="4">
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              flexDirection: 'column'
                            }}
                          >
                            <img
                              src="/admin/img/Default-avatar.png"
                              style={{ width: '200px' }}
                            />
                            <br />
                            <Input
                              type="file"
                              name="image"
                              style={{ padding: '5px' }}
                              onChange={this.handleChange}
                            />
                          </div>
                        </Col>
                        <Col xs="8">
                          <FormGroup>
                            <Label className="title-input" for="exampleName">
                              Fullname
                            </Label>
                            <Input
                              type="text"
                              name="editFullname"
                              onChange={this.handleChange}
                              value={this.state.editFullname}
                            />
                            {formError.fullname !== '' &&
                              this.state.showErrorMessage && (
                                <span style={{ color: 'red' }}>
                                  {formError.fullname}
                                </span>
                              )}
                          </FormGroup>
                          <FormGroup>
                            <Label
                              className="title-input"
                              for="exampleDescription"
                            >
                              Email
                            </Label>
                            <Input
                              type="email"
                              name="editEmail"
                              onChange={this.handleChange}
                              value={this.state.editEmail}
                            />
                            {formError.email !== '' &&
                              this.state.showErrorMessage && (
                                <span style={{ color: 'red' }}>
                                  {formError.email}
                                </span>
                              )}
                          </FormGroup>
                          <FormGroup>
                            <Label
                              className="title-input"
                              for="exampleDescription"
                            >
                              Phone
                            </Label>
                            <Input
                              type="text"
                              name="editPhone"
                              onChange={this.handleChange}
                              value={this.state.editPhone}
                            />

                            {formError.phone !== '' &&
                              this.state.showErrorMessage && (
                                <span style={{ color: 'red' }}>
                                  {formError.phone}
                                </span>
                              )}
                          </FormGroup>
                          <FormGroup>
                            <Label
                              className="title-input"
                              for="exampleDescription"
                            >
                              Address
                            </Label>
                            <Input
                              type="text"
                              name="editAddress"
                              value={this.state.editAddress}
                              onChange={this.handleChange}
                            />
                          </FormGroup>
                          <FormGroup>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <Label
                                className="title-input"
                                for="exampleDescription"
                              >
                                Technical skill{' '}
                                <Button
                                  onClick={() => this.createTechnicalSkill()}
                                  style={{
                                    fontSize: '15px',
                                    padding: '0px 6px',
                                    marginLeft: '10px'
                                  }}
                                >
                                  +
                                </Button>
                              </Label>
                            </div>
                            {this.state.arrayTechnicalSkillComponents.map(
                              e => e
                            )}
                            {errorTechnicalSkillMessage != '' &&
                              this.state.showErrorMessage && (
                                <span style={{ color: 'red' }}>
                                  {errorTechnicalSkillMessage}
                                </span>
                              )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <br />
                      <FormGroup
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end'
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            width: '160px',
                            justifyContent: 'space-between'
                          }}
                        >
                          {errorTechnicalSkillMessage == '' &&
                          formError.fullname == '' &&
                          formError.phone == '' &&
                          formError.email == '' ? (
                            <Button color="success" onClick={this.handleSubmit}>
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
                  </TabPane>
                </TabContent>
              </Row>
            </Container>
            {this.state.activeTab == '1' && (
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
