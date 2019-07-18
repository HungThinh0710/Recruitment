import React, { Component } from "react";

import {MdPageview} from 'react-icons/md';
import { Card, CardBody, CardHeader , Button} from 'reactstrap';
import ModalRemoveUser from '../components/ModalRemoveUser';
import {Link} from 'react-router-dom';
import Pagination from '../components/Pagination.js'
import { MDBDataTable } from 'mdbreact';
// import './Roles.css'
import ModalAddUser from '../components/ModalAddUser';
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
export default class UsersPage extends Component {
  constructor(props){
    super(props);
    this.state={
      columns: [
        {
          label: '#',
          field: 'index',
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
          label: 'Action',
          field: 'action',
        }
      ],
      rows: [],
      currentPage : 0,
      activePage: 1,
      totalItems:0,
      listId: []
    };
  }
  
  async componentWillMount(){
    var url = 'https://api.enclavei3dev.tk/api/list-user?page=1';
    var i=0;
    var listUsers = [];
    const data = await fetch(url, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
      }
    }).then(res => res.json()) 
    data.data.forEach(function(e) {
      delete e.name;
      delete e.address;
      delete e.created_at;
      delete e.updated_at;
      delete e.image;
      delete e.roles;
      i++;
      e = Object.assign({index:i}, e);
      listUsers.push(e);
    })
    this.setState({
      rows: listUsers,
      totalItems: data.total
    })
    $(".dataTables_paginate").remove();
  }

  componentDidMount(){
    
    const {rows,listId} = this.state;
    rows.map(e => {
      let url = '/admin/user/'+e.id;

      listId.push(e.id);
      var index=listId.indexOf(e.id);
      return  e.action = <div  className="action">
              <Link to={url} >
              <Button color='primary'>View</Button>
              </Link>
              <ModalRemoveUser  item={e} id={listId[index]} buttonLabel='Delete' function={()=>this.removeItem(listId[index])}/>
    </div>})
     $(".dataTables_paginate").remove();
     rows.forEach(function(e){
     
      delete e.id;
    });
  }

  componentDidUpdate(){
    const {rows,listId} = this.state;
    rows.map(e => {
      let url = '/admin/user/'+e.id;

      listId.push(e.id);
      const index=listId.indexOf(e.id);
      return  e.action = <div  className="action">
              <Link to={url} >
              <Button color='primary'><MdPageview /></Button>
              </Link>
              <ModalRemoveUser  item={e} id={listId[index]} buttonLabel='Delete' function={()=>this.removeItem(listId[index])}/>
    </div>})
     $(".dataTables_paginate").remove();
     rows.forEach(function(e){
     
      delete e.id;
    });

  }

  handlePageChange(pageNumber) {
    // this.setState({activePage: pageNumber});
    var url = 'https://api.enclavei3dev.tk/api/list-user?page='+pageNumber;
    var i=0;
    var listUsers = [];
    fetch(url, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'Accept' : 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
    }
  }).then(res => {
    res.json().then(data => {
  
      data.data.forEach(function(e) {
        delete e.name;
        delete e.address;
        delete e.created_at;
        delete e.updated_at;
        delete e.image;
        delete e.roles;
        i++;
        e = Object.assign({index:i}, e);
        listUsers.push(e);
      })

      this.setState({
        currentPage: data.currentPage,
        totalItems: data.total,
        rows: listUsers,
        activePage: pageNumber
      })
    })
  }) 
}

  edit(index){
    $('.item').removeClass('item-active');
    $('#'+index).addClass('item-active');
    var url = 'https://api.enclavei3dev.tk/api/user?page='+index;
    fetch(url, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
      }
    }).then(res => {
      res.json().then(data =>{
          this.setState({
            rows: data.data,
            totalItems: data.total
          })
      })
    }) 
  }

  addRole(listUsers,data) {
    this.setState({
      rows: listUsers,
      totalItems: data.total
    })
  }

  removeItem(id){
    const {activePage} = this.state;
    var array=[];
    var i=0;
    var listUsers = [];
    array.push(id);
    var url = 'https://api.enclavei3dev.tk/api/user'; 
    fetch(url, {
     method: 'DELETE', 
     body: JSON.stringify({
       userId: array
     }), 
     headers:{
       'Content-Type': 'application/json',
       'Accept' : 'application/json',
       'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
     }
   }).then(res =>{
     fetch('https://api.enclavei3dev.tk/api/list-user?page='+activePage, {
        method: 'POST',
       headers:{
         'Content-Type': 'application/json',
         'Accept' : 'application/json',
         'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
       }
     }).then(res => {
       res.json().then(data =>{
         data.data.forEach(function(e){
          delete e.name;
          delete e.address;
          delete e.created_at;
          delete e.updated_at;
          delete e.image;
          delete e.roles;
          i++;
          e = Object.assign({index:i}, e);
          listUsers.push(e);
         })
         
         this.setState({
           rows:listUsers,
           totalItems:data.total
         })
       })
     }) 
   })
 }

  render() { 
    return (
      <Card  style={styleCard}>
      <CardHeader style={styleFont}>Roles Management</CardHeader>
      <CardBody>
      <ModalAddUser  color='success' buttonLabel='Create a new user' nameButtonAccept='Add' function={this.addRole.bind(this)} />
      <br />
      <MDBDataTable id="table"
      striped
      bordered
      hover
      data={this.state}
      
    />
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={this.state.totalItems}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
        </CardBody>
        </Card> 
    );
  }
}
