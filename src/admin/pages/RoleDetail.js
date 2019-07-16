import React, { Component } from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import ModalEditItem from '../components/ModalEditItem';
import $ from 'jquery';
const styleFont = {
  fontSize: '200%',
};
const styleCard = {
  width: '80%',
  marginTop: '5%',
  alignSelf: 'center',
  marginBottom: '8%'
};
export default class RoleDetail extends Component {
  constructor(props) {
    super(props);
    this.state={
      name:'',
      columns: [
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 300
        }
        ],
      rows : []
    }
  }
  async componentWillMount(){
    const {id} = this.props.match.params;
    var url = 'http://api.enclavei3dev.tk/api/role/'+id;
    const data = await fetch(url, {
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
      }
    }).then(res => res.json()) 
    data.permissions.forEach(function(e){
      delete e.id;
      delete e.created_at;
      delete e.updated_at;
      delete e.pivot;
      
    })
    this.setState({
      name: data.name,
      rows: data.permissions
    })
    $(".dataTables_paginate").remove();
  }

  editRole(rows,name){
    this.setState({
      name: name,
      rows: rows
    })
  }



  render() {  
    const {id} = this.props.match.params;
    return (
      <Card  style={styleCard}>
      <CardHeader style={styleFont}>{this.state.name}'s Permissions</CardHeader>
      <CardBody>
      <ModalEditItem  id={id} name={this.state.name} color='success' buttonLabel='Edit' function={this.editRole.bind(this)} />
      <MDBDataTable
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
