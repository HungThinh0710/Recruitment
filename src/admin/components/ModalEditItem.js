import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, 
  ModalFooter,Card,CardBody,FormGroup,Form,Label,Input } from 'reactstrap';
import './ModalConfirmPassword.css';
import '../pages/RolesPage.css'
import CollapsePermission from '../components/CollapsePermission';
import {
  MdEdit
} from 'react-icons/md';
export default class ModalEditItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      permissions : {
        columns: [
        {
          label: 'Id',
          field: 'id',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 300
        },
        {
          label: 'Action',
          field: 'action',
          sort: 'asc',
          width: 100
        }
        ],
      rows : []
      },
      itemId:'',
      itemName: '',
      listChecked : []
    };
    this.handleChange = this.handleChange.bind(this);
    this.editItem = this.editItem.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  async componentWillMount(){
    
    //const {firstName, lastName, email} = this.state;
    const columns = this.state.permissions.columns;
    let list = this.state.listChecked;
    var url = 'https://api.enclavei3dev.tk/api/permission';
    const data = await fetch(url, {
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
      }
    }).then(res => res.json()) 
    
    data.data.map((e)=>{
      delete e.created_at;
      delete e.updated_at;
      return e.action = <input type='checkbox' onChange={() => handleCheck(e)} />
    })
    function handleCheck(e){
      String(e.id);
      list.push(e.id);  
    }
    this.setState({
      permissions : {
        columns: columns,
        rows: data.data
      },
      listChecked: list
    })
  }
  
  handleChange(event) {
    this.setState({
      itemName: event.target.value
    });
  }


  wrapperFunction= () => {
    
      this.editItem()
      this.toggle();
  }

  editItem(){
    const {itemName,listChecked} = this.state;
    const {id} = this.props;
    var url = 'https://api.enclavei3dev.tk/api/role/'+id; 
    fetch(url, {
      method: 'PUT', 
      body: JSON.stringify({
        name: itemName,
        permissions: listChecked
      }), 
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
      }
    })            
    .then(res => {
      if (res.status ===401) {
        alert('Edit Failed')
      }
      if (res.status === 422) {
        alert('Edit Failed')
      }
      if (res.status === 200) {
        res.json().then(data =>{
          fetch(url, {
            headers:{
              'Content-Type': 'application/json',
              'Accept' : 'application/json',
              'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
            }
          }).then(res => {
            res.json().then(data => {
               
              data.permissions.forEach(function(e){
                delete e.id;
                delete e.created_at;
                delete e.updated_at;
                delete e.pivot;
              })
              this.props.function(data.permissions,itemName);
            })
          }) 
        })
      }
    })
    .catch(error => console.error('Error:', error)); 
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  render() {
    return (
      <div>
        {this.props.icon ? (
            <Button className='button-first' color={this.props.color} onClick={this.toggle}><MdEdit /></Button>
        ):(
          <Button className='button-first' color={this.props.color} onClick={this.toggle}>Edit</Button>
        )}
        
        <Modal  size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}> Edit Role </ModalHeader>
          <ModalBody>
          <Card>
              <CardBody>
                <Form>
                  <FormGroup className="password-input">
                  <Label for="exampleName" className="username-title">Role:</Label>
                    <Input
                    className="input-first"
                    type="text"
                    name="role"
                    placeholder={this.props.name}
                    onChange = {this.handleChange}
                    
                  />
                  </FormGroup>
                  <FormGroup >
                  <CollapsePermission data={this.state.permissions}/>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.wrapperFunction}>Update</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
