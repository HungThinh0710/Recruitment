import logo200Image from '../assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import './LoginPage.css';
export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      redirect: false,
      token: '',
      password: '',
      checkToken: false,
      password_confirmation: '',
      messenger: '',
      checked: false,
      showCircleVerifyToken: true,
      showError: false,
      circleLoading: false,
      showSuccess: false,
      readonly:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  componentWillMount() {
    this.setState({ showCircleVerifyToken: true })
    var urlString = window.location.href;
    var url = new URL(urlString);
    var token = url.searchParams.get('token');
    this.verifyToken(token);
  }

  verifyToken(token) {
    var url = 'https://api.enclavei3.tk/api/password/verify/' + token;
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(response => {
        if (response.status === 200) {
          response.json().then(data => {
            this.setState({
              token: token,
              checkToken: true,
              showCircleVerifyToken: false,
            });
          });
        }
        else {
          response.json().then(data => {
            this.setState({
              showCircleVerifyToken: false,
            });
          });
        }
      })
      .catch(error => console.error('Error:', error));
  }

  handleSubmit() {
    const { token, password, password_confirmation } = this.state;

    this.setState({ circleLoading: false, showError: false, showSuccess: false, circleLoading: true, });

    if (password === '' || password_confirmation === '') {
      this.setState({
        showError: true,
        circleLoading: false,
        messenger: 'Please enter the password or password confirmation.'
      });
    }

    else if (password !== password_confirmation) {
      this.setState({
        showError: true,
        circleLoading: false,
        messenger: 'The password confirmation does not match.'
      });
    }

    else if (password != "" && password_confirmation != "") {
      var url = 'https://api.enclavei3.tk/api/password/reset';
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          password: password,
          password_confirmation: password_confirmation,
          token: token
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
        .then(response => {
          if (response.status === 404) {
            this.setState({
              messenger: 'Token is not found.',
              showError: true,
              showSuccess: false,
              circleLoading: false,
            });
          }
          if (response.status === 422) {
            this.setState({
              showError: true,
              showSuccess: false,
              messenger: 'Invalid password.',
              circleLoading: false,
            });
          }
          if (response.status === 200) {
            setTimeout(()=>this.backToLoginPage(), 2500);
            response.json().then(data => {
              this.setState({
                showSuccess: true,
                password: "",
                password_confirmation: "",
                messenger: data.message,
                checked: true,
                circleLoading: false,
                readonly:'readonly'
              });
              
            });
          }
        })
        .catch(error => console.error('Error:', error));
    }

  }
  handleKeyUp = event => {
    if (event.keyCode === 13) return this.handleSubmit(event);
  };
  backToLoginPage = () => {
    this.props.history.push('/dashboard/login');
  };


  render() {
    const {
      showLogo,
      passwordLabel,
      confirmPasswordLabel,
      onLogoClick,
      passwordInputProps,
      confirmPasswordInputProps
    } = this.props;

    return (
      <div className="container login-container">
        <div className="container-frame">
          <div className="login-form">
            <div className="login-title">
              <img
                src={logo200Image}
                className="rounded"
                style={{ width: '70%', cursor: 'pointer' }}
                alt="logo"
                onClick={onLogoClick}
              />
            </div>
            <hr />
            {!this.state.showCircleVerifyToken ? (<div>
              {this.state.checkToken ? (
                <div className="login-body">
                  <div className="form-input" onKeyUp={this.handleKeyUp}>
                    {!this.state.showError && this.state.showSuccess && <div className="error-message-alert alert alert-success" role="alert">
                      <div className="text-error">{this.state.messenger + ". You will redirect after 2 seconds."} 
                      </div>
                    </div>
                    }
                    {this.state.showError && <div className="error-message-alert alert alert-danger" role="alert">
                      <div className="text-error">{this.state.messenger} </div>
                    </div>}
                    <input onChange={this.handleChange} value={this.state.password} name="password" type="password" className='login-input-text' placeholder="Password" />
                    <input onChange={this.handleChange} value={this.state.password_confirmation} name="password_confirmation" type="password" className="login-input-text" placeholder="Password cofirmation" />
                  </div>
                  <div className="form-forgot text-right">
                  </div>
                  <div className="form-submit">
                    
                    <button className="btn-login-form" onClick={() => this.handleSubmit()} disabled={this.state.circleLoading || this.state.showSuccess}>
                      {!this.state.circleLoading && <span>Change password</span>}

                      {this.state.circleLoading && (
                        <div>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          <span style={{ paddingLeft: '4px' }}>Loading...</span>
                        </div>)}

                    </button>
                  </div>
                </div>)
                :
                (<div className="login-body">
                  <div className="form-input" onKeyUp={this.handleKeyUp}>
                    <div className="error-message-alert alert alert-danger" role="alert">
                      <div className="text-error text-center">The link is expired or incorrect.</div>
                    </div>
                  </div>
                  <div className="form-forgot text-right">
                  </div>
                  <div className="form-submit">
                    <button className="btn-login-form" onClick={() => this.backToLoginPage()}>
                      {!this.state.circleLoading && <span>BACK TO LOGIN</span>}
                    </button>
                  </div>
                </div>)}
            </div>)
              : (
                <div className="login-body">
                  <div className="form-input" onKeyUp={this.handleKeyUp}>
                    <div class="spinner-grow text-success" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                  <div className="form-forgot text-right">
                  </div>
                </div>)
            }
            <hr />
            <div className="login-footer">
              <div className="login-footer-text">© 2007 - 2019 - Enclave Recruitment management</div>
            </div>
          </div>
        </div>
      </div>
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
  onLogoClick: PropTypes.func
};

ResetPassword.defaultProps = {
  showLogo: true,
  passwordLabel: 'New Password',
  passwordInputProps: {
    type: 'password',
    name: 'password'
  },
  confirmPasswordLabel: 'Confirm New Password',
  confirmPasswordInputProps: {
    type: 'password',
    name: 'password_confirmation'
  },
  onLogoClick: () => { }
};
