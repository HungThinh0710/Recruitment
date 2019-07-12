import React, { Component } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, FormGroup,Form,Input,
  Label } from 'reactstrap';
  import Modal from './Modal';
  import ButtonReset from './ButtonReset';
import classnames from 'classnames';
import {
  MdAccountBox,
  MdPermDataSetting
} from 'react-icons/md';
import '../pages/ProfilePage.css';
import '../pages/ChangeAccountPage';
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

    const {fullname,email,phone,address} = this.state;
    var url = 'http://api.enclavei3dev.tk/api/profile';
    fetch(url, {
      method: 'PUT', 
      body: JSON.stringify({
        fullname: fullname,
        email: email,
        phone: phone,
        address: address
      }), 
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    }

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
        <Nav style={{marginBottom:'10%'}}tabs>
          <NavItem>
            <NavLink
              className={classnames({ tabactive: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}

            >
              <MdAccountBox style={{marginRight:'5'}}/>About
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ tabactive: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              <MdPermDataSetting style={{marginRight:'5'}}/>Change Profile
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent style={{width: '200%'}} activeTab={this.state.activeTab}>
          <TabPane tabId="1">
                <Row style={{marginLeft:'0.1%'}}>
                <h6 style={{color:'grey',fontWeight:'bold'}}>Contact Information</h6>
                </Row>
                <br />
                <Row>
                  <Col className="contact-information">
                  <h6>Phone:</h6>
                  <br/>
                  <h6>Address:</h6>
                  <br/>
                  <h6>Email:</h6>
                  <br/>
                  <hr />
                  </Col>
                  <Col className="contact-information">
                  <h6 style={{color:'green'}}>{this.props.phone}</h6>
                  <br/>
                  <h6>{this.props.address}</h6>
                  <br/>
                  <h6 style={{color:'green'}}>{this.props.email}</h6>
                  <br/>
                  <hr />
                  </Col>
                </Row>
                <Row style={{marginLeft:'0.1%'}}>
                <h6 style={{color:'grey',fontWeight:'bold'}}>Basic Information</h6> 
                </Row>
                <br />
                <Row>
                <Col className="contact-information">
                  <h6>Name:</h6>
                  <br/>
                  <h6>FullName:</h6>
                  <br/>
                  </Col>
                  <Col className="contact-information">
                  <h6>{this.props.name}</h6>
                  <br/>
                  <h6>{this.props.fullName}</h6>
                  <br/>
                </Col>
                </Row>
          </TabPane>
          <TabPane tabId="2">
          <Form id="my-profile" onSubmit={this.handleSubmit}>
              <FormGroup>
                  <Label for="exampleName">Fullname</Label>
                  <Input
                    type="text"
                    name='fullname'
                    value={this.state.fullname}
                    onChange={this.handleChange}
                  />
              </FormGroup>
              <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name='email'
                    value={this.state.email}
                    onChange={this.handleChange} 
                  />
                </FormGroup>
               
                <FormGroup>
                  <Label for="exampleAddress">Address</Label>
                  <Input
                    type="text"
                    name='address'
                    value={this.state.address}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePhone">Phone</Label>
                  <Input
                    type="text"
                    name='phone'
                    value={this.state.phone}
                    onChange={this.handleChange}
                  />
                </FormGroup>
{/* 
                {/* <FormGroup>
                  <Label for="exampleJob">Job : Recruitment Manage</Label>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleJob">Role : Admin</Label>
                </FormGroup>
                
                <FormGroup>
                  <Label for="exampleFile">Update My Avatar</Label>
                  <Input type="file" name="file" />
                </FormGroup> */}
                <FormGroup className="change-profile-buttons">
                  {/* <ButtonReset idForm='myprofile' /> */}
                  <Modal title="Profile" url="/admin/profile" function={this.handleSubmit}>Save</Modal> 
                  {/* <Button color='success' onClick={this.handleSubmit}>Save</Button> */}
                  
                </FormGroup>
              </Form>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}