import logo200Image from '../assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import {Redirect,Link} from 'react-router-dom';
import './LoginPage.css';
export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      redirect:false,
      token:'',
      password:'',
      checkToken:false,
      password_confirmation:'',
      messenger:'',
      checked: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  componentWillMount(){
    var urlString = window.location.href;
    var url = new URL(urlString);
    var token = url.searchParams.get("token");
    this.verifyToken(token);
  }

  verifyToken(token){
    var url = 'https://api.enclavei3dev.tk/api/password/verify/'+token;
    fetch(url, {
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })            
    .then(response => {
      if(response.status === 200) {
        response.json().then(data => {
          this.setState({
            token:token,
            checkToken:true
          })  
        })
      }
    })
    .catch(error => console.error('Error:', error));
  }
  handleSubmit(){
    const {token,password,password_confirmation} = this.state;
    var url = 'https://api.enclavei3dev.tk/api/password/reset'
    fetch(url, {
      method: 'POST', 
      body: JSON.stringify({
        password: password,
        password_confirmation: password_confirmation,
        token: token
      }), 
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })            
    .then(response => {
      if(response.status === 404) {
        this.setState({
          messenger:'Error Token'
        })
      }
      if(response.status === 422) {
        this.setState({
          messenger:'Invalid Password'
        })
      }
      if(response.status === 200) {
        response.json().then(data => {
          
          this.setState({
            messenger:data.message,
            checked: true
          })
        })
      }
    })
    .catch(error => console.error('Error:', error));
  }
  render() {
    const {
      showLogo,
      passwordLabel,
      confirmPasswordLabel,
      onLogoClick,
      passwordInputProps,
      confirmPasswordInputProps,
    } = this.props;

    return (
      <Form className='form-login' onSubmit={this.handleSubmit}>
        {this.state.checkToken ? (
          <div>
            {showLogo && (
              <div className="text-center pb-4" style={{marginBottom:'5%'}}>
                <img
                  src={logo200Image}
                  className="rounded"
                  style={{ width: '70%', cursor: 'pointer' }}
                  alt="logo"
                  onClick={onLogoClick}
                />
                <span></span>
              </div>
            )}
            <FormGroup className='input-area'  >
            {this.state.checked ? (
              <span style={{color:'green'}}>{this.state.messenger}</span>
            ):(
              <span style={{color:'red'}}>{this.state.messenger}</span>
            )}
            </FormGroup>
            
            <FormGroup className='input-area' style={{marginBottom:'5%'}}>
              <Label for={passwordLabel}>{passwordLabel}</Label>
              <Input {...passwordInputProps}  onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup className='input-area' style={{marginBottom:'5%'}}>
              <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
              <Input {...confirmPasswordInputProps}  onChange={this.handleChange}/>
            </FormGroup>
            {/* {this.renderRedirect()} */}
            <Button
              size="lg"
              className="btn-login"
              block
              onClick={this.handleSubmit}> Submit
            </Button>
          </div>
            
        ) : (
          <FormGroup  style={{display:'flex',justifyContent:'center'}}>
              <h4 style={{color:'red'}}>Token Is Invalid </h4>
          </FormGroup>
        )}
        
        
      </Form>
    );
  }
}

ResetPassword.propTypes = {
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

ResetPassword.defaultProps = {
  showLogo: true,
  passwordLabel: 'New Password',
  passwordInputProps: {
    type: 'password',
    name:'password',
    
  },
  confirmPasswordLabel: 'Confirm New Password',
  confirmPasswordInputProps: {
    type: 'password',
    name:'password_confirmation'
  },
  onLogoClick: () => {}
};

