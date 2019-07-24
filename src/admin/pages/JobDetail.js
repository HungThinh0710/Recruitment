import React, { Component } from 'react';
import {
  Card,
  CardBody,
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
  Input
} from 'reactstrap';
import { MdSettings, MdMap, MdBook, MdCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import classnames from 'classnames';
import './JobDetail.css';
export default class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedRole: false,
      activeRole: false,
      activeTab: '1',
      name: '',
      description: '',
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
      editaddress: '',
      editposition: '',
      editsalary: '',
      editstatus: '',
      editexperience: '',
      editamount: '',
      editpublishedOn: '',
      editdeadline: '',
      roles: [],
      editRoles: [],
      editRolesName: [],
      rows: [],
      listId: [],
      loading: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  async componentWillMount() {
    const { id } = this.props.match.params;
    var url = 'https://api.enclavei3dev.tk/api/job/' + id;
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    const i = data.publishedOn.indexOf(' ');
    const j = data.deadline.indexOf(' ');
    const newDateString = (s, i) => {
      return s.substr(0, i) + 'T' + s.substr(i + 1);
    };
    setTimeout(() => {
      this.setState({
        name: data.name,
        description: data.description,
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
        editaddress: data.address,
        editposition: data.position,
        editsalary: data.salary,
        editstatus: data.status,
        editexperience: data.experience,
        editamount: data.amount,
        editpublishedOn: newDateString(data.publishedOn, i),
        editdeadline: newDateString(data.deadline, j),
        loading: false
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

  backToPreviousPage = () => {
    this.props.history.push('/admin/job');
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = () => {
    const { id } = this.props.match.params;
    const {
      editname,
      editdescription,
      editaddress,
      editposition,
      editsalary,
      editstatus,
      editexperience,
      editamount,
      editpublishedOn,
      editdeadline
    } = this.state;
    const i = editpublishedOn.indexOf('T');
    const j = editdeadline.indexOf('T');
    const newDateString = (s, i) => {
      return s.substr(0, i) + ' ' + s.substr(i + 1);
    };
    var url = 'https://api.enclavei3dev.tk/api/job/' + id;
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        name: editname,
        description: editdescription,
        address: editaddress,
        position: editposition,
        salary: editsalary,
        status: editstatus,
        experience: editexperience,
        amount: editamount,
        publishedOn: newDateString(editpublishedOn, i),
        deadline: newDateString(editdeadline, j)
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
          alert('Update Failed');
        }
        if (res.status === 200) {
          res.json().then(data => {
            alert('Update Success');
            this.setState({
              name: editname,
              description: editdescription,
              address: editaddress,
              position: editposition,
              salary: editsalary,
              status: editstatus,
              experience: editexperience,
              amount: editamount,
              publishedOn: newDateString(editpublishedOn, i),
              deadline: newDateString(editdeadline, j)
            });
          });
        }
      })
      .catch(error => console.error('Error:', error));
  };

  render() {
    return (
      <div className="profile-card">
        <Card className="card-body">
          <CardTitle className="title">
            <MdCancel className="first" />
            Job Information
            <Link to="/admin/job">
              <MdCancel />
            </Link>
          </CardTitle>
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
              <ClipLoader
                sizeUnit={'px'}
                size={200}
                color={'green'}
                loading={this.state.loading}
              />
            </div>
          ) : (
            <CardBody>
              <Container>
                <Row style={{ justifyContent: 'center' }}>
                  <div className="table-test" style={{ width: '100%' }}>
                    <table>
                      <tbody>
                        <tr key={1}>
                          <td className="job-title">Name</td>
                          <td>{this.state.name}</td>
                        </tr>
                        <tr key={2}>
                          <td className="job-title">Description</td>
                          <td>{this.state.description}</td>
                        </tr>
                        <tr key={3}>
                          <td className="job-title">Address</td>
                          <td>{this.state.address}</td>
                        </tr>
                        <tr key={4}>
                          <td className="job-title">Position</td>
                          <td>{this.state.position}</td>
                        </tr>
                        <tr key={5}>
                          <td className="job-title">Salary</td>
                          <td>{this.state.salary}</td>
                        </tr>
                        <tr key={6}>
                          <td className="job-title">Status</td>
                          <td>{this.state.status}</td>
                        </tr>
                        <tr key={7}>
                          <td className="job-title">Experience</td>
                          <td>{this.state.experience}</td>
                        </tr>
                        <tr key={8}>
                          <td className="job-title">Amount</td>
                          <td>{this.state.amount}</td>
                        </tr>
                        <tr key={9}>
                          <td className="job-title">Publised On</td>
                          <td>{this.state.publishedOn}</td>
                        </tr>
                        <tr key={10}>
                          <td className="job-title">Deadline</td>
                          <td>{this.state.deadline}</td>
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
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
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
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
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
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
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
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
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
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
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
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                              </CardText>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        <Col>
                          <Card>
                            <CardBody>
                              <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                  <Label for="Name">Name</Label>
                                  <Input
                                    type="text"
                                    name="editname"
                                    onChange={this.handleChange}
                                    value={this.state.editname}
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label for="Description">Description</Label>
                                  <Input
                                    type="text"
                                    name="editdescription"
                                    onChange={this.handleChange}
                                    value={this.state.editdescription}
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label for="Address">Address</Label>
                                  <Input
                                    type="text"
                                    name="editaddress"
                                    onChange={this.handleChange}
                                    value={this.state.editaddress}
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label for="Position">Position</Label>
                                  <Input
                                    type="text"
                                    name="editposition"
                                    onChange={this.handleChange}
                                    value={this.state.editposition}
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label for="Salary">Salary</Label>
                                  <Input
                                    type="text"
                                    name="editsalary"
                                    onChange={this.handleChange}
                                    value={this.state.editsalary}
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label for="Status">Status</Label>
                                  <Input
                                    type="text"
                                    name="editstatus"
                                    onChange={this.handleChange}
                                    value={this.state.editstatus}
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label for="Experience">Experience</Label>
                                  <Input
                                    type="text"
                                    name="editexperience"
                                    onChange={this.handleChange}
                                    value={this.state.editexperience}
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label for="Amount">Amount</Label>
                                  <Input
                                    type="number"
                                    name="editamount"
                                    onChange={this.handleChange}
                                    value={this.state.editamount}
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label for="Published">Published On</Label>
                                  <Input
                                    type="datetime-local"
                                    name="editpublishedOn"
                                    onChange={this.handleChange}
                                    value={this.state.editpublishedOn}
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label for="Deadline">Deadline</Label>
                                  <Input
                                    type="datetime-local"
                                    name="editdeadline"
                                    onChange={this.handleChange}
                                    value={this.state.editdeadline}
                                  />
                                </FormGroup>
                                <FormGroup>
                                  {/* <CollapsePermission name='roles' data={this.state.listRoles}/> */}
                                  <Button
                                    style={{ marginLeft: '80%' }}
                                    color="success"
                                    onClick={this.handleSubmit}
                                  >
                                    Submit
                                  </Button>
                                </FormGroup>
                              </Form>
                            </CardBody>
                          </Card>
                        </Col>

                        {/* <Col>
                        <Card>
                          <CardBody>
                            <MDBDataTable
                              striped
                              bordered
                              hover
                              data={this.state.listRoles}
                            />
                          </CardBody>
                        </Card>
                      </Col> */}
                      </Row>
                    </TabPane>
                  </TabContent>
                </Row>
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
      </div>
    );
  }
}
