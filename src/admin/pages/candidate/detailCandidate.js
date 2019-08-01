import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Row,
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,

} from 'reactstrap';
import {  MdMap, MdBook, MdCancel,MdPageview } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
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
      loading: true,
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
                data.status  = 'Pending';
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
    return (
      <div className="profile-card">
        <Card className="card-body">
          <CardTitle className="title">
            <MdCancel className="first" />
            Candidate Information
            <Link to="/dashboard/candidate">
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
                color={'#45b649'}
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
                          <td>{this.state.fullname}</td>
                        </tr>
                        <tr key={2}>
                          <td className="job-title">Address</td>
                          <td>{this.state.address}</td>
                        </tr>
                        <tr key={3}>
                          <td className="job-title">Email</td>
                          <td>{this.state.email}</td>
                        </tr>
                        
                        <tr key={4}>
                          <td className="job-title">Phone</td>
                          <td>{this.state.phone}</td>
                        </tr>
                        <tr key={5}>
                          <td className="job-title">Status</td>
                          <td>{this.state.status}</td>
                        </tr>
                        <tr key={6}>
                          <td className="job-title">Description</td>
                          <td>{this.state.description}</td>
                        </tr>
                        <tr key={7}>
                          <td className="job-title">Technical Skill</td>
                          <td>{this.state.technicalSkill.map( e=> {
                              return(
                                <span> {e.name} : {e.year + ' years'}&#44;</span>
                              )
                             })}</td>
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
                      <Row>
                      <CardBody>
                          <div className="table-test">
                            <table>
                              <thead>
                                <tr
                                  style={{
                                    background:
                                      '#45b649 linear-gradient(180deg, #61c164, #45b649) repeat-x',
                                    color: 'white'
                                  }}
                                >
                                  <th>#</th>
                                  <th>Fullname</th>
                                  <th>Address</th>
                                  <th>Start</th>
                                  <th>Status</th>
                                  <th style={{ width: '100px' }}>
                                    <div className="action">Action</div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.interviews.map(e => {
                                     if(e.status == '1'){
                                        e.status = 'Pending';
                                    }
                                    if(e.status == '2'){
                                      e.status = 'Opening';
                                    }
                                    if(e.status == '3'){
                                      e.status = 'Closed';
                                    }
                                    if(e.address == '2-1'){
                                        e.address = 'Floor 2 - 453-455 Hoang Dieu Str';
                                      }
                                      if(e.address == '3-1'){
                                        e.address = 'Floor 3 - 453-455 Hoang Dieu Str';
                                      }
                                      if(e.address == '4-1'){
                                        e.address = 'Floor 4 - 453-455 Hoang Dieu Str';
                                      }
                                      if(e.address == '5-1'){
                                        e.address = 'Floor 5 - 453-455 Hoang Dieu Str';
                                      }
                                      if(e.address == '2-2'){
                                        e.address = 'Floor 2 - 117 Nguyen Huu Tho Str';
                                      }
                                      if(e.address == '3-2'){
                                        e.address = 'Floor 3 - 117 Nguyen Huu Tho Str';
                                      }
                                      if(e.address == '4-2'){
                                        e.address = 'Floor 4 - 117 Nguyen Huu Tho Str';
                                      }
                                      if(e.address == '5-2'){
                                        e.address = 'Floor 5 - 117 Nguyen Huu Tho Str';
                                      }
                                  i++;
                                  let url = '/dashboard/candidate/' + e.id;
                                  return (
                                    <tr key={e.id}>
                                      <td>{i}</td>
                                      <td>{e.name}</td>
                                      <td>{e.address}</td>
                                      <td>{e.timeStart}</td>
                                      <td>{e.status}</td>
                                      <td>
                                        <div className="action">
                                          <Link style={{ width: 'auto' }} to={'/dashboard/interview/'+ e.id}>
                                            <Button className="view-button" color="primary">
                                              <MdPageview />
                                            </Button>
                                          </Link>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                            <br />

                          </div>
                        </CardBody>
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
