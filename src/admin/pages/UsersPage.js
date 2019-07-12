import React, { Component } from 'react'
import { Card, CardBody, CardHeader , Button} from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import ModalRemoveItem from '../components/ModalRemoveItem';
import ModalAddRole from '../components/ModalAddRole';
import {Link} from 'react-router-dom';
import './RolesPage.css';
const styleFont = {
  fontSize: '200%',
};
const styleCard = {
  width: '80%',
  marginTop: '5%',
  alignSelf: 'center',
  marginBottom: '8%'
};
export default class UsersPage extends Component {
  constructor(props){
    super(props);
    this.state={
      columns: [
        {
          label: 'Id',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc'
        },
        {
          label: 'Fullname',
          field: 'fullname',
          sort: 'asc'
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc'
        },
        {
          label: 'Phone',
          field: 'phone',
          sort: 'asc'
        },
        {
          label: 'Address',
          field: 'address',
          sort: 'asc'
        },
        {
          label: 'Action',
          field: 'action',
          sort: 'asc'
        },
      ],
      rows: []
    };
  }
  
  async componentWillMount(){
    var url = 'http://api.enclavei3dev.tk/api/user';
    const data = await fetch(url, {
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
      }
    }).then(res => res.json()) 
    
    data.data.forEach(function(e) {
      delete e.created_at;
      delete e.updated_at;
      delete e.image;
    })
    this.setState({
      rows: data.data
    })
  }

  render() {
    return (
      <Card  style={styleCard}>
      <CardHeader style={styleFont}>Roles Management</CardHeader>
      <CardBody>
      <MDBDataTable id="table"
      striped
      bordered
      hover
      data={this.state}
      />
      </CardBody>
      </Card> 
    )
  }
}
