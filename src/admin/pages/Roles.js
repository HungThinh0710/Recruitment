import React, { Component } from 'react'
import { Card, CardBody, CardHeader , Button} from 'reactstrap';
import { MDBTable, MDBTableBody, MDBTableHead,MDBDataTable  } from 'mdbreact';
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
          field: 'name',
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
    var rows = data.data;
    rows.map(e => {
      let url = '/admin/role/'+e.id;
      return  e.action = <div  className="action">
              <Link to={url} >
              <Button color='primary'>View</Button>
              </Link>
              <ModalRemoveItem  item={e} id={e.id} buttonLabel='Delete' function={()=>this.removeItem(e,e.id)}/>
    </div>})
    this.setState({
      rows: rows
    })
  }
  // componentDidMount(){
    
  //   const {rows} = this.state;
  //   rows.map(e => {
  //     let url = '/admin/role/'+e.id;
  //   //   return  e.action = <div  className="action">
  //   //           <Link to={url} >
  //   //           <Button color='primary'>View</Button>
  //   //           </Link>
  //   //           <ModalRemoveItem  item={e} id={e.id} buttonLabel='Delete' function={()=>this.removeItem(e,e.id)}/>
  //   // </div>})
  //   return e.action ='abcd'
  //   })
  // }

  componentDidUpdate(){
    const {rows} = this.state;
    rows.map(e => {
      let url = '/admin/role/'+e.id;
      return  e.action = <div  className="action">
              <Link to={url} >
              <Button color='primary'>View</Button>
              </Link>
              <ModalRemoveItem  item={e} id={e.id} buttonLabel='Delete' function={()=>this.removeItem(e,e.id)}/>
    </div>})

  }

    addRole(rows) {
      this.setState({
        rows: rows
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
    const {columns,rows} = this.state;
    console.log(this.state)
    return (
      <Card  style={styleCard}>
      <CardHeader style={styleFont}>Roles Management</CardHeader>
      <CardBody>
      <ModalAddRole  style={{marginBottom:'5%'}} color='warning' buttonLabel='Add New Role' nameButtonAccept='Add' function={this.addRole.bind(this)} />
      <MDBTable responsive striped
      bordered
      hover>
      <MDBTableHead style={{backgroundColor:'#1ec223',color:'white '}} columns={columns}/>
      <MDBTableBody rows={rows} />
      </MDBTable>

    </CardBody>
        </Card> 
    )
  }
}
