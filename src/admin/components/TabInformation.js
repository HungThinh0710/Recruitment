import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Label
} from 'reactstrap';
import Modal from './Modal';
import ButtonReset from './ButtonReset';
import classnames from 'classnames';
import {
  MdAccountBox,
  MdPermDataSetting,
  MdContactPhone
} from 'react-icons/md';
import '../pages/ProfilePage.css';
import '../pages/ChangeAccountPage';
export default class TabInformation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      fullname: '',
      email: '',
      phone: '',
      address: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit = () => {
    const { fullname, email, phone, address } = this.state;
    var url = 'https://enclave-recruitment-management.herokuapp.com/api/profile';
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        fullname: fullname,
        email: email,
        phone: phone,
        address: address
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    })
      .then(res => {
        res.json().then(data => {
          this.props.function(fullname, email, phone, address);
        });
      })
      .catch(error => console.error('Error:', error));
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div className="persional-title">
        <h4 style={{ fontSize: '200%' }}>{this.props.fullName}</h4>
        <br />
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
              <MdAccountBox style={{ marginRight: '5' }} />
              Basic
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
              <MdContactPhone style={{ marginRight: '5' }} />
              Contact
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <br />
          <TabPane tabId="1">
            <Row style={{ marginLeft: '0.1%' }}>
              <h6 style={{ color: 'grey', fontWeight: 'bold' }}>
                Basic Information
              </h6>
            </Row>
            <br />
            <Row>
              <Col className="contact-information">
                <h6>Username:</h6>
                <br />
                <h6>Full Name:</h6>
                <br />
              </Col>
              <Col className="contact-information">
                <h6>{this.props.name}</h6>
                <br />
                <h6>{this.props.fullName}</h6>
                <br />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row style={{ marginLeft: '0.1%' }}>
              <h6 style={{ color: 'grey', fontWeight: 'bold' }}>
                Contact Information
              </h6>
            </Row>
            <br />
            <Row>
              <Col className="contact-information">
                <h6>Phone:</h6>
                <br />
                <h6>Address:</h6>
                <br />
                <h6>Email:</h6>
                <br />
              </Col>
              <Col className="contact-information">
                <h6 style={{ color: '#45b649' }}>{this.props.phone}</h6>
                <br />
                <h6>{this.props.address}</h6>
                <br />
                <h6 style={{ color: '#45b649' }}>{this.props.email}</h6>
                <br />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
