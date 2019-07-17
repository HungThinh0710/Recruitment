import React, { Component } from "react";

import {MdPageview} from 'react-icons/md';
import { Card, CardBody, CardHeader , Button} from 'reactstrap';
import ModalRemoveItem from '../components/ModalRemoveItem';
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
    var url = 'http://api.enclavei3dev.tk/api/user?page=1';
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
      rows: data.data,
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
              <ModalRemoveItem  item={e} id={listId[index]} buttonLabel='Delete' function={()=>this.removeItem(e,listId[index])}/>
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
              <ModalRemoveItem  item={e} id={listId[index]} buttonLabel='Delete' function={()=>this.removeItem(e,listId[index])}/>
    </div>})
     $(".dataTables_paginate").remove();
     rows.forEach(function(e){
     
      delete e.id;
    });

  }

  handlePageChange(pageNumber) {
    // this.setState({activePage: pageNumber});
    var url = 'http://api.enclavei3dev.tk/api/user?page='+pageNumber;
    fetch(url, {
    headers:{
      'Content-Type': 'application/json',
      'Accept' : 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
    }
  }).then(res => {
    res.json().then(data => {
  
      data.data.forEach(function(e) {
        delete e.created_at;
        delete e.updated_at;
      })

      this.setState({
        currentPage: data.currentPage,
        totalItems: data.total,
        rows: data.data,
        activePage: pageNumber
      })
    })
  }) 
}

  edit(index){
    $('.item').removeClass('item-active');
    $('#'+index).addClass('item-active');
    var url = 'http://api.enclavei3dev.tk/api/user?page='+index;
    fetch(url, {
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

  addRole(data) {
    this.setState({
      rows: data.data,
      totalItems: data.total
    })
  }

  removeItem(element,id){
      
    let {data, totalItem} = this.state;
    const index = data.indexOf(element);
    var url = 'http://api.enclavei3dev.tk/api/user'; 
    fetch(url, {
     method: 'DELETE', 
     body: JSON.stringify({
       roles: id
     }), 
     headers:{
       'Content-Type': 'application/json',
       'Accept' : 'application/json',
       'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
     }
   }).then(res =>{

    //  data.splice(index,1);
    //  if(data.length%10==0)  totalItem= totalItem-1;
    //  else  totalItem= totalItem;
    //  this.setState({
    //    data:data,
    //     totalItem:  totalItem
    //  })
    if (res.status === 200) {
      res.json().then(data =>{
        fetch('http://api.enclavei3dev.tk/api/user?page=1', {
          headers:{
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
          }
        }).then(res => {
          res.json().then(data => {
             
            data.data.forEach(function(e) {
              delete e.created_at;
              delete e.updated_at;
              // delete e.id;
            })
            if(data.data.length%10==0)  totalItem= totalItem-1;
             else  totalItem= totalItem;
            this.setState({
              data : data.data,
               totalItem:  totalItem
            })
          })
        }) 
      })
    }
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
