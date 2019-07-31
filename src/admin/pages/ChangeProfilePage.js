import React, { Component } from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Button,
  Input,
  Label
} from 'reactstrap';
import Modal from '../components/Modal';
import ButtonReset from '../components/ButtonReset';
import HeaderForm from '../components/Layout/HeaderForm';
import './ChangeProfilePage.css';

export default class ChangeProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      .then(res => res.json())
      .catch(error => console.error('Error:', error));
  };

  render() {
    return (
      <Card className="change-profile-card" style={{ marginBottom: '18%' }}>
        <HeaderForm url="/dashboard/profile">
          Change Profile Information
        </HeaderForm>
        <CardBody>
          <Form id="profile-form" onSubmit={this.handleSubmit}>
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
              <ButtonReset idForm="profile-form" />
              <Modal
                title="Profile"
                url="/dashboard/profile"
                function={this.handleSubmit}
              >
                Save
              </Modal>
              {/* <Button color='success' onClick={this.handleSubmit}>Save</Button> */}
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
