
import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Button,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
const $ = require('jquery');

const actionStyle = {
  display : 'flex',
  justifyContent: 'center'
};
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
          width: 400
        },
        {
          label: 'Permission',
          field: 'permission',
          sort: 'asc',
          width: 400
        },
        {
          label: 'Action',
          field: 'action',
          width: 50
        }
      ],
      rows: [
        {
          role: 'Admin',
          permission: 'Add Users', 
          action: ''
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
          permission: 'Add Articles',
         
        },
        {
          role: 'User',
          permission: 'Add Articles',
          
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
  //  this.removeItem = this.removeItem.bind(this);
  //  this.removeItem = () => {
  //    console.log('av');
  //  }
}
   
  componentDidMount(){
    
    const {rows} = this.state;
    
    rows.forEach(function(element) {
    element.action = <div style={actionStyle}>
                     <Button color="primary" >Edit</Button>{' '}
                     <Button color="danger" className='table-remove' onClick={removeItem} >Delete</Button>{' '}
                     </div>
    function removeItem(){
      const index = rows.indexOf(element);
      rows.splice(-index,1);
      console.log(rows);
      
      // this.setState({
      //   rows:rows
      // })
    }
    });
   
  }



  ////////
   removeItem(){
    //  const {rows} = this.state;
    // const index = rows.indexOf(element);
    // rows.splice(-index,1);
    console.log('abc');
    // this.setState({
    //   rows:rows
    // })
  }


















///////////
  componentDidUpdate(){
    const {rows} = this.state;
    rows.forEach(function(element) {
    element.action = <div style={actionStyle}>
                     <Button color="primary" >Edit</Button>{' '}
                     <Button color="danger" className='table-remove' onClick={removeItem} >Delete</Button>{' '}
                     </div>
                     function removeItem(){
                      const index = rows.indexOf(element);
                      rows.splice(-index,1);
                      console.log(rows);
                    }
    });
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
  render() {
    return (
      
        <Card className="mb-3" style={styleCard}>
        <CardHeader style={styleFont}>Roles Management</CardHeader>
        <CardBody>
        <Button id="add" className="table-add" color="success" onClick={this.addRole}  >Add New Row</Button>{' '}
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
