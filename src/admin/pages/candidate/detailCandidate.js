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
  NavLink
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
      status: '',
      jobs: [],
      interviews: [],
      technicalSkill: [],
      loading: true
    };
    // this.handleChangePassword = this.handleChangePassword.bind(this);
  }
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/login');
    }
  }
  async componentDidMount() {
    const { id } = this.props.match.params;
    var url = 'https://api.enclavei3dev.tk/api/candidate/' + id;
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
    setTimeout(() => {
      this.setState({
        fullname: data.fullname,
        address: data.address,
        status: data.status,
        email: data.email,
        phone: data.phone,
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

  backToPreviousPage = () => {
    this.props.history.push('/dashboard/candidate');
  };

  render() {
    var i = 0;
    const { formError } = this.state;
    var string = '';
    {
      this.state.technicalSkill.map(e => {
        string += e.name + ': ' + e.year + ' years; ';
        return string;
      });
    }
    var length = string.length;
    var newString = string.slice(0, length - 2);
    return (
      <Card className="dashboard-card">
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
              <Row style={{ justifyContent: 'center' }}>
                <div className="table-test" style={{ width: '100%' }}>
                  <table style={{ width: '100%' }}>
                    <tbody style={{ width: '100%' }}>
                      <tr className="job-title3" key={1}>
                        <td className="job-title">Name</td>
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
                        <td className="job-title">Status</td>
                        <td className="job-title1">{this.state.status}</td>
                      </tr>
                      <tr className="job-title3" key={6}>
                        <td className="job-title">Description</td>
                        <td className="job-title1">{this.state.description}</td>
                      </tr>
                      <tr className="job-title3" key={7}>
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
                            {this.state.interviews.map(e => {
                              if (e.status == '1') {
                                e.status = 'Pending';
                              }
                              if (e.status == '2') {
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
              <Link to="/dashboard/candidate">
                <Button>Back</Button>
              </Link>
            </div>
          </CardBody>
        )}
      </Card>
    );
  }
}
