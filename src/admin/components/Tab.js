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
import { MdAccountBox, MdPermDataSetting, MdSettings } from 'react-icons/md';
import '../pages/ProfilePage.css';

export default class Tab extends Component {
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
    var url = 'https://api.enclavei3dev.tk/api/profile';
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
          alert('Change Successfully');
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
      <div>
        <Nav style={{ marginBottom: '10%' }} tabs>
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
              About
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
              <MdPermDataSetting style={{ marginRight: '5' }} />
              Change Profile
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
              <MdSettings style={{ marginRight: '5' }} />
              Change Password
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent style={{ width: '200%' }} activeTab={this.state.activeTab}>
          <TabPane tabId="1">
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
                <hr />
              </Col>
              <Col className="contact-information">
                <h6 style={{ color: 'green' }}>{this.props.phone}</h6>
                <br />
                <h6>{this.props.address}</h6>
                <br />
                <h6 style={{ color: 'green' }}>{this.props.email}</h6>
                <br />
                <hr />
              </Col>
            </Row>
            <Row style={{ marginLeft: '0.1%' }}>
              <h6 style={{ color: 'grey', fontWeight: 'bold' }}>
                Basic Information
              </h6>
            </Row>
            <br />
            <Row>
              <Col className="contact-information">
                <h6>Name:</h6>
                <br />
                <h6>FullName:</h6>
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
            <Form className="form-change-profile" onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="exampleName">Fullname</Label>
                <Input
                  type="text"
                  name="fullname"
                  value={this.state.fullname}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="exampleAddress">Address</Label>
                <Input
                  type="text"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePhone">Phone</Label>
                <Input
                  type="text"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup className="change-profile-buttons">
                <Modal
                  title="Profile"
                  url="/dashboard/profile"
                  function={this.handleSubmit}
                >
                  Update
                </Modal>
              </FormGroup>
            </Form>
          </TabPane>
          <TabPane tabId="3">
            <Form
              className="form-change-profile"
              onSubmit={this.handleSubmitChangpassword}
            >
              <FormGroup>
                <Label for="examplepassword">Current Passoword</Label>
                <Input
                  type="password"
                  name="oldpassword"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplepassword">New Password</Label>
                <Input
                  type="password"
                  name="newpassword"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="examplepassword">Confirm New Password</Label>
                <Input
                  type="password"
                  name="confpassword"
                  value={this.state.address}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup className="change-profile-buttons">
                <Modal
                  title="Profile"
                  url="/dashboard/profile"
                  function={this.handleSubmit}
                >
                  Update
                </Modal>
              </FormGroup>
            </Form>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
