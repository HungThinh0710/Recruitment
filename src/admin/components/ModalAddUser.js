import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, FormText } from 'reactstrap';
  import CollapsePermission from '../components/CollapsePermission';
export default class ModalAddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: '',
      fullname:'',
      email:'',
      phone:'',
      address:'',
      password:'',
      passwordConfirm:'',
      listRoles: {
        columns:[{
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
        }],
        rows:[]
      },
      listId:[],
      roles:[]
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentWillMount(){
    //const {firstName, lastName, email} = this.state;
    const columns = this.state.listRoles.columns;
    let {roles} = this.state;
    var url = 'http://api.enclavei3dev.tk/api/role';
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
      var {listId} = this.state;
      listId.push(e.id);
      var index=listId.indexOf(e.id);
      delete e.id;
      return e.action = <input type='checkbox' 
      onChange={() => handleCheck(listId[index])} />
    })
    function handleCheck(id){
      roles.push(id); 
    }
    this.setState({
      listRoles : {
        columns: columns,
        rows: data.data
      },
      roles: roles
    })
  }

  wrapperFunction= () => {  
    this.handleSubmit();
    this.toggle();
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  
  handleSubmit = () => {

    const {name,fullname,email,phone,
      address,password,passwordConfirm,roles} = this.state;
      console.log(this.state);
    var url = 'http://api.enclavei3dev.tk/api/user';
    fetch(url, {
      method: 'POST', 
      body: JSON.stringify({
        name: name,
        fullname: fullname,
        email: email,
        phone: phone,
        address: address,
        password: password,
        password_confirmation: passwordConfirm,
        roles: roles
      }), 
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
      }
    }).then(res => {
      if (res.status ===401) {
        alert('Add Failed')
      }
      if (res.status === 422) {
        alert('Add Failed')
      }
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
                delete e.image;
              })
              this.props.function(data);
            })
          }) 
        })
      }
    })
    .catch(error => console.error('Error:', error))
    }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  render() {
    return (
        <div>
        <Button color={this.props.color} onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Create A New User</ModalHeader>
          <ModalBody>
           <Form onSubmit={this.handleSubmit}>
           <FormGroup>
            <Label for="Name">Name</Label>
            <Input type="text" name="name" onChange={this.handleChange}/>
           </FormGroup>
           <FormGroup>
            <Label for="Fullname">Fullname</Label>
            <Input type="text" name="fullname" onChange={this.handleChange}/>
           </FormGroup>
           <FormGroup>
            <Label for="Email">Email</Label>
            <Input type="email" name="email" onChange={this.handleChange}/>
           </FormGroup>
           <FormGroup>
            <Label for="Phone">Phone</Label>
            <Input type="text" name="phone" onChange={this.handleChange}/>
           </FormGroup>
           <FormGroup>
            <Label for="Fullname">Address</Label>
            <Input type="text" name="address" onChange={this.handleChange}/>
           </FormGroup>
           <FormGroup>
            <Label for="Password">Password</Label>
            <Input type="password" name="password"  onChange={this.handleChange}/>
           </FormGroup>
           <FormGroup>
            <Label for="ConfirmPassword">Confirm Password</Label>
            <Input type="password" name="passwordConfirm"  onChange={this.handleChange}/>
           </FormGroup>
           <FormGroup>
           <CollapsePermission name='Roles' data={this.state.listRoles}/>
           </FormGroup>
           </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.wrapperFunction}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
