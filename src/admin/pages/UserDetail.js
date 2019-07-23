
import React, { Component } from 'react'
import { Card,CardBody,CardTitle,CardSubtitle,CardImg,Button,CardText, 
Row,Col,Container,TabContent, TabPane, Nav, NavItem, NavLink,Form,FormGroup,Label,Input } from 'reactstrap';
import classnames from 'classnames';
import TabInformation from '../components/TabInformation'
import {
  MdSettings,MdMap,MdBook,MdPermDataSetting
} from 'react-icons/md';
import {  NumberWidget } from '../components/Widget';
import { MDBDataTable } from 'mdbreact';
import { ClipLoader } from 'react-spinners';
import $ from 'jquery';
import './UserDetail.css';
export default class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedRole:false,
      activeRole: false,
      activeTab: '1',
        name: '',
        fullName: '',
        email: '' ,
        phone: '' ,
        address: '',
        editFullName: '',
        editEmail: '' ,
        editPhone: '' ,
        editAddress: '',
        image: '',
        editImage:'',
        roles:[],
        editRoles:[],
        editRolesName:[],
        listRoles: {
          columns:[{
            label: 'Name',
            field: 'name',
            sort: 'asc',
            width: 300
          },
          {
            label: 'Description',
            field: 'description',
            sort: 'asc'
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
        loading: true
      };
      this.toggle = this.toggle.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
  }
  toggle(tab) {
    
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  async componentWillMount(){
    
    const {id} = this.props.match.params;
    var url = 'https://api.enclavei3dev.tk/api/user/'+id;
    const data = await fetch(url, {
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
      }
    }).then(res => res.json()) 
    await this.setState({
      name : data.name,
      fullName: data.fullname,
      email: data.email,
      phone: data.phone,
      address: data.address,
      image: data.image,
      roles: data.roles,
      editFullName: data.fullname,
      editEmail: data.email,
      editPhone: data.phone,
      editAddress: data.address,
      editImage: data.image,
    })
    const columns = this.state.listRoles.columns;
    let {editRoles,editRolesName} = this.state;
    var url2 = 'https://api.enclavei3dev.tk/api/list-role?page=1';
    const data2 = await fetch(url2, {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
      }
    }).then(res => res.json()) 
    await data2.data.map((e)=>{
      delete e.created_at;
      delete e.updated_at;
      var {listId} = this.state;
      listId.push(e.id);
      var index=listId.indexOf(e.id);
      delete e.id;
      const {roles} = this.state;
      var found = roles.find(currentRole => {
        return currentRole.name===e.name;
      })
      if (found) {
        editRoles.push(listId[index]);
        return e.action= <input type='checkbox' defaultChecked={true} 
        onChange={() => handleCheck(e.name,listId[index])} />
      }
      
      else { return e.action = <input type='checkbox'  
      onChange={() => handleCheck(e.name,listId[index])} />}
      
    })
    
    function handleCheck(name,id){
      editRoles.push(id); 
      editRolesName.push({id:id,name:name});   
    }
    setTimeout(() => {
    this.setState({
      listRoles : {
        columns: columns,
        rows: data2.data,
      },
      loading: false,
      editRoles: editRoles,
      editRolesName: editRolesName,
    })}, 500);   
  }
  

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = () => {
    const {id} = this.props.match.params;
    const {editFullName,editEmail,editPhone,
      editAddress,editRoles} = this.state;
    var listEditRoles =[];
    //Fix the editRoles array => 2: remove 1: select
    var array1 = [... new Set(editRoles)];
    var array2 =[];
    array1.map(element=>{
      var count = editRoles.filter(e => e===element);
      var length = count.length;
      if (length%2!==0) {
        array2.push(element);
      } 
      return array2;
      });
    var url = 'https://api.enclavei3dev.tk/api/user/'+id;
    fetch(url, {
      method: 'PUT', 
      body: JSON.stringify({
        fullname: editFullName,
        email: editEmail,
        phone: editPhone,
        address: editAddress,
        roles: array2
      }), 
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
      }
    }).then(res => {
      if (res.status ===401) {
        alert('Update Failed')
      }
      if (res.status === 422) {
        alert('Update Failed')
      }
      if (res.status === 200) {
        res.json().then(data =>{
          alert('Update Success');
          array2.map(e =>{
            var url2 = 'https://api.enclavei3dev.tk/api/role/'+e;
            fetch(url2, {
              headers:{
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
              }
            }).then(res => {
              res.json().then(data => {
                listEditRoles.push(data);
              })
            })
          })
          this.setState({
            fullName: editFullName,
            email: editEmail,
            phone: editPhone,
            address: editAddress,
            roles: listEditRoles
          })
        })
    }})
    .catch(error => console.error('Error:', error))
    
  }
  handleChangePassword(){
    console.log('abcde');
  }

  render() {
    const {name,fullName,email,phone,address,roles} = this.state;
  
    return (
        <div className="profile-card">
        <Card className="card-body">
          <CardTitle className="title">User Profile</CardTitle>
          {this.state.loading ? (
          <div
            style={{
              marginTop: '100px',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '100px'
            }}
            className="sweet-loading"
          >
            <ClipLoader
              sizeUnit={'px'}
              size={200}
              color={'green'}
              loading={this.state.loading}
            />
          </div>
        ) : (
          <CardBody >
            <Container style={{marginTop:'5%'}}>
            <Row>
              <Col xs="4">
              <img className="avatar" src="/static/media/100_3.6e25d86d.jpg" alt="Card image cap" />
              </Col>
              <Col xs="auto">
              </Col>
              <Col xs="6">
              <TabInformation name={name} fullName={fullName} phone={phone} email={email} address={address} />
              </Col>
            </Row>       
            <br />
            <hr />
            <Row>
              <Col xs="4">
              <br />
              <NumberWidget
                title="Total Articles"
                subtitle="This month"
                number="500"
                color="primary"
                progress={{
                  value: 75,
                  label: 'Last month',
                }}
              
              />
              </Col>
              <Col xs="4">
              <br />
              <NumberWidget
                title="Total Interviews"
                subtitle="This month"
                number="9.8k"
                color="danger"
                progress={{
                  value: 80,
                  label: 'Last month',
                }}
              />
              </Col>
              <Col xs="4">
              <br />
              <NumberWidget
                title="Total Candidate"
                subtitle="This month"
                number="9.8k"
                color="warning"
                progress={{
                  value: 80,
                  label: 'Last month',
                }}
              />
              </Col>
              </Row>
              <br />
              <br />
            <Row>
              <Col>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ tabactiveFirst: this.state.activeTab === '1' })}
                      onClick={() => { this.toggle('1'); }}
                    ><MdBook style={{marginRight:'5px'}}/>
                      Articles
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ tabactiveSecond: this.state.activeTab === '2' })}
                      onClick={() => { this.toggle('2'); }}
                    ><MdMap style={{marginRight:'5px'}}/>
                      Interviews
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ tabactive: this.state.activeTab === '3' })}
                      onClick={() => { this.toggle('3'); }}
                    >
                    <MdPermDataSetting style={{marginRight:'5px'}}/>
                      Update Profile
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ tabactive: this.state.activeTab === '4' })}
                      onClick={() => { this.toggle('4'); }}
                    ><MdSettings style={{marginRight:'5px'}}/>
                      Update Password
                    </NavLink>
                  </NavItem>
                </Nav>
                </Col>
              </Row>
              <br />
              <br />
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                      <Row>
                      <Col>
                      <Card>
                        <CardImg top width="100%" src="https://loremflickr.com/320/240" alt="Card image cap" />
                        <CardBody>
                          <CardTitle>Card title</CardTitle>
                          <CardSubtitle>Card subtitle</CardSubtitle>
                          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        </CardBody>
                      </Card>
                      </Col>
                      <Col>
                      <Card>
                        <CardImg top width="100%" src="https://loremflickr.com/320/240/paris" alt="Card image cap" />
                        <CardBody>
                          <CardTitle>Card title</CardTitle>
                          <CardSubtitle>Card subtitle</CardSubtitle>
                          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        </CardBody>
                      </Card>
                      </Col>
                      <Col>
                      <Card>
                        <CardImg top width="100%" src="https://loremflickr.com/320/240/brazil" alt="Card image cap" />
                        <CardBody>
                          <CardTitle>Card title</CardTitle>
                          <CardSubtitle>Card subtitle</CardSubtitle>
                          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        </CardBody>
                      </Card>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                  <Row>
                    <Col>
                    <Card>
                      <CardImg top width="100%" src="https://loremflickr.com/320/240/dog" alt="Card image cap" />
                      <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                      </CardBody>
                    </Card>
                    </Col>
                    <Col>
                    <Card>
                      <CardImg top width="100%" src="https://loremflickr.com/320/240/cat" alt="Card image cap" />
                      <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                      </CardBody>
                    </Card>
                    </Col>
                    <Col>
                    <Card>
                      <CardImg top width="100%" src="https://loremflickr.com/320/240/rio" alt="Card image cap" />
                      <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                      </CardBody>
                    </Card>
                    </Col>
                  </Row>
                  </TabPane>
                  <TabPane  tabId="3">
                  <Row>
                    <Col>
                    <Card>
                    <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <Label for="Fullname">Fullname</Label>
                      <Input type="text" name="editFullName"  value={this.state.editFullName} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="Email">Email</Label>
                      <Input type="email" name="editEmail" value={this.state.editEmail} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="Phone">Phone</Label>
                      <Input type="text" name="editPhone" value={this.state.editPhone} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="Fullname">Address</Label>
                      <Input type="text" name="editAddress" value={this.state.editAddress} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                    {/* <CollapsePermission name='roles' data={this.state.listRoles}/> */}
                    <Button style={{marginLeft:'80%'}}color='success' onClick={this.handleSubmit}>Submit</Button>
                    </FormGroup>
                    </Form>
                    </CardBody>
                    </Card>
                    </Col>
                    
                    <Col>
                      <Card>
                        <CardBody>
                        <MDBDataTable
                          striped
                          bordered
                          hover
                          data={this.state.listRoles}
                          />
                        </CardBody>
                      </Card>
                    </Col>
                
                  </Row>
                  </TabPane>
                  <TabPane  tabId="4">
                  <Row>
                    <Col>
                    <Card>
                    <CardBody>
                    <Form id="change-password-form" onSubmit={this.handleChangePassword}>
                        <FormGroup>
                          <Label for="Fullname">Current Password</Label>
                          <Input type="password" name="old_password" value={this.state.old_password}  onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="Email">New Password</Label>
                          <Input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="Phone">Confirm New Password</Label>
                          <Input type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                        <Button style={{marginLeft:'80%'}} color='success' onClick={this.handleChangePassword}>Submit</Button>
                        </FormGroup>
                        </Form>
                    </CardBody>
                    </Card>
                    </Col>
                    </Row>
                    </TabPane>
                </TabContent>
            
            </Container>
          </CardBody>)}
        </Card>
        </div>
      
    )
  }
}
