import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardImg,
  Button,
  Badge,
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
  ModalFooter
} from 'reactstrap';
import classnames from 'classnames';
import TabInformation from '../components/TabInformation';
import { MdSettings, MdMap, MdBook, MdCancel } from 'react-icons/md';
import { NumberWidget } from '../components/Widget';
import { MDBDataTable } from 'mdbreact';
import { PulseLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import './UserDetail.css';
const fullNameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedRole: false,
      activeRole: false,
      // activeTab: '1',
      activeTab: '2',
      name: '',
      fullName: '',
      email: '',
      phone: '',
      address: '',
      articles: '',
      editFullName: '',
      editEmail: '',
      editPhone: '',
      editAddress: '',
      image: '',
      editImage: '',
      roles: [],
      editRoles: [],
      listRoles: {
        columns: [
          {
            label: 'Name',
            field: 'name',
            sort: 'asc',
            width: 300
          },
          {
            label: 'Description',
            field: 'description',
            sort: 'asc'
          },
          {
            label: 'Action',
            field: 'action',
            sort: 'asc',
            width: 100
          }
        ],
        rows: []
      },
      listId: [],
      loading: true,
      formError: {
        fullname: '',
        email: '',
        phone: ''
      },
      modalError: false,
      modalSuccess: false,
      errorData: '',
      showErrorMessage: false,
      errorRoleMessage: '',
      checkRole: false
    };
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/login');
    }
  }
  async componentDidMount() {
    const { id } = this.props.match.params;
    const columns = this.state.listRoles.columns;
    let { editRoles } = this.state;
    var check = true;
    var url = 'https://api.enclavei3dev.tk/api/user/' + id;
    await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      
      if (res.status === 403) {
        check = false;
        this.setState({
          checkRole: false,
          loading: false
        });
      }
      if (res.status === 200) {
        res.json().then(response => {
          var data = response;
          console.log(data);
          
          check = true;
          this.setState({
            name: data.name,
            fullName: data.fullname,
            articles: data.articles,
            email: data.email,
            phone: data.phone,
            address: data.address,
            image: data.image,
            roles: data.roles,
            editFullName: data.fullname,
            editEmail: data.email,
            editPhone: data.phone,
            editAddress: data.address,
            editImage: data.image,
            checkRole: true
          });
        });
      }
    });

    if (check == true) {
      var url2 = 'https://api.enclavei3dev.tk/api/list-role';
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
      if (data2.message !== 'Unauthenticated.') {
        data2.map(e => {
          delete e.created_at;
          delete e.updated_at;
          var { listId } = this.state;
          listId.push(e.id);
          var index = listId.indexOf(e.id);
          delete e.id;
          const { roles } = this.state;
          var found = roles.find(currentRole => {
            return currentRole.name === e.name;
          });
          if (found) {
            editRoles.push(listId[index]);
            return (e.action = (
              <input
                type="checkbox"
                defaultChecked={true}
                onChange={() => this.handleCheck(listId[index], editRoles)}
              />
            ));
          } else {
            return (e.action = (
              <input
                type="checkbox"
                onChange={() => this.handleCheck(listId[index], editRoles)}
              />
            ));
          }
        });

        setTimeout(() => {
          this.setState({
            listRoles: {
              columns: columns,
              rows: data2
            },
            loading: false,
            editRoles: editRoles
          });
        }, 500);
      }
    }
  }

  handleCheck(id, editRoles) {
    editRoles.push(id);
    var { errorRoleMessage } = this.state;
    var array1 = [...new Set(editRoles)];
    var array2 = [];
    array1.map(element => {
      var count = editRoles.filter(e => e === element);
      var length = count.length;
      if (length % 2 !== 0) {
        array2.push(element);
      }
      return array2;
    });
    array2.length === 0
      ? (errorRoleMessage = "User's roles cannot be empty")
      : (errorRoleMessage = '');
    this.setState({
      editRoles: editRoles,
      errorRoleMessage: errorRoleMessage
    });
  }

  backToPreviousPage = () => {
    this.props.history.push('/dashboard/user');
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

  handleChange(event) {
    var { formError } = this.state;
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

  handleSubmit = () => {
    const { id } = this.props.match.params;
    const {
      editFullName,
      editEmail,
      editPhone,
      editAddress,
      editRoles
    } = this.state;
    var listEditRoles = [];
    //Fix the editRoles array => 2: remove 1: select
    var array1 = [...new Set(editRoles)];
    var array2 = [];
    array1.map(element => {
      var count = editRoles.filter(e => e === element);
      var length = count.length;
      if (length % 2 !== 0) {
        array2.push(element);
      }
      return array2;
    });
    var url = 'https://api.enclavei3dev.tk/api/user/' + id;
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        fullname: editFullName,
        email: editEmail,
        phone: editPhone,
        address: editAddress,
        roles: array2
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
            array2.map(e => {
              var url2 = 'https://api.enclavei3dev.tk/api/role/' + e;
              fetch(url2, {
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  Authorization:
                    'Bearer ' + localStorage.getItem('access_token')
                }
              }).then(res => {
                res.json().then(data => {
                  listEditRoles.push(data);
                });
              });
            });
            this.setState({
              fullName: editFullName,
              email: editEmail,
              phone: editPhone,
              address: editAddress,
              roles: listEditRoles
            });
          });
        }
      })
      .catch(error => console.error('Error:', error));
  };
  handleChangePassword() {}
  handleErrorMessage = () => {
    var { editRoles, errorRoleMessage } = this.state;
    var array1 = [...new Set(editRoles)];
    var array2 = [];
    array1.map(element => {
      var count = editRoles.filter(e => e === element);
      var length = count.length;
      if (length % 2 !== 0) {
        array2.push(element);
      }
      return array2;
    });
    array2.length === 0
      ? (errorRoleMessage = "User's roles cannot be empty")
      : (errorRoleMessage = '');
    this.setState({
      showErrorMessage: true,
      errorRoleMessage: errorRoleMessage
    });
  };

  render() {
    var i = 0;
    const { name, fullName, email, phone, address, formError } = this.state;
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
            {this.state.checkRole ? (
              <div>
                <Container style={{ marginTop: '5%' }}>
                  <Row>
                    <Col xs="4">
                      <div style= {{overflow: 'hidden'}}> 
                        <img
                        className="avatar"
                        src={'https://api.enclavei3dev.tk/upload/images/avatars/'+ `${this.state.image}`}
                        alt="Card image cap"
                      /></div>
                     
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
                  <hr />

                  <br />
                  <br />
                  <Row>
                    <Col>
                      <Nav tabs>
                        {/* <NavItem>
                    <NavLink
                      className={classnames({ tabactive: this.state.activeTab === '1' })}
                      onClick={() => { this.toggle('1'); }}
                    ><MdBook style={{marginRight:'5px'}}/>
                      Articles
                    </NavLink>
                  </NavItem>
                  */}
                  <NavItem>
                    <NavLink
                      className={classnames({ tabactive: this.state.activeTab === '2' })}
                      onClick={() => { this.toggle('2'); }}
                    ><MdMap style={{marginRight:'5px'}}/>
                      Articles
                    </NavLink>
                  </NavItem> 
                        <NavItem>
                          <NavLink
                            className={classnames({
                              tabactive: this.state.activeTab === '3'
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
                    </Col>
                  </Row>
                  <br />
                  <br />
                  <TabContent activeTab={this.state.activeTab}>
                    {/* <TabPane tabId="1">
                      <Row>
                      <Col>
                      <Card>
                        <CardImg top width="100%" src="https://loremflickr.com/320/240" alt="Card image cap" />
                        <CardBody>
                          <CardTitle>Card title</CardTitle>
                          <CardSubtitle>Card subtitle</CardSubtitle>
                          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        </CardBody>
                      </Card>
                      </Col>
                      <Col>
                      <Card>
                        <CardImg top width="100%" src="https://loremflickr.com/320/240/paris" alt="Card image cap" />
                        <CardBody>
                          <CardTitle>Card title</CardTitle>
                          <CardSubtitle>Card subtitle</CardSubtitle>
                          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        </CardBody>
                      </Card>
                      </Col>
                      <Col>
                      <Card>
                        <CardImg top width="100%" src="https://loremflickr.com/320/240/brazil" alt="Card image cap" />
                        <CardBody>
                          <CardTitle>Card title</CardTitle>
                          <CardSubtitle>Card subtitle</CardSubtitle>
                          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        </CardBody>
                      </Card>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                  <Row>
                    <Col>
                    <Card>
                      <CardImg top width="100%" src="https://loremflickr.com/320/240/dog" alt="Card image cap" />
                      <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                      </CardBody>
                    </Card>
                    </Col>
                    <Col>
                    <Card>
                      <CardImg top width="100%" src="https://loremflickr.com/320/240/cat" alt="Card image cap" />
                      <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                      </CardBody>
                    </Card>
                    </Col>
                    <Col>
                    <Card>
                      <CardImg top width="100%" src="https://loremflickr.com/320/240/rio" alt="Card image cap" />
                      <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                      </CardBody>
                    </Card>
                    </Col>
                  </Row>
                  </TabPane> */}
                  <TabPane tabId="2">
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
                                          borderRadius:4,
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
                                          borderRadius:4,
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
                    <TabPane tabId="3">
                      <Row>
                        <Col>
                          <Card>
                            <CardBody>
                              <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                  <Label for="Fullname">Full Name</Label>
                                  <Input
                                    type="text"
                                    name="editFullName"
                                    value={this.state.editFullName}
                                    onChange={this.handleChange}
                                  />
                                  {formError.fullname !== '' &&
                                    this.state.showErrorMessage && (
                                      <span style={{ color: 'red' }}>
                                        {formError.fullname}
                                      </span>
                                    )}
                                </FormGroup>
                                <FormGroup>
                                  <Label for="Email">Email</Label>
                                  <Input
                                    type="email"
                                    name="editEmail"
                                    value={this.state.editEmail}
                                    onChange={this.handleChange}
                                  />
                                  {formError.email !== '' &&
                                    this.state.showErrorMessage && (
                                      <span style={{ color: 'red' }}>
                                        {formError.email}
                                      </span>
                                    )}
                                </FormGroup>
                                <FormGroup>
                                  <Label for="Phone">Phone</Label>
                                  <Input
                                    type="text"
                                    name="editPhone"
                                    value={this.state.editPhone}
                                    onChange={this.handleChange}
                                  />
                                  {formError.phone !== '' &&
                                    this.state.showErrorMessage && (
                                      <span style={{ color: 'red' }}>
                                        {formError.phone}
                                      </span>
                                    )}
                                </FormGroup>
                                <FormGroup>
                                  <Label for="Fullname">Address</Label>
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
                                    formError.phone == '' &&
                                    this.state.errorRoleMessage == '' ? (
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
                                  </div>
                                </FormGroup>
                              </Form>
                            </CardBody>
                          </Card>
                        </Col>

                        <Col>
                          <Card>
                            <CardBody>
                              <MDBDataTable
                                striped
                                bordered
                                hover
                                data={this.state.listRoles}
                              />
                              {this.state.errorRoleMessage !== '' &&
                                this.state.showErrorMessage && (
                                  <span style={{ color: 'red' }}>
                                    User's roles cannot be empty
                                  </span>
                                )}
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
              </div>
            ) : (
              <div>
                <h3 style={{ color: 'red' }}>
                  {' '}
                  You don't have permission to access this page
                </h3>
              </div>
            )}
          </CardBody>
        )}
      </Card>
    );
  }
}
