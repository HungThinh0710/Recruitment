import logo200Image from '../assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import './LoginPage.css';
import { FadeLoader } from 'react-spinners';
import './ForgotPasswordPage.css';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export default class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      redirect: false,
      checked: false,
      status: false,
      showLoading: false,
      loading: true,
      errorEmailMessage: '',
      circleLoading: false,
      showError: false,
      message: 'Please enter the email to reset password.',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidUpdate() {
    if (this.state.showLoading) {
      setTimeout(() => {
        this.setState({
          showLoading: false
        });
      }, 3000);
    }
  }

  handleChange(e) {
    const { value } = e.target;
    var message = '';
    emailRegex.test(value) ? (message = '') : (message = 'Invalid Email');

    this.setState({
      [e.target.name]: e.target.value,
      errorEmailMessage: message
    });
  }

  handleBackToLogin = () => {
    this.props.history.push('/dashboard/login');
  };

  handleKeyUp = event => {
    if (event.keyCode === 13) return this.handleSubmit(event);
  };

  handleSubmit() {
    const { email } = this.state;
    this.setState({ circleLoading: true, showError: false });
    this.setState({
      status: true,
      showLoading: true
    });

    if(email == ""){
      this.setState({
        showError:true,
        circleLoading: false,
        errorMessage: 'Email is invalid.',
      })
    }
    if(email != ""){
      var url = 'https://api.enclavei3dev.tk/api/password/forgot';

      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: email
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
              circleLoading: false,
              errorMessage: "We did not recognize this email.",
              showLoading: false,
              showError: true,
              checked: false,
            }); 
          }
          if (response.status === 422) {
            this.setState({
              errorMessage: "Your email is invalid.",
              circleLoading: false,
              showLoading: false,
              showError: true,
              checked: false,
            });
          }
          if (response.status === 200) {
            response.json().then(data => {
              setTimeout(() => {
                this.setState({
                  message: data.message,
                  checked: true,
                  loading: false,
                  showLoading: false,
                  showError: false,
                  circleLoading: false,
                  email: '',
                });
              });
            }, 3000);
          }
        }).catch(error => console.error('Error:', error));
    }

  }

  render() {
    const { showLogo, emailLabel, emailInputProps, onLogoClick } = this.props;

    return (
      // <Form className="form-login" onKeyUp={this.handleKeyUp}>
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
            <div className="login-body">
              <div className="form-input" onKeyUp={this.handleKeyUp}>
                {!this.state.showError && <div className="error-message-alert alert alert-success" role="alert">
                  <div className="text-error">{this.state.message}</div>
                </div>}
                {this.state.showError && 
                <div className="error-message-alert alert alert-danger" role="alert">
                  <div className="text-error">{this.state.errorMessage}</div>
                </div>}
                <input onChange={this.handleChange} name="email" type="email" value={this.state.email} className="login-input-text" placeholder="Email" />
              </div>
              <div className="form-forgot text-right"></div>
              <div className="form-submit">
                <button className="btn-login-form" onClick={() => this.handleSubmit()} disabled={this.state.circleLoading}>
                  {!this.state.circleLoading && <span>SEND</span>}
                  {this.state.circleLoading && (
                    <div>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span style={{ paddingLeft: '4px' }}>Loading...</span>
                    </div>)}

                </button>
              </div>
            </div>
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

ForgotPasswordPage.propTypes = {
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func
};

ForgotPasswordPage.defaultProps = {
  showLogo: true,
  emailLabel: 'Email',
  emailInputProps: {
    type: 'email',
    name: 'email'
  },
  onLogoClick: () => { }
};
