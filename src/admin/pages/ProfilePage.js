
import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,Row,Col,Container } from 'reactstrap';
  import { IconWidget, NumberWidget } from '../components/Widget';
import {Redirect, Link } from 'react-router-dom';
import './ProfilePage.css';
import Tab from '../components/Tab';
export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        fullName: '',
        email: '' ,
        phone: '' ,
        address: '',
        image: ''
      }
  }
  async componentWillMount(){
    //const {firstName, lastName, email} = this.state;
    var url = 'http://api.enclavei3dev.tk/api/current-profile';
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
      image: data.image
    })       
  }
  
    // fetch('https://cool-demo-api.herokuapp.com/api/v1/engineers/1').then(response => {
    //   response.json().then(data => {
    //     const {firstName, lastName, email} = data;
    //     this.setState({
    //       firstName,
    //       lastName,
    //       email
    //     });
    //   })
    // });
//}

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
            <img className="avatar" src="https://loremflickr.com/320/240" alt="Card image cap" />
            </Col>
            <Col xs="auto">
            </Col>
            <Col xs="6">
            <div className="persional-title">
              <h4 style={{fontSize:'250%'}}>{this.state.fullName}</h4>
              <h6 style={{color:'green'}}>Admin Of Enclave Recruitment System</h6>
            </div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs="4">
            <hr />
            <br />
            <NumberWidget
              title="Total Article"
              subtitle="This month"
              number="500"
              color="success"
              progress={{
                value: 75,
                label: 'Last month',
              }}
            
            />
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
             <br />
             
            </Col>
            <Col xs="auto"></Col>
            <Col xs="6">
              <Container>
                <Row>
                  <Tab name={name} fullName={fullName} phone={phone} email={email} address={address} />
                </Row>
              </Container>    
            </Col>

          </Row>
          </Container>
          {/* <Container style={{marginTop:'5%'}}>
          <Row>
            <Col></Col>
            <Col-2>
            <div className="job-profile"> 
            <img className="avatar" src="https://loremflickr.com/320/240" alt="Card image cap" />
            <div className="job-profile-information">
              <div className="job-item">
              <span>Emai: {this.state.email}</span>
              </div>
              <div className="job-item">
              <span>Job : Recruitment Manage</span>
              </div>
              <div className="job-item">
              <span>Role: Admin</span>
              </div>
            </div>
            </div>
            </Col-2>
            <Col></Col>
            
            <Col >
            <div className="persional-title">
              <h5>Name:</h5>
              <h5>Fullname:</h5>
              <h5>Address:</h5>
              <br/>
              <h5>Phone:</h5>
              <h5>Image:</h5>
            </div>
            </Col>
            <Col>
            <div className="persional-information">
              <h5>{this.state.name}</h5>
              <h5>{this.state.fullName}</h5>
              <h5>{this.state.address}</h5>
              <h5>{this.state.phone}</h5>
              <h5>{this.state.image}</h5>
            </div>
              
            </Col>
            <Col></Col>
          </Row>
          <Row>
            
            <Link to='/admin/changeprofile' className="change-profile">
            <Button className="button-change" color="success" >Change</Button>
            </Link>
            
          
          </Row>
          </Container> */}
          
        </CardBody>
      </Card>
      </div>
    )
  }
}
