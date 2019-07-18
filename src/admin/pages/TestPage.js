
import React, { Component } from 'react'
import { Card,CardBody,CardTitle,CardSubtitle,CardImg,Button,CardText, 
  Row,Col,Container,TabContent, TabPane, Nav, NavItem, NavLink,Form,FormGroup,Label,Input } from 'reactstrap';
  import classnames from 'classnames';
  import CollapsePermission from '../components/CollapsePermission'
  import {  NumberWidget } from '../components/Widget';
import './UserDetail.css';
export default class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
            label: 'Action',
            field: 'action',
            sort: 'asc',
            width: 100
          }],
          rows:[]
        },
        listId:[]
      };
      this.toggle = this.toggle.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  async componentWillMount(){
<<<<<<< HEAD
    const {id} = this.props.match.params;
    var url = 'https://api.enclavei3dev.tk/api/user/'+id;
=======
    const {activePage} = this.state;
    var url = 'https://api.enclavei3dev.tk/api/role?page='+activePage;
>>>>>>> af937bda31ab06b0bd633641c573cd76f42dfaa9
    const data = await fetch(url, {
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
      }
    }).then(res => res.json()) 
    this.setState({
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
      editRoles: data.roles
    })       
  }
  async componentDidMount(){
    //const {firstName, lastName, email} = this.state;
    const columns = this.state.listRoles.columns;
    let {editRoles,editRolesName} = this.state;
    var url = 'https://api.enclavei3dev.tk/api/role';
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
      onChange={() => handleCheck(e.name,listId[index])} />
    })
    function handleCheck(name,id){
      editRoles.push(id); 
      editRolesName.push(name);
    }
    this.setState({
      listRoles : {
        columns: columns,
        rows: data.data
      },
      editRoles: editRoles,
      editRolesName: editRolesName
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

<<<<<<< HEAD
  handleSubmit = () => {
    const {id} = this.props.match.params;
    const {editFullName,editEmail,editPhone,
      editAddress,editRoles,editRolesName} = this.state;
    var url = 'https://api.enclavei3dev.tk/api/user/'+id;
    fetch(url, {
      method: 'PUT', 
=======
    addRole(data) {
      this.setState({
        rows: data.data
      })
    }

    
    
    removeItem(element,id){
      
     let {rows} = this.state;
     const index = rows.indexOf(element);
     var url = 'https://api.enclavei3dev.tk/api/role'; 
     fetch(url, {
      method: 'DELETE', 
>>>>>>> af937bda31ab06b0bd633641c573cd76f42dfaa9
      body: JSON.stringify({
        fullname: editFullName,
        email: editEmail,
        phone: editPhone,
        address: editAddress,
        roles: editRoles
      }), 
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
<<<<<<< HEAD
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
=======
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
      var url = 'https://api.enclavei3dev.tk/api/role?page='+pageNumber;
      fetch(url, {
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
>>>>>>> af937bda31ab06b0bd633641c573cd76f42dfaa9
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
          this.setState({
            fullName: editFullName,
            email: editEmail,
            phone: editPhone,
            address: editAddress,
            roles: editRoles
          })
        })
    }})
    .catch(error => console.error('Error:', error))
  }

  render() {
    const {name,fullName,email,phone,address,roles} = this.state;
    console.log(roles);
    return (
        <div className="profile-card">
        <Card className="card-detail">
            <Card className="information-form">
              <CardBody>
                <Container>
                  <Row>
                    <Col xs="8">
                    {roles.map(e=>
                        <span style={{fontSize:'150%',display:'inline-block',paddingRight:'20%'}} key={e}>{e.name}</span> 
                    )}
                     <hr />
                    <div>
                        <Row >
                          <Col xs="5">
                          <span>Name:</span>
                          </Col>
                          <Col>
                          <span>{name}</span>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col xs="5">
                          <span>Fullname:</span>
                          </Col>
                          <Col>
                          <span>{fullName}</span>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col xs="5">
                          <span>Email: </span>
                          </Col>
                          <Col>
                          <span>{email}</span>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                        <Col xs="5">
                          <span>Phone:</span>
                          </Col>
                          <Col>
                          <span>{phone}</span>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col xs="5">
                          <span>Address:</span>
                          </Col>
                          <Col>
                          <span>{address}</span>
                          </Col>
                        </Row>
                        <br />
                    </div>
                    </Col>
                    <Col style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <img  className='profile-avatar' src='/static/media/100_10.56d054ff.jpg' />
                    </Col>
                  </Row>
                </Container>
              </CardBody>
            </Card>   
        </Card>
        <Card>
          <CardBody>
              <Row>
                <Col>
                <NumberWidget
                title="Total Articles"
                subtitle="This month"
                number="500"
                color="success"
                progress={{
                  value: 50,
                  label: 'Last month',
                }}        
                />
                </Col>
                <Col>
                <NumberWidget
                title="Total Interviews"
                subtitle="This month"
                number="3000"
                color="danger"
                progress={{
                  value: 65,
                  label: 'Last month',
                }}        
                />
                </Col>
                <Col>
                <NumberWidget
                title="Total Candidate"
                subtitle="This month"
                number="5000"
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
                      className={classnames({ tabactive: this.state.activeTab === '1' })}
                      onClick={() => { this.toggle('1'); }}
                    >
                      Articles
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ tabactive: this.state.activeTab === '2' })}
                      onClick={() => { this.toggle('2'); }}
                    >
                      Interviews
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ tabactive: this.state.activeTab === '3' })}
                      onClick={() => { this.toggle('3'); }}
                    >
                      Update
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
                  <Card style={{width:'50%'}}>
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
                    <CollapsePermission name='roles' data={this.state.listRoles}/>
                    <Button style={{marginLeft:'80%'}}color='success' onClick={this.handleSubmit}>Update</Button>
                    </FormGroup>
                    </Form>
                    </CardBody>
                  </Card>
                  </TabPane>
                </TabContent>
          </CardBody>
        </Card>
        </div>
      
    )
  }
}
