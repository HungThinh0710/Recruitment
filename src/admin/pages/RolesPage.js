
import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import ModalRemoveItem from '../components/ModalRemoveItem';
import ModalEditItem from '../components/ModalEditItem';

import './RolesPage.css';


const styleFont = {
  fontSize: '200%',
};
const styleCard = {
  width: '80%',
  marginTop: '5%',
  alignSelf: 'center',
};
export default class RolesPage extends Component {
  
  constructor(props){
    super(props);
    this.state={
      columns: [
        {
          label: 'Role',
          field: 'role',
          sort: 'asc',
          width: '30%'
        },
        {
          label: 'Permission',
          field: 'permission',
          sort: 'asc',
          width: '30%'
        },
        {
          label: 'Action',
          field: 'action',
          width: '30%'
        }
      ],
      rows: [
        {
          role: 'Admin',
          permission: 'Add Users'
        },
        {
          role: 'Admin',
          permission: 'Delete Users',
        },
        {
          role: 'Admin',
          permission: 'Edit Users',
        },
        {
          role: 'Admin',
          permission: 'Add Roles',
        },
        {
          role: 'Admin',
          permission: 'Edit Roles',
        },
        {
          role: 'Admin',
          permission: 'Delete Roles',
        },
        {
          role: 'Admin',
          permission: 'Add Articles',
         
        },
        {
          role: 'Admin',
          permission: 'Delete Articles',
          
        },
        {
          role: 'Admin',
          permission: 'Edit Articles',
         
        },
        {
          role: 'User',
          permission: 'Add Articles',
        
        },
        {
          role: 'User',
          permission: 'Edit Articles',
         
        },
        {
          role: 'User',
          permission: 'Delete Articles',
          
        },
        {
          role: 'User',
          permission: 'Change Account Information',
         
        },
        {
          role: 'Admin',
          permission: 'Change Account Information',
          
        },
      ]
      
   
    };
   this.addRole = this.addRole.bind(this);
}
   
componentDidMount(){
    
  const {rows} = this.state;
  rows.map(e => e.action = <div  className="action">
                            <ModalEditItem  color='primary' item={e}  buttonLabel='Edit' nameButtonAccept='Edit'/>
                            <ModalRemoveItem  item={e} buttonLabel='Delete' function={()=>this.removeItem(e)}/>
                           </div>)
 
}

componentDidUpdate(){
  const {rows} = this.state;
  rows.map(e => e.action = <div  className="action">
                            <ModalEditItem color='primary'   item={e} buttonLabel='Edit' nameButtonAccept='Edit' />
                            <ModalRemoveItem item={e}  buttonLabel='Delete' function={()=>this.removeItem(e)}/>
                           </div>)
}

  addRole(){
    const {rows}=this.state;
    const newRole ={
      role: 'Admin',
      permission: 'Edit Interviews'
    };
    rows.push(newRole);
     this.setState({
      rows: rows
    });
    
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
  removeItem(element){
   let {rows} = this.state;
   const index = rows.indexOf(element);
   rows.splice(index,1);
   this.setState({
     rows:rows
   })
  }

  render() {
    return (
      
        <Card className="mb-3" style={styleCard}>
        <CardHeader style={styleFont}>Roles Management</CardHeader>
        <CardBody>
        <ModalEditItem color='success' buttonLabel='Add New Role' nameButtonAccept='Add' function={this.addRole} />
        <br/>
        <br/>  
        <MDBDataTable id="table"
      striped
      bordered
      hover
      data={this.state}
    />
        </CardBody>
        </Card> 
    );
  }
}
