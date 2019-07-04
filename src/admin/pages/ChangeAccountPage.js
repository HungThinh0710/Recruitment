import React, { Component } from 'react'
import {
  Card,
  CardBody,
  CardHeader,

  Form,

  FormGroup,

  Input,
  Label,
} from 'reactstrap';
import Modal from '../components/Modal';
import ButtonReset from '../components/ButtonReset';
import HeaderForm from '../components/Layout/HeaderForm';
import './ChangeProfilePage.css';
export default class ChangeAccountPage extends Component {
  reset =() => {
    document.getElementById("form-profile").reset();
  } 
  render() {
    return (
         <Card className="change-profile-card">
            <HeaderForm url="/admin/account">Change Account Information</HeaderForm>
            <CardBody>
              <Form id="form-profile">
              <FormGroup>
                 
              </FormGroup>
              <FormGroup>
                  <Label for="examplePassword">Current Password</Label>
                  <Input
                    type="password"
                    name="currentPassword"
                  />
              </FormGroup>
              <FormGroup>
                  <Label for="examplePassword">New Password</Label>
                  <Input
                    type="password"
                    name="newPassword"
                  />
              </FormGroup>
              <FormGroup>
                  <Label for="examplePassword">Confirm New Password</Label>
                  <Input
                    type="password"
                    name="confNewPassword"
                  />
              </FormGroup>
               <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePhone">Phone</Label>
                  <Input
                    type="text"
                    name="phone"
                  />
                </FormGroup>
                <FormGroup className="change-profile-buttons">
                <ButtonReset idForm="form-profile"/>
                <Modal title="Account" url="/admin/account">Save</Modal>

                </FormGroup>
              </Form>
            </CardBody>
          </Card>
    )
  }
}
