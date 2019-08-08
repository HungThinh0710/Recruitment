import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardImg,
  Button,
  Badge,
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
  ModalBody,
  ModalFooter,
  ModalHeader,
  CardHeader
} from 'reactstrap';
import classnames from 'classnames';
import { NumberWidget } from '../components/Widget';
import { MdSettings, MdMap, MdBook, MdCancel } from 'react-icons/md';
import './ProfilePage.css';
import { Link, Redirect } from 'react-router-dom';
import TabInformation from '../components/TabInformation';
import { PulseLoader } from 'react-spinners';

/*-------Regex----------*/
const fullNameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/*-------Regex----------*/
export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // activeTab: '1',
      activeTab: '1',
      articles: '',
      name: '',
      fullName: '',
      email: '',
      phone: '',
      address: '',
      image: '',
      editFullName: '',
      editEmail: '',
      editPhone: '',
      editAddress: '',
      editImage: '',
      old_password: '',
      password: '',
      password_confirmation: '',
      loading: true,
      formError: {
        fullname: '',
        email: '',
        phone: ''
      },
      formErrorPassword: {
        old_password: 'Current Password is required',
        password: 'Password is required',
        password_confirmation: 'Confirm password is required'
      },

      modalError: false,
      modalErrorPassword: false,
      modalSuccess: false,
      errorData: '',
      errorPassword: '',
      showErrorProfileMessage: false,
      showErrorPasswordMessage: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeProfile = this.handleChangeProfile.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
    this.toggleModalErrorPassword = this.toggleModalErrorPassword.bind(this);
    this.handleErrorProfileMessage = this.handleErrorProfileMessage.bind(this);
    this.handleErrorPasswordMessage = this.handleErrorPasswordMessage.bind(
      this
    );
  }
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/login');
    }
  }
  async componentDidMount() {
    //const {firstName, lastName, email} = this.state;
    var url = 'https://api.enclavei3dev.tk/api/current-profile';
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    if (data.message !== 'Unauthenticated.') {
      setTimeout(() => {
        this.setState({
          name: data.name,
          fullName: data.fullname,
          articles: data.articles,
          email: data.email,
          phone: data.phone,
          address: data.address,
          image: data.image,
          editFullName: data.fullname,
          editEmail: data.email,
          editPhone: data.phone,
          editAddress: data.address,
          editImage: data.image,
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
      modalSuccess: !prevState.modalSuccess,
      modalError: false,
      modalErrorPassword: false,
      errorData: '',
      errorPassword: ''
    }));
  }
  toggleModalError() {
    this.setState(prevState => ({
      modalError: !prevState.modalError,
      modalErrorPassword: false,
      modalSuccess: false,
      errorData: '',
      errorPassword: ''
    }));
  }

  toggleModalErrorPassword() {
    this.setState(prevState => ({
      modalErrorPassword: !prevState.modalErrorPassword,
      modalError: false,
      modalSuccess: false,
      errorData: '',
      errorPassword: ''
    }));
  }

  backToPreviousPage = () => {
    this.props.history.push('/dashboard/role');
  };

  changeProfile(fullName, email, phone, address) {
    this.setState({
      fullName: fullName,
      email: email,
      phone: phone,
      address: address
    });
  }

  handleChange(event) {
    var { formError, formErrorPassword } = this.state;
    switch (event.target.name) {
      case 'editFullName':
        if (event.target.value.length === 0) {
          formError.fullname = 'Full Name is required';
        } else {
          fullNameRegex.test(event.target.value)
            ? (formError.fullname = '')
            : (formError.fullname =
                'Full Name cannot contain the number/special characters');
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
      case 'old_password':
        if (event.target.value.length === 0) {
          formErrorPassword.old_password = 'Current Passowrd is required';
        } else {
          formErrorPassword.old_password = '';
        }
        break;
      case 'password':
        if (event.target.value.length === 0) {
          formErrorPassword.password = 'New Passowrd is required';
        } else {
          formErrorPassword.password = '';
          if (event.target.value != this.state.password_confirmation) {
            formErrorPassword.password_confirmation = 'Password does not match';
          } else {
            formErrorPassword.password_confirmation = '';
          }
        }
        break;
      case 'password_confirmation':
        if (event.target.value !== this.state.password) {
          formErrorPassword.password_confirmation = 'Password does not match';
        } else {
          formErrorPassword.password_confirmation = '';
        }
        break;
    }
    this.setState({
      [event.target.name]: event.target.value,
      formError: {
        fullname: formError.fullname,
        email: formError.email,
        phone: formError.phone
      },
      formErrorPassword: {
        old_password: formErrorPassword.old_password,
        password: formErrorPassword.password,
        password_confirmation: formErrorPassword.password_confirmation
      }
    });
  }
  handleErrorProfileMessage = () => {
    this.setState({
      showErrorProfileMessage: true
    });
  };

  handleErrorPasswordMessage = () => {
    this.setState({
      showErrorPasswordMessage: true
    });
  };

  handleChangeProfile() {
    const { editFullName, editEmail, editAddress, editPhone } = this.state;
    this.setState({
      modalError: false
    });
    var url = 'https://api.enclavei3dev.tk/api/profile';
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        fullname: editFullName,
        email: editEmail,
        phone: editPhone,
        address: editAddress
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
          res.json().then(data => {
            this.setState({
              fullName: editFullName,
              email: editEmail,
              phone: editPhone,
              address: editAddress,
              modalError: false,
              modalSuccess: true
            });
          });
        }
      })
      .catch(error => console.error('Error:', error));
  }

  handleChangePassword() {
    const { old_password, password, password_confirmation } = this.state;
    var url = 'https://api.enclavei3dev.tk/api/change-password';
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        old_password: old_password,
        password: password,
        password_confirmation: password_confirmation
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
          this.toggleModalErrorPassword();
          res.json().then(data => {
            this.setState({
              errorPassword: data.message
            });
          });
        }
        if (res.status === 200) {
          this.toggleModalSuccess();
          res.json().then(data => {
            this.setState({
              old_password: '',
              password: '',
              password_confirmation: '',
              modalErrorPassword: false,
              modalSuccess: true
            });

            // document.getElementById('change-password-form').remove();
          });
        }
      })
      .catch(error => console.error('Error:', error));
  }

  render() {
    var i = 0;
    const {
      name,
      fullName,
      email,
      phone,
      address,
      formError,
      password,
      password_confirmation,
      old_password,
      formErrorPassword
    } = this.state;
    return (
      <Card className="dashboard-card">
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
            <span style={{ color: '#45b649' }}>Update succesfully</span>
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

        {/*--------Modal-Error-----*/}
        <Modal
          isOpen={this.state.modalErrorPassword}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModalErrorPassword}>
            Notification
          </ModalHeader>
          <ModalBody>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: 'red' }}>{this.state.errorPassword}</span>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalErrorPassword}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/*--------Modal-Error-----*/}
        <CardHeader
          className="card-header-custom"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          User's Information
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
            <Container style={{ marginTop: '5%' }}>
              <Row>
                <Col xs="4">
                  <div style={{ overflow: 'hidden' }}>
                    <img
                      className="avatar"
                      src={
                        'https://api.enclavei3dev.tk/upload/images/avatars/' +
                        `${this.state.image}`
                      }
                      alt="Card image cap"
                    />
                  </div>
                </Col>
                <Col xs="auto" />
                <Col xs="6">
                  <TabInformation
                    name={name}
                    fullName={fullName}
                    phone={phone}
                    email={email}
                    address={address}
                  />
                </Col>
              </Row>
              <br />

              <br />
              <br />
              <Row>
                <Col>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          tabactive: this.state.activeTab === '1'
                        })}
                        onClick={() => {
                          this.toggle('1');
                        }}
                      >
                        <MdBook style={{ marginRight: '5px' }} />
                        Articles
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          tabactive: this.state.activeTab === '2'
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
                </Col>
              </Row>
              <br />
              <br />
              <TabContent activeTab={this.state.activeTab}>
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
                            <th className="title1">Title</th>
                            <th className="title1">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.articles.map(e => {
                            i++;
                            return (
                              <tr style={{ textAlign: 'center' }} key={e.id}>
                                <td className="title1">{i}</td>
                                <td className="title1">{e.title}</td>
                                {e.isPublic === 1 ? (
                                  <td className="title1 text-center">
                                    <Badge
                                      style={{
                                        backgroundColor: '#6a82fb',
                                        color: '#fff',
                                        width: 80,
                                        borderRadius: 4
                                      }}
                                      pill
                                    >
                                      Published
                                    </Badge>
                                  </td>
                                ) : (
                                  <td className="title1 text-center">
                                    <Badge
                                      style={{
                                        backgroundColor: '#dd2c00',
                                        color: '#fff',
                                        width: 80,
                                        borderRadius: 4
                                      }}
                                      pill
                                    >
                                      Closed
                                    </Badge>
                                  </td>
                                )}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <br />
                    </div>
                  </CardBody>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col>
                      <Card>
                        <CardBody>
                          <Form onSubmit={this.handleChangeProfile}>
                            <FormGroup>
                              <h4 style={{ fontWeight: 'bold' }}>Profile</h4>
                            </FormGroup>
                            <FormGroup>
                              <Label
                                style={{ fontWeight: 'bold' }}
                                for="Fullname"
                              >
                                Fullname
                              </Label>
                              <Input
                                type="text"
                                name="editFullName"
                                value={this.state.editFullName}
                                onChange={this.handleChange}
                              />
                              {formError.fullname !== '' &&
                                this.state.showErrorProfileMessage && (
                                  <span style={{ color: 'red' }}>
                                    {formError.fullname}
                                  </span>
                                )}
                            </FormGroup>
                            <FormGroup>
                              <Label style={{ fontWeight: 'bold' }} for="Email">
                                Email
                              </Label>
                              <Input
                                type="email"
                                name="editEmail"
                                value={this.state.editEmail}
                                onChange={this.handleChange}
                              />
                              {formError.email !== '' &&
                                this.state.showErrorProfileMessage && (
                                  <span style={{ color: 'red' }}>
                                    {formError.email}
                                  </span>
                                )}
                            </FormGroup>
                            <FormGroup>
                              <Label for="Phone" style={{ fontWeight: 'bold' }}>
                                Phone
                              </Label>
                              <Input
                                type="text"
                                name="editPhone"
                                value={this.state.editPhone}
                                onChange={this.handleChange}
                              />
                              {formError.phone !== '' &&
                                this.state.showErrorProfileMessage && (
                                  <span style={{ color: 'red' }}>
                                    {formError.phone}
                                  </span>
                                )}
                            </FormGroup>
                            <FormGroup>
                              <Label
                                for="Address"
                                style={{ fontWeight: 'bold' }}
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
                                  justifyContent: 'flex-end',
                                  marginTop: '20px'
                                }}
                              >
                                {formError.fullname == '' &&
                                formError.email == '' &&
                                formError.phone == '' ? (
                                  <Button
                                    color="success"
                                    onClick={this.handleChangeProfile}
                                  >
                                    Submit
                                  </Button>
                                ) : (
                                  <Button
                                    color="success"
                                    onClick={this.handleErrorProfileMessage}
                                  >
                                    Submit
                                  </Button>
                                )}
                              </div>
                            </FormGroup>
                          </Form>
                        </CardBody>
                      </Card>
                    </Col>

                    <Col>
                      <Card>
                        <CardBody>
                          <Form
                            id="change-password-form"
                            onSubmit={this.handleChangePassword}
                          >
                            <FormGroup>
                              <h4>Password</h4>
                            </FormGroup>
                            <FormGroup>
                              <Label for="Fullname">Current Password</Label>
                              <Input
                                type="password"
                                name="old_password"
                                value={this.state.old_password}
                                onChange={this.handleChange}
                              />
                              {formErrorPassword.old_password !== '' &&
                                this.state.showErrorPasswordMessage && (
                                  <span style={{ color: 'red' }}>
                                    {formErrorPassword.old_password}
                                  </span>
                                )}
                            </FormGroup>
                            <FormGroup>
                              <Label for="Email">New Password</Label>
                              <Input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                              />
                              {formErrorPassword.password !== '' &&
                                this.state.showErrorPasswordMessage && (
                                  <span style={{ color: 'red' }}>
                                    {formErrorPassword.password}
                                  </span>
                                )}
                            </FormGroup>
                            <FormGroup>
                              <Label for="Phone">Confirm New Password</Label>
                              <Input
                                type="password"
                                name="password_confirmation"
                                value={this.state.password_confirmation}
                                onChange={this.handleChange}
                              />
                              {formErrorPassword.password_confirmation !== '' &&
                                this.state.showErrorPasswordMessage && (
                                  <span style={{ color: 'red' }}>
                                    {formErrorPassword.password_confirmation}
                                  </span>
                                )}
                            </FormGroup>
                            <FormGroup>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  marginTop: '20px'
                                }}
                              >
                                {formErrorPassword.old_password == '' &&
                                formErrorPassword.password == '' &&
                                formErrorPassword.password_confirmation ==
                                  '' ? (
                                  <Button
                                    color="success"
                                    onClick={this.handleChangePassword}
                                  >
                                    Submit
                                  </Button>
                                ) : (
                                  <Button
                                    color="success"
                                    onClick={this.handleErrorPasswordMessage}
                                  >
                                    Submit
                                  </Button>
                                )}
                              </div>
                            </FormGroup>
                          </Form>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Container>
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
          </CardBody>
        )}
      </Card>
    );
  }
}
