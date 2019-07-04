
import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,Row,Col,Container } from 'reactstrap';

import {Redirect, Link } from 'react-router-dom';
import './ProfilePage.css';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        firstName: '',
        lastName: '',
        email: '' 
      }
  }
  componentWillMount(){
    //const {firstName, lastName, email} = this.state;
    fetch('https://cool-demo-api.herokuapp.com/api/v1/engineers/1').then(response => {
      response.json().then(data => {
        const {firstName, lastName, email} = data;
        this.setState({
          firstName,
          lastName,
          email
        });
      })
    });
  }

  render() {
    
    return (
      <div className="profile-card">
        <Card className="card-body">
        <CardTitle className="title">My Profile</CardTitle>
        <CardBody >
          <Row>
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
              <h5>Fullname:</h5>
              <h5>Age:</h5>
              <h5>Date Of Birth:</h5>
              <h5>Address:</h5>
              <h5>Phone:</h5>
            </div>
            </Col>
            <Col>
            <div className="persional-information">
              <h5>{this.state.firstName}</h5>
              <h5>18</h5>
              <h5>23/5/2000</h5>
              <h5>25 Hill Street</h5>
              <h5>89049594</h5>
            </div>
              
            </Col>
            <Col></Col>
          </Row>
          <Row>
            
            <Link to='/admin/changeprofile' className="change-profile">
            <Button className="button-change" color="success" >Change</Button>
            </Link>
            
          
          </Row>
        </CardBody>
      </Card>
      </div>
    )
  }
}
