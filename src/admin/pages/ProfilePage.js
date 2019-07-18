
import React, { Component } from 'react'
import { Card,CardBody,
  CardTitle, Row,Col,Container } from 'reactstrap';
  import {  NumberWidget } from '../components/Widget';
import './ProfilePage.css';
import Tab from '../components/TabInformation';
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
      image: data.image
    })       
  }
  
  changeProfile(fullName,email,phone,address) {
    this.setState({
      fullName:fullName,
      email: email,
      phone: phone,
      address: address
    })
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
            <div className="persional-title">
              <h4 style={{fontSize:'250%'}}>{this.state.fullName}</h4>
              <h6 style={{color:'green'}}>Admin </h6>
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
                  <Tab name={name} fullName={fullName} phone={phone} email={email} address={address} function={this.changeProfile.bind(this)} />
                </Row>
              </Container>    
            </Col>

          </Row>
          </Container>
          
        </CardBody>
      </Card>
      </div>
    )
  }
}
