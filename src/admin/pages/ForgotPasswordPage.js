import logo200Image from '../assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import {Redirect,Link} from 'react-router-dom';
import './LoginPage.css';


export default class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      redirect:false,
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


  handleSubmit(){
    const {email} = this.state;
    var url ='https://api.enclavei3dev.tk/api/password/forgot';
    fetch(url, {
          method: 'POST', 
          body: JSON.stringify({
            email: email
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
              messenger:'Error Email'
            })
          }
          if(response.status === 422) {
            this.setState({
              messenger:'Invalid Email'
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
      emailLabel,
      emailInputProps,
      onLogoClick,
    } = this.props;

    return (
      <Form className='form-login' onSubmit={this.handleSubmit}>
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
        <FormGroup className='input-area' style={{marginBottom:'5%'}}>
          <h5>Please enter the email to reset password</h5>
        </FormGroup>
        <FormGroup className='input-area'  >
        {this.state.checked ? (
          <span style={{color:'green'}}>{this.state.messenger}</span>
        ):(
          <span style={{color:'red'}}>{this.state.messenger}</span>
        )}
        </FormGroup>
        
        <FormGroup className='input-area' style={{marginBottom:'5%'}}>
          <Label for={emailLabel}>{emailLabel}</Label>
          <Input {...emailInputProps} value ={this.state.username} onChange={this.handleChange}/>
        </FormGroup>
        {/* {this.renderRedirect()} */}
        <Button
          size="lg"
          className="btn-login"
          block
          onClick={this.handleSubmit}> Submit
        </Button>
      </Form>
    );
  }
}

ForgotPasswordPage.propTypes = {
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

ForgotPasswordPage.defaultProps = {
  showLogo: true,
  emailLabel: 'Email',
  emailInputProps: {
    type: 'email',
    name:'email',
    
  },
  onLogoClick: () => {}
};

