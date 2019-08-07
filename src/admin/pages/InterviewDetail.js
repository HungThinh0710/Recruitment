import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Button,
  Row,
  Container,
  TabContent,
  TabPane,
  Badge,
  Nav,
  NavItem,
  NavLink,
  CardHeader
} from 'reactstrap';
import { MdMap, MdBook, MdSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import moment from 'moment';
import classnames from 'classnames';

export default class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      name: '',
      address: '',
      status: '',
      timeEnd: '',
      timeStart: '',
      candidates: [],
      interviewers: [],
      loading: true
    };
  }
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/login');
    }
  }
  async componentDidMount() {
    const { id } = this.props.match.params;
    var url = 'https://api.enclavei3.tk/api/interview/' + id;
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());

    setTimeout(() => {
      this.setState({
        name: data.name,
        address: data.address,
        status: data.status,
        timeEnd: data.timeEnd,
        timeStart: data.timeStart,
        candidates: data.candidates,
        interviewers: data.interviewers,
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
    this.props.history.push('/dashboard/interview');
  };

  render() {
    var i = 0;
    var j = 0;
    const { formError } = this.state;
    return (
      <Card className="dashboard-card">
        <CardHeader className="card-header-custom">
          interview's information
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
                        <td className="job-title">Address</td>
                        <td className="job-title1">{this.state.address}</td>
                      </tr>
                      <tr className="job-title3" key={3}>
                        <td className="job-title">Start</td>
                        <td className="job-title1">
                          {moment(this.state.timeStart).format(
                            'MMMM Do YYYY, h:mm:ss a'
                          )}
                        </td>
                      </tr>

                      <tr className="job-title3" key={4}>
                        <td className="job-title">End</td>
                        <td className="job-title1">
                          {moment(this.state.timeEnd).format(
                            'MMMM Do YYYY, h:mm:ss a'
                          )}
                        </td>
                      </tr>
                      <tr className="job-title3" key={5}>
                        <td className="job-title">Status</td>
                        <td className="job-title1">{this.state.status}</td>
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
                        Interviewers
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
                              <th className="title1">Email</th>
                              <th className="title1">Phone</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.interviewers.map(e => {
                              i++;
                              let url = '/dashboard/interview/' + e.id;
                              return (
                                <tr style={{ textAlign: 'center' }} key={e.id}>
                                  <td className="title1">{i}</td>
                                  <td className="title1">{e.fullname}</td>
                                  <td className="title1">{e.email}</td>
                                  <td className="title1">{e.phone}</td>
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
                              <th className="title1">Email</th>
                              <th className="title1">Phone</th>
                              <th className="title1">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.candidates.map(e => {
                              if (e.status == '1') {
                                e.status = 'Pending';
                              }
                              if (e.status == '2') {
                                e.status = 'Deny';
                              }
                              if (e.status == '3') {
                                e.status = 'Approve';
                              }
                              if (e.status == '4') {
                                e.status = 'Passed';
                              }
                              if (e.status == '5') {
                                e.status = 'Failed';
                              }
                              j++;
                              let url = '/dashboard/interview/' + e.id;
                              return (
                                <tr style={{ textAlign: 'center' }} key={e.id}>
                                  <td className="title1">{j}</td>
                                  <td className="title1">{e.fullname}</td>
                                  <td className="title1">{e.email}</td>
                                  <td className="title1">{e.phone}</td>
                                  {e.status == 'Pending' ? (
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
                                        {e.status}
                                      </Badge>
                                    </td>
                                  ) : e.status == 'Deny' ? (
                                    <td className="title1 text-center">
                                      <Badge
                                        style={{
                                          backgroundColor: '#f85032',
                                          color: '#fff',
                                          width: 80,
                                          borderRadius:4,
                                        }}
                                        pill
                                      >
                                        {e.status}
                                      </Badge>
                                    </td>
                                  ) : e.status == 'Approve' ? (
                                    <td className="title1 text-center">
                                      <Badge
                                        style={{
                                          backgroundColor: '#43a047',
                                          color: '#fff',
                                          width: 80,
                                          borderRadius:4,
                                        }}
                                        pill
                                      >
                                        {e.status}
                                      </Badge>
                                    </td>
                                  ) : e.status == 'Passed' ? (
                                    <td className="title1 text-center">
                                      <Badge
                                        style={{
                                          backgroundColor: '#64dd17',
                                          color: '#fff',
                                          width: 80,
                                          borderRadius:4,
                                        }}
                                        pill
                                      >
                                        {e.status}
                                      </Badge>
                                    </td>
                                  ) : e.status == 'Failed' ? (
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
                                        {e.status}
                                      </Badge>
                                    </td>
                                  ) : (
                                    ''
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
    );
  }
}
