import React, { Component } from 'react'

import { Card,  CardBody,
  CardTitle, Button,Container,Row,Col ,FormGroup} from 'reactstrap';
import {Link} from 'react-router-dom';
import './AccountPage.css';
import ModalConfirmPassword from '../components/ModalConfirmPassword';
export default class AccountPage extends Component {
  render() {
    return (
        <Card className="account-form">
        <CardBody >
          <CardTitle className="title">My Account</CardTitle>
          <Container>
            <Row className='row-item'>
              <Col xs="3">
              <h5>Username</h5>
              </Col>
              <Col xs="3">
              <h5>:</h5>
              </Col>
              <Col >
              <h5>admin</h5>
              </Col>
            </Row>
            <Row className='row-item'>
              <Col xs="3">
              <h5>Password</h5>
              </Col>
              <Col xs="3">
              <h5>:</h5>
              </Col>
              <Col >
              <h5>******</h5>
              </Col>
            </Row>
            <Row className='row-item'>
              <Col xs="3">
              <h5>Email</h5>
              </Col>
              <Col xs="3">
              <h5>:</h5>
              </Col>
              <Col >
              <h5>********@gmail.com</h5>
              </Col>
            </Row>
            <Row className='row-item'>
              <Col xs="3">
              <h5>Phone</h5>
              </Col>
              <Col xs="3">
              <h5>:</h5>
              </Col>
              <Col >
              <h5>*******95</h5>
              </Col>
            </Row>
          </Container>
          <FormGroup className="account-buttons">
            <ModalConfirmPassword title="Account" url="/admin/account" className="btn-1">See Full</ModalConfirmPassword>
            <Link to='/admin/changeaccount'>
            <Button className="btn-2" color="success">Change</Button>
          </Link>
          </FormGroup>
          
          
        </CardBody>
      </Card>

    )
  }
}

