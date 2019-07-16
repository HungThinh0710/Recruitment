import React, { Component } from 'react'
import { Card, CardBody, CardHeader , Button} from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import ModalRemoveItem from '../components/ModalRemoveItem';
import ModalAddRole from '../components/ModalAddRole';
import {Link} from 'react-router-dom';
import './RolesPage.css';
import {MdPageview} from 'react-icons/md';
import $ from 'jquery';
import Pagination from '../components/Pagination.js'
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
      activePage: 1,
      totalItems:0,
      columns: [
        {
          label: 'Role',
          field: 'role',
          sort: 'asc'
        },
        {
          label: 'Action',
          field: 'action',
        }
      ],
      rows: []
    };
  }
  async componentWillMount(){
    const {activePage} = this.state;
    var url = 'http://api.enclavei3dev.tk/api/role?page='+activePage;
    const data = await fetch(url, {
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json()) 
    
    data.data.forEach(function(e) {
      delete e.created_at;
      delete e.updated_at;
    })
    
    this.setState({
      currentPage: data.currentPage,
      totalItems: data.total,
      rows: data.data
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
      let url = '/admin/role/'+e.id;

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

    addRole(data) {
      this.setState({
        rows: data.data
      })
    }

    
    
    removeItem(element,id){
      
     let {rows} = this.state;
     const index = rows.indexOf(element);
     var url = 'http://api.enclavei3dev.tk/api/role'; 
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
      rows.splice(index,1);
      this.setState({
        rows:rows,
      })
    })
     
    }
  
    handlePageChange(pageNumber) {
      // this.setState({activePage: pageNumber});
      var url = 'http://api.enclavei3dev.tk/api/role?page='+pageNumber;
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
    
    
    $(".dataTables_paginate").remove();
    }


  render() {
    const {totalItems} = this.state;
    return (
      <Card  style={styleCard}>
      <CardHeader style={styleFont}>Roles Management</CardHeader>
      <CardBody>
      <ModalAddRole  color='success' buttonLabel='Creat a new role' nameButtonAccept='Add' function={this.addRole.bind(this)} />
      <MDBDataTable id="table"
      striped
      bordered
      hover
      data={this.state}
      pagination='false'
      
    />
      <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={totalItems}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
    </CardBody>
        </Card> 
    )
  }
}
