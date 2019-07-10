import React, { Component } from 'react'
import { Card, CardBody, CardHeader , Button} from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import ModalRemoveItem from '../components/ModalRemoveItem';
import ModalEditItem from '../components/ModalEditItem';
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

export default class Roles extends Component {
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
    const {listId}= this.state;
    var url = 'http://api.enclavei3dev.tk/api/role';
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
    })
    this.setState({
      rows: data.data
    })
  }
  componentDidMount(){
    
    const {rows} = this.state;
    var i=0;
    rows.map(e => {
      let url = '/admin/role/'+e.id;
      return  e.action = <div  className="action">
              <Link to={url} >
              <Button color='info'>View</Button>
              </Link>
              <ModalEditItem  color='primary' item={e}  buttonLabel='Edit' nameButtonAccept='Edit'/>
              <ModalRemoveItem  item={e} id={e.id} buttonLabel='Delete' function={()=>this.removeItem(e,e.id)}/>
    </div>})
   
  }

  componentDidUpdate(){
    const {rows} = this.state;
    var i=0;
    rows.map(e => {
      let url = '/admin/role/'+e.id;
      i++;
      return  e.action = <div  className="action">
              <Link to={url} >
              <Button color='info'>View</Button>
              </Link>
              <ModalEditItem  color='primary' item={e}  buttonLabel='Edit' nameButtonAccept='Edit'/>
              <ModalRemoveItem  item={e} id={e.id} buttonLabel='Delete' function={()=>this.removeItem(e,e.id)}/>
    </div>})
  }

    addRole(rows) {
      this.setState({
        rows: rows
      })
    }
    editItem(element) {
      let {rows} = this.state;
      const index = rows.indexOf(element);
      rows[index].role='abc';
      rows[index].permission='bcd';
      this.setState({
        rows:rows
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
  
  render() {
    return (
      <Card  style={styleCard}>
      <CardHeader style={styleFont}>Roles Management</CardHeader>
      <CardBody>
      <ModalAddRole  color='success' buttonLabel='Add New Role' nameButtonAccept='Add' function={this.addRole.bind(this)} />
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
