
import React, { Component } from 'react'
import { Card,CardBody,CardTitle,CardSubtitle,CardImg,Button,CardText, 
  Row,Col,Container,TabContent, TabPane, Nav, NavItem, NavLink,Form,FormGroup,Label,Input } from 'reactstrap';
  import classnames from 'classnames';
  import {  NumberWidget } from '../components/Widget';
  import {
    MdSettings,MdMap,MdBook
  } from 'react-icons/md';
import './ProfilePage.css';
import TabInformation from '../components/TabInformation';
export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeTab: '1',
        name: '',
        fullName: '',
        email: '' ,
        phone: '' ,
        address: '',
        image: '',
        editFullName:'',
        editEmail:'',
        editPhone:'',
        editAddress:'',
        editImage:'',
        old_password:'',
        password:'',
        password_confirmation:''
      };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeProfile = this.handleChangeProfile.bind(this);
  }
  async componentWillMount(){
    //const {firstName, lastName, email} = this.state;
    var url = 'https://api.enclavei3dev.tk/api/current-profile';
    const data = await fetch(url, {
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
      }
    }).then(res => res.json())  
    this.setState({
      name : data.name,
      fullName: data.fullname,
      email: data.email,
      phone: data.phone,
      address: data.address,
      image: data.image,
      editFullName: data.fullname,
      editEmail: data.email,
      editPhone: data.phone,
      editAddress: data.address,
      editImage: data.image,
    })       
  }
  toggle(tab) {
    
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  changeProfile(fullName,email,phone,address) {
    this.setState({
      fullName:fullName,
      email: email,
      phone: phone,
      address: address
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  handleChangeProfile(){
    const {editFullName,editEmail,editAddress,editPhone} = this.state;
    var url = 'https://api.enclavei3dev.tk/api/profile'
    fetch(url, {
      method: 'PUT', 
      body: JSON.stringify({
        fullname: editFullName,
        email: editEmail,
        phone: editPhone,
        address: editAddress,
      }), 
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
      }
    }).then(res => {
      if (res.status ===401) {
        alert('Update Failed')
      }
      if (res.status === 422) {
        alert('Update Failed')
      }
      if (res.status === 200) {
        res.json().then(data =>{
          alert('Update Success');
          this.setState({
            fullName: editFullName,
            email: editEmail,
            phone: editPhone,
            address: editAddress
          })
        })
    }})
    .catch(error => console.error('Error:', error))
  }

  handleChangePassword(){
    const {old_password,password,password_confirmation} = this.state;
    var url = 'https://api.enclavei3dev.tk/api/change-password'
    fetch(url, {
      method: 'PUT', 
      body: JSON.stringify({
        old_password: old_password,
        password: password,
        password_confirmation: password_confirmation
      }), 
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
      }
    }).then(res => {
      if (res.status ===401) {
        alert('Update Failed')
      }
      if (res.status === 422) {
        alert('Update Failed')
      }
      if (res.status === 200) {
        res.json().then(data =>{
          alert('Update Success');
          this.setState({
            old_password: '',
            password: '',
            password_confirmation: ''
          })
          // document.getElementById('change-password-form').remove();
        })
    }})
    .catch(error => console.error('Error:', error))
  }

  render() {
    const {name,fullName,email,phone,address} = this.state;
    return (
      <div className="profile-card">
        <Card className="card-body">
          <CardTitle className="title">My Profile</CardTitle>
          <CardBody >
            <Container style={{marginTop:'5%'}}>
            <Row>
              <Col xs="4">
              <img className="avatar" src="/static/media/100_3.6e25d86d.jpg" alt="Card image cap" />
              </Col>
              <Col xs="auto">
              </Col>
              <Col xs="6">
              <TabInformation name={name} fullName={fullName} phone={phone} email={email} address={address} />
              </Col>
            </Row>       
            <br />
            <hr />
            <Row>
              <Col xs="4">
              <br />
              <NumberWidget
                title="Total Articles"
                subtitle="This month"
                number="500"
                color="primary"
                progress={{
                  value: 75,
                  label: 'Last month',
                }}
              
              />
              </Col>
              <Col xs="4">
              <br />
              <NumberWidget
                title="Total Interviews"
                subtitle="This month"
                number="9.8k"
                color="danger"
                progress={{
                  value: 80,
                  label: 'Last month',
                }}
              />
              </Col>
              <Col xs="4">
              <br />
              <NumberWidget
                title="Total Candidate"
                subtitle="This month"
                number="9.8k"
                color="warning"
                progress={{
                  value: 80,
                  label: 'Last month',
                }}
              />
              </Col>
              </Row>
              <br />
              <br />
            <Row>
              <Col>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ tabactiveFirst: this.state.activeTab === '1' })}
                      onClick={() => { this.toggle('1'); }}
                    >
                    <MdBook style={{marginRight:'5px'}}/>
                      Articles
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ tabactiveSecond: this.state.activeTab === '2' })}
                      onClick={() => { this.toggle('2'); }}
                    >
                      <MdMap style={{marginRight:'5px'}}/>
                      Interviews
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ tabactive: this.state.activeTab === '3' })}
                      onClick={() => { this.toggle('3'); }}
                    >
                      <MdSettings style={{marginRight:'5px'}}/>
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
                  </TabPane>
                  <TabPane  tabId="3">
                  <Row>
                    <Col>
                    <Card>
                    <CardBody>
                    <Form onSubmit={this.handleChangeProfile}>
                    <FormGroup>
                      <h4>Profile</h4>
                    </FormGroup>
                    <FormGroup>
                      <Label for="Fullname">Fullname</Label>
                      <Input type="text" name="editFullName"  value={this.state.editFullName} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="Email">Email</Label>
                      <Input type="email" name="editEmail" value={this.state.editEmail} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="Phone">Phone</Label>
                      <Input type="text" name="editPhone" value={this.state.editPhone} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="Fullname">Address</Label>
                      <Input type="text" name="editAddress" value={this.state.editAddress} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                    {/* <CollapsePermission name='roles' data={this.state.listRoles}/> */}
                    <Button style={{marginLeft:'80%'}} color='success' onClick={this.handleChangeProfile}>Submit</Button>
                    </FormGroup>
                    </Form>
                    </CardBody>
                    </Card>
                    </Col>
                    
                    <Col>
                      <Card>
                        <CardBody>
                        <Form id="change-password-form" onSubmit={this.handleChangePassword}>
                        <FormGroup>
                          <h4>Password</h4>
                        </FormGroup>
                        <FormGroup>
                          <Label for="Fullname">Current Password</Label>
                          <Input type="password" name="old_password" value={this.state.old_password}  onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="Email">New Password</Label>
                          <Input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="Phone">Confirm New Password</Label>
                          <Input type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                        <Button style={{marginLeft:'80%'}} color='success' onClick={this.handleChangePassword}>Submit</Button>
                        </FormGroup>
                        </Form>
                        </CardBody>
                      </Card>
                    </Col>
                
                  </Row>
                  </TabPane>
                </TabContent>
            
            </Container>
          </CardBody>
        </Card>
        </div>
    )
  }
}
