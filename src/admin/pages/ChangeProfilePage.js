
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

export default class ProfilePage extends Component {

  render() {
    
    return (
      <Card className="change-profile-card">
            <HeaderForm url='/admin/profile'>Change Profile Information</HeaderForm>
            <CardBody>
              <Form id="profile-form">
              <FormGroup>
                  <Label for="exampleName">Fullname</Label>
                  <Input
                    type="text"
                    name="fullname"
                    placeholder="Elva"
                  />
              </FormGroup>
              <FormGroup>
                  <Label for="exampleNumber">Age</Label>
                  <Input
                    type="number"
                    name="age"
                    placeholder="18"
                  />
              </FormGroup>
               <FormGroup>
                  <Label for="exampleDate">Date Of Birth</Label>
                  <Input
                    type="date"
                    name="date"
                    id="exampleDate"
                    placeholder="23/05/2000"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleAddress">Address</Label>
                  <Input
                    type="text"
                    name="address"
                    placeholder="25 Hill Street"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePhone">Phone</Label>
                  <Input
                    type="text"
                    name="phone"
                    placeholder="89049594"
                  />
                </FormGroup>

               
               <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Briana.Stiedemann44@gmail.com"
                  />
                </FormGroup>
               
                
                <FormGroup>
                  <Label for="exampleJob">Job : Recruitment Manage</Label>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleJob">Role : Admin</Label>
                </FormGroup>
                
                <FormGroup>
                  <Label for="exampleFile">Update My Avatar</Label>
                  <Input type="file" name="file" />
                </FormGroup>
                <FormGroup className="change-profile-buttons">
                  <ButtonReset idForm='profile-form' />
                  <Modal title="Profile" url="/admin/profile">Save</Modal>
                  
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
    )
  }
}

