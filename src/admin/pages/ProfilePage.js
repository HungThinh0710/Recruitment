
import React, { Component } from 'react'
import { Card,CardBody,CardTitle,CardSubtitle,CardImg,Button,CardText, 
  Row,Col,Container,TabContent, TabPane, Nav, NavItem, NavLink,Form,
  FormGroup,Label,Input,Modal,ModalBody,ModalFooter, ModalHeader
} from 'reactstrap';
  import classnames from 'classnames';
  import {  NumberWidget } from '../components/Widget';
  import {
    MdSettings,MdMap,MdBook,MdCancel
  } from 'react-icons/md';
import './ProfilePage.css';
import {Link} from 'react-router-dom';
import TabInformation from '../components/TabInformation';
import { ClipLoader,PulseLoader} from 'react-spinners';

/*-------Regex----------*/
const fullNameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
/*-------Regex----------*/
export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeTab: '1',
        name: '',
        fullName: '',
        email: '' ,
        phone: '' ,
        address: '',
        image: '',
        editFullName:'',
        editEmail:'',
        editPhone:'',
        editAddress:'',
        editImage:'',
        old_password:'',
        password:'',
        password_confirmation:'',
        loading: true,
        formError: {
          fullname: '',
          email: '',
          phone: ''
        },
        modalError: false,
        modalErrorPassword: false,
        modalSuccess: false,
        errorData: '',
        errorPassword:''
      };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeProfile = this.handleChangeProfile.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
    this.toggleModalErrorPassword = this.toggleModalErrorPassword.bind(this);
  }
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/admin');
    }
  }
  async componentDidMount(){
    //const {firstName, lastName, email} = this.state;
    var url = 'https://api.enclavei3dev.tk/api/current-profile';
    const data = await fetch(url, {
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
      }
    }).then(res => res.json()) 
    if (data.message !== 'Unauthenticated.'){
    setTimeout(() => {
    this.setState({
      name : data.name,
      fullName: data.fullname,
      email: data.email,
      phone: data.phone,
      address: data.address,
      image: data.image,
      editFullName: data.fullname,
      editEmail: data.email,
      editPhone: data.phone,
      editAddress: data.address,
      editImage: data.image,
      loading: false,

    })
    }, 500);    
  }  
  }
  toggle(tab) {
    
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }



  toggleModalSuccess() {
    this.setState(prevState => ({
      modalSuccess: !prevState.modalSuccess,
      modalError: false,
      modalErrorPassword: false,
      errorData:'',
      errorPassword:''
    }));
  }
  toggleModalError() {
    this.setState(prevState => ({
      modalError: !prevState.modalError,
      modalErrorPassword: false,
      modalSuccess: false,
      errorData:'',
      errorPassword:''
    }));
  }

  toggleModalErrorPassword() {
    this.setState(prevState => ({
      modalErrorPassword: !prevState.modalErrorPassword,
      modalError: false,
      modalSuccess: false,
      errorData:'',
      errorPassword:''
    }));
  }

  backToPreviousPage = () => {
    this.props.history.push('/admin/role');
  };

  changeProfile(fullName,email,phone,address) {
    this.setState({
      fullName:fullName,
      email: email,
      phone: phone,
      address: address
    })
  }

  handleChange(event) {
    var { formError } = this.state;
    switch (event.target.name) {
      case 'editFullName':
        if (event.target.value.length === 0) {
          formError.fullname = 'Full name is required';
        } else {
          fullNameRegex.test(event.target.value)
            ? (formError.fullname = '')
            : (formError.fullname =
                'Full name cannot contain the number/special characters');
        }
        break;
      case 'editEmail':
        if (event.target.value.length === 0) {
          formError.email = 'Email is required';
        } else {
          emailRegex.test(event.target.value)
            ? (formError.email = '')
            : (formError.email = 'Invalid Email');
        }
        break;
      case 'editPhone':
        if (event.target.value.length === 0) {
          formError.phone = 'Phone number is required';
        } else if (event.target.value.length < 10) {
          if (isNaN(Number(event.target.value))) {
            formError.phone = 'Phone number cannot contain the letter';
          } else {
            formError.phone = 'Phone number must have at least 10 characters';
          }
        } else {
          if (isNaN(Number(event.target.value))) {
            formError.phone = 'Phone number cannot contain the letter';
          } else {
            formError.phone = '';
          }
        }
        break;
    }

    this.setState({
      [event.target.name]: event.target.value,
      formError: {
        fullname: formError.fullname,
        email: formError.email,
        phone: formError.phone
      }
    });
  }
  
  handleChangeProfile(){
    const {editFullName,editEmail,editAddress,editPhone} = this.state;
    this.setState({
      modalError: false
    })
    var url = 'https://api.enclavei3dev.tk/api/profile'
    fetch(url, {
      method: 'PUT', 
      body: JSON.stringify({
        fullname: editFullName,
        email: editEmail,
        phone: editPhone,
        address: editAddress,
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
        this.toggleModalError();
        res.json().then(data => {
          const dataArray = Object.keys(data.errors).map(i => data.errors[i]);
          this.setState({
            errorData: dataArray
          });
        });
      }
      if (res.status === 200) {
        this.toggleModalSuccess();
        res.json().then(data =>{
          this.setState({
            fullName: editFullName,
            email: editEmail,
            phone: editPhone,
            address: editAddress,
            modalError: false,
            modalSuccess: true
          })
        })
    }})
    .catch(error => console.error('Error:', error))
  }

    handleChangePassword(){
    const {old_password,password,password_confirmation} = this.state;
    var url = 'https://api.enclavei3dev.tk/api/change-password'
    fetch(url, {
      method: 'PUT', 
      body: JSON.stringify({
        old_password: old_password,
        password: password,
        password_confirmation: password_confirmation
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
        this.toggleModalErrorPassword();
        res.json().then(data => {
          this.setState({
            errorPassword: data.message
          })
        });
      }
      if (res.status === 200) {
        this.toggleModalSuccess();
        res.json().then(data =>{
            this.setState({
              old_password: '',
              password: '',
              password_confirmation: '',
              modalErrorPassword: false,
              modalSuccess: true
            })
          
          // document.getElementById('change-password-form').remove();
        })
    }})
    .catch(error => console.error('Error:', error))
  }

  render() {
    var i = 0;
    const {name,fullName,email,phone,address,formError,password,password_confirmation,old_password} = this.state;
    return (
      <div className="profile-card">
        {/*--------Modal-Success-----*/}
        <Modal
          isOpen={this.state.modalSuccess}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModalSuccess}>
            Notification
          </ModalHeader>
          <ModalBody>
            <span style={{ color: 'green' }}>Update succesfully</span>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalSuccess}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/*--------Modal-Success-----*/}

        {/*--------Modal-Error-----*/}
        <Modal
          isOpen={this.state.modalError}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModalError}>Notification</ModalHeader>
          <ModalBody>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {this.state.errorData !== undefined &&
                this.state.errorData.length !== 0 &&
                this.state.errorData.map(e => {
                  i++;
                  return (
                    <span key={i} style={{ color: 'red' }}>
                      {e[0]}
                    </span>
                  );
                })}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalError}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/*--------Modal-Error-----*/}

        {/*--------Modal-Error-----*/}
        <Modal
          isOpen={this.state.modalErrorPassword}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModalErrorPassword}>Notification</ModalHeader>
          <ModalBody>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{color: 'red'}}>{this.state.errorPassword}</span>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalErrorPassword}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/*--------Modal-Error-----*/}
        <Card className="card-body">
        <CardTitle className="title">
            <MdCancel className="first" />
            My Profile
            <Link to="/admin/role">
              <MdCancel />
            </Link>
          </CardTitle>
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
                    >
                    <MdBook style={{marginRight:'5px'}}/>
                      Articles
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ tabactiveSecond: this.state.activeTab === '2' })}
                      onClick={() => { this.toggle('2'); }}
                    >
                      <MdMap style={{marginRight:'5px'}}/>
                      Interviews
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ tabactive: this.state.activeTab === '3' })}
                      onClick={() => { this.toggle('3'); }}
                    >
                      <MdSettings style={{marginRight:'5px'}}/>
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
                  <Row>
                    <Col>
                    <Card>
                    <CardBody>
                    <Form onSubmit={this.handleChangeProfile}>
                    <FormGroup>
                      <h4>Profile</h4>
                    </FormGroup>
                    <FormGroup>
                      <Label for="Fullname">Fullname</Label>
                      <Input type="text" name="editFullName"  value={this.state.editFullName} onChange={this.handleChange}/>
                      {this.state.formError.fullname !== '' && (                       
                        <span style={{ color: 'red' }}>
                          {this.state.formError.fullname}
                        </span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="Email">Email</Label>
                      <Input type="email" name="editEmail" value={this.state.editEmail} onChange={this.handleChange}/>
                      {this.state.formError.email !== '' && (                       
                        <span style={{ color: 'red' }}>
                          {this.state.formError.email}
                        </span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="Phone">Phone</Label>
                      <Input type="text" name="editPhone" value={this.state.editPhone} onChange={this.handleChange}/>
                      {this.state.formError.phone !== '' && (
                        <span style={{ color: 'red' }}>
                          {this.state.formError.phone}
                        </span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="Address">Address</Label>
                      <Input type="text" name="editAddress" value={this.state.editAddress} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '20px'
                      }}>
                      {
                      formError.fullname == '' &&
                      formError.email == '' &&
                      formError.phone == '' 
                      ? (
                        <Button color="success" onClick={this.handleChangeProfile}>
                          Submit
                        </Button>
                      ) : (
                        <Button color="success"  disabled>
                          Submit
                        </Button>
                      )}
                      </div>
                    </FormGroup>
                    </Form>
                    </CardBody>
                    </Card>
                    </Col>
                    
                    <Col>
                      <Card>
                        <CardBody>
                        <Form id="change-password-form" onSubmit={this.handleChangePassword}>
                        <FormGroup>
                          <h4>Password</h4>
                        </FormGroup>
                        <FormGroup>
                          <Label for="Fullname">Current Password</Label>
                          <Input type="password" name="old_password" value={this.state.old_password}  onChange={this.handleChange}/>
                          {old_password == '' && <span style={{color:'red'}}>Current password is required</span>}
                        </FormGroup>
                        <FormGroup>
                          <Label for="Email">New Password</Label>
                          <Input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                          {password == '' && <span style={{color:'red'}}>New password is required</span>}
                        </FormGroup>                      
                        <FormGroup>
                          <Label for="Phone">Confirm New Password</Label>
                          <Input type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange}/>
                          {password !== password_confirmation && <span style={{color:'red'}}>Password does not matched!</span>}
                        </FormGroup>
                        <FormGroup>
                        <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '20px'
                      }}>
                        { old_password!== '' &&
                          password_confirmation==password
                          ? (
                            <Button color="success" onClick={this.handleChangePassword}>
                              Submit
                            </Button>
                          ) : (
                            <Button color="success"  disabled>
                              Submit
                            </Button>
                          )}
                          </div>
                        </FormGroup>
                        </Form>
                        </CardBody>
                      </Card>
                    </Col>              
                  </Row>
                  </TabPane>
                </TabContent>
            
            </Container>
            <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '20px'
                }}
              >
                <Button
                  onClick={() => this.backToPreviousPage()}
                  color="secondary"
                >
                  Back
                </Button>
              </div>
          </CardBody>)}
        </Card>
        </div>
    )
  }
}
