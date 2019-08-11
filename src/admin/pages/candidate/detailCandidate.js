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
  Badge,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { MdMap, MdBook, MdCancel, MdPageview } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import 'react-datepicker/dist/react-datepicker.css';
import classnames from 'classnames';
import moment from 'moment';
import '../JobDetail.css';
export default class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      fullname: '',
      email: '',
      phone: '',
      address: '',
      description: '',
      CV: '',
      status: '',
      jobs: [],
      interviews: [],
      technicalSkill: [],
      loading: true,
      modalSuccess: false,
      modalError: false,
      errorData: ''
    };
    this.changeStatus = this.changeStatus.bind(this);
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
    var url = 'https://enclave-recruitment-management.herokuapp.com/api/candidate/' + id;
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    switch (data.status) {
      case '1':
        data.status = 'Pending';
        break;
      case '2':
        data.status = 'Deny';
        break;
      case '3':
        data.status = 'Approve Application';
        break;
      case '4':
        data.status = 'Passed';
        break;
      case '5':
        data.status = 'Failed';
        break;
    }
    console.log(data);
    setTimeout(() => {
      this.setState({
        fullname: data.fullname,
        address: data.address,
        status: data.status,
        email: data.email,
        phone: data.phone,
        CV: data.CV,
        description: data.description,
        technicalSkill: data.technicalSkill,
        interviews: data.interviews,
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
    this.props.history.push('/dashboard/candidate');
  };

  changeStatus(statusString) {
    const { id } = this.props.match.params;
    const url = 'https://enclave-recruitment-management.herokuapp.com/api/candidate-status';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        candidateId: id,
        status: statusString
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      if (res.status === 200) {
        res.json().then(data => {
          this.toggleModalSuccess();
          this.componentDidMount();
        });
      } else {
        this.toggleModalError();
        res.json().then(data => {
          const dataArray = Object.keys(data.errors).map(i => data.errors[i]);
          this.setState({
            errorData: dataArray
          });
        });
      }
    });
  }

  render() {
    var i = 0;
    const { status } = this.state;
    var string = '';
    if (this.state.technicalSkill) {
      this.state.technicalSkill.map(e => {
        string += e.name + ': ' + e.year + ' years; ';
        return string;
      });
    }
    var length = string.length;
    var newString = string.slice(0, length - 2);

    var buttons = null;
    switch (status) {
      case 'Pending':
        buttons = (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '160px'
            }}
          >
            <Button
              style={{ background: '#43a047', borderColor: '#43a047' }}
              onClick={() => this.changeStatus('Approve Application')}
            >
              Approve
            </Button>
            <Button
              style={{ background: '#f85032', borderColor: '#f85032' }}
              onClick={() => this.changeStatus('Deny')}
            >
              Deny
            </Button>
          </div>
        );
        break;
      case 'Deny':
        buttons = (
          <Button
            style={{ background: '#43a047', borderColor: '#43a047' }}
            onClick={() => this.changeStatus('Approve Application')}
          >
            Approve
          </Button>
        );
        break;
      case 'Approve Application':
        buttons = (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '200px'
            }}
          >
            <Button
              style={{ background: '#64dd17', borderColor: '#64dd17' }}
              onClick={() => this.changeStatus('Passed')}
            >
              Pass
            </Button>
            <Button
              style={{ background: '#dd2c00', borderColor: '#dd2c00' }}
              onClick={() => this.changeStatus('Failed')}
            >
              Fail
            </Button>
            <Button
              style={{ background: '#f85032', borderColor: '#f85032' }}
              onClick={() => this.changeStatus('Deny')}
            >
              Deny
            </Button>
          </div>
        );
        break;
      case 'Passed':
        buttons = (
          <Button
            style={{ background: '#dd2c00', borderColor: '#dd2c00' }}
            onClick={() => this.changeStatus('Failed')}
          >
            Fail
          </Button>
        );
        break;
      case 'Failed':
        buttons = (
          <Button
            style={{ background: '#64dd17', borderColor: '#64dd17' }}
            onClick={() => this.changeStatus('Passed')}
          >
            Pass
          </Button>
        );
        break;
    }

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
            <span style={{ color: '#45b649' }}>Update successfully</span>
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
          candidate's information
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
              <Row>
                {/* <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '160px'
                  }}
                >
                  <Button
                    style={{ background: '#43a047', borderColor: '#43a047' }}
                  >
                    Approve
                  </Button>
                  <Button
                    style={{ background: '#f85032', borderColor: '#f85032' }}
                  >
                    Deny
                  </Button>
                </div> */}
                {buttons}
              </Row>
              <br />
              <Row style={{ justifyContent: 'center' }}>
                <div className="table-test" style={{ width: '100%' }}>
                  <table style={{ width: '100%' }}>
                    <tbody style={{ width: '100%' }}>
                      <tr className="job-title3" key={1}>
                        <td className="job-title">Full Name</td>
                        <td className="job-title1">{this.state.fullname}</td>
                      </tr>
                      <tr className="job-title3" key={7}>
                        <td className="job-title">CV</td>
                        <td className="job-title1">
                          <a
                            href={
                              'https://enclave-recruitment-management.herokuapp.com/upload/CV/' +
                              `${this.state.CV}`
                            }
                          >
                            {' '}
                            {this.state.CV}{' '}
                          </a>
                        </td>
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
                        <td className="job-title">Status</td>
                        <td className="job-title1">{this.state.status}</td>
                      </tr>
                      <tr className="job-title3" key={6}>
                        <td className="job-title">Description</td>
                        <td className="job-title1">{this.state.description}</td>
                      </tr>
                      <tr className="job-title3" key={7}>
                        <td className="job-title">Skill</td>
                        {this.state.technicalSkill ? (
                          <td className="job-title1">
                            <span>{newString}</span>
                          </td>
                        ) : (
                          <td className="job-title1" />
                        )}
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
                              <th className="title1">Name</th>
                              <th className="title1">Address</th>
                              <th className="title1">Start</th>
                              <th className="title1">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.interviews &&
                              this.state.interviews.map(e => {
                                if (e.status == '1') {
                                  e.status = 'Pending';
                                }
                                if (e.status == '2') {
                                  e.status = 'Closed';
                                }
                                if (e.address == '2-1') {
                                  e.address =
                                    'Floor 2 - 453-455 Hoang Dieu Str';
                                }
                                if (e.address == '3-1') {
                                  e.address =
                                    'Floor 3 - 453-455 Hoang Dieu Str';
                                }
                                if (e.address == '4-1') {
                                  e.address =
                                    'Floor 4 - 453-455 Hoang Dieu Str';
                                }
                                if (e.address == '5-1') {
                                  e.address =
                                    'Floor 5 - 453-455 Hoang Dieu Str';
                                }
                                if (e.address == '2-2') {
                                  e.address =
                                    'Floor 2 - 117 Nguyen Huu Tho Str';
                                }
                                if (e.address == '3-2') {
                                  e.address =
                                    'Floor 3 - 117 Nguyen Huu Tho Str';
                                }
                                if (e.address == '4-2') {
                                  e.address =
                                    'Floor 4 - 117 Nguyen Huu Tho Str';
                                }
                                if (e.address == '5-2') {
                                  e.address =
                                    'Floor 5 - 117 Nguyen Huu Tho Str';
                                }
                                i++;
                                let url = '/dashboard/candidate/' + e.id;
                                return (
                                  <tr
                                    style={{ textAlign: 'center' }}
                                    key={e.id}
                                  >
                                    <td className="title1">{i}</td>
                                    <td className="title1">{e.name}</td>
                                    <td className="title1">{e.address}</td>
                                    <td className="title1">{e.timeStart}</td>
                                    {e.status == 'Pending' ? (
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
                                          {e.status}
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
                                          {e.status}
                                        </Badge>
                                      </td>
                                    )}
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                        <br />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: '20px'
                          }}
                        >
                          <Link to="/dashboard/candidate">
                            <Button>Back</Button>
                          </Link>
                        </div>
                      </div>
                    </CardBody>
                  </TabPane>
                </TabContent>
              </Row>
            </Container>
          </CardBody>
        )}
      </Card>
    );
  }
}
