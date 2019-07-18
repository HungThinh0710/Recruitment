import React, { Component } from 'react';
import { Card, CardBody, CardHeader , Button} from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import ModalRemoveItem from '../components/ModalRemoveItem';
import ModalAddRole from '../components/ModalAddRole';
import ModalEditItem from '../components/ModalEditItem';
import {Link} from 'react-router-dom';
import './RolesPage.css';
import {MdPageview, MdEdit} from 'react-icons/md';
import $ from 'jquery';
import PaginationComponent from '../components/Pagination.js';
const styleFont = {
  fontSize: '200%',
};
const styleCard = {
  width: '80%',
  marginTop: '5%',
  alignSelf: 'center',
  marginBottom: '8%'
};

export default class Roles extends Component {
  constructor(props){
    super(props);
    this.state={
      listId:[],
      itemName:'',
      activePage: 1,
      totalItems:0,
      columns: [
        {
          label: '#',
          field: 'index',
          sort: 'asc'
        },
        {
          label: 'Role',
          field: 'role',
          sort: 'asc'
        },
        {
          label: 'Description',
          field: 'description',
          sort: 'asc'
        },
        {
          label: 'Action',
          field: 'action'
        }
      ],
      rows: []
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  async componentWillMount(){
    const {activePage} = this.state;
    var url = 'https://api.enclavei3dev.tk/api/list-role?page='+activePage;
    var i=0;
    var listRoles = [];
    const data = await fetch(url, {
      method: 'POST', 
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json()) 
    data.data.forEach(function(e) {
      delete e.created_at;
      delete e.updated_at;
      i++;
      e = Object.assign({index:i}, e);
      listRoles.push(e);
    })
    
    this.setState({
      currentPage: data.currentPage,
      totalItems: data.total,
      rows: listRoles
    })
    $(".dataTables_paginate").remove();
  }
  componentDidMount(){
    const {rows,listId} = this.state;
    rows.map(e => {
      let url = '/admin/role/'+e.id;
      listId.push(e.id);
      var index=listId.indexOf(e.id);
      return  e.action = <div  className="action">
              <ModalEditItem  icon id={listId[index]} name={e.name} color='success' buttonLabel='Edit' function={this.editRole.bind(this)} />
              <Link to={url} >
              <Button className='button-view' color='primary'><MdPageview /></Button>
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
      let url = '/admin/role/'+e.id;

      listId.push(e.id);
      var index=listId.indexOf(e.id);
      return  e.action = <div  className="action">
              <ModalEditItem icon id={listId[index]} name={e.name} color='success' buttonLabel='Edit' function={this.editRole.bind(this)} />
              <Link to={url} >
              <Button className='view-button' color='primary'><MdPageview /></Button>
              </Link>
              <ModalRemoveItem  item={e} id={listId[index]} buttonLabel='Delete' function={()=>this.removeItem(listId[index])}/>
    </div>})
     $(".dataTables_paginate").remove();
     rows.forEach(function(e){
      delete e.id;
    });

  }

  addRole(listRoles,data) {
      this.setState({
        rows: listRoles,
        totalItems: data.total
      })
  }

    
  removeItem(id){
     const {activePage} = this.state;
     var array=[];
     array.push(id);
     var url = 'https://api.enclavei3dev.tk/api/role';
     var i=0;
     var listRoles = []; 
     fetch(url, {
      method: 'DELETE', 
      body: JSON.stringify({
        roleId: array
      }), 
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res =>{
      fetch('https://api.enclavei3dev.tk/api/list-role?page='+activePage, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'Accept' : 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        }
      }).then(res => {
        res.json().then(data =>{
          data.data.forEach(function(e){
            delete e.created_at;
            delete e.updated_at;
            i++;
            e = Object.assign({index:i}, e);
            listRoles.push(e);
          })
          
          this.setState({
            rows:listRoles,
            totalItems:data.total
          })
        })
      }) 
    })
  }

  editRole(rows,name){
    this.setState({
      name: name,
      rows: rows
    })
  }
  
  handlePageChange(pageNumber) {
      this.setState({activePage: pageNumber});
      var url = 'https://api.enclavei3dev.tk/api/list-role?page='+pageNumber;
      var i=0;
      var listRoles = [];
      fetch(url, {
      method:'POST',
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
          i++;
          e = Object.assign({index:i}, e);
          listRoles.push(e);
        })

        this.setState({
          currentPage: data.currentPage,
          totalItems: data.total,
          rows: listRoles,
          activePage: pageNumber
        })
      })
    }) 
  }


  render() {
    const {totalItems} = this.state;
    return (
      <Card  style={styleCard}>
      <CardHeader style={styleFont}>Roles Management</CardHeader>
      <CardBody>
      <ModalAddRole  color='success' buttonLabel='Create a new role' nameButtonAccept='Submit' function={this.addRole.bind(this)} />
      <br />
      <MDBDataTable id="table"
      striped
      bordered
      hover
      data={this.state}
      pagination='false'
      
    />
      <PaginationComponent
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={totalItems}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
    </CardBody>
        </Card> 
    )
  }
}
