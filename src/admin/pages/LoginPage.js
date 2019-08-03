import logo200Image from '../assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import './LoginPage.css';
import { ClipLoader, FadeLoader } from 'react-spinners';
import CheckRoleUser from './CheckRoleUser';
const Check = new CheckRoleUser();

const stl = {
  color: 'red'
};
export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      messenger: '',
      redirect: false,
      showLoadingLogin: false,
      circleLoading: false,
      showError: false,
      errorMessage:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  componentWillMount() {
    if (localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/role');
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    this.setState({ circleLoading: true, showError: false });
    const { username, password } = this.state;

    if (username == '' || password == '') {
      this.setState({
        showError:true,
        circleLoading: false,
        errorMessage: 'Username or password is invalid.',
      })
    }

    if (username != '' && password != ''){
      var url = 'https://api.enclavei3dev.tk/api/login';
      var messenger = '';
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          name: username,
          password: password
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      .then(response => {
        if (response.status === 401) {
          this.setState({
            errorMessage: 'Username or password is incorrect.',
            circleLoading: false,
            showError:true,
          });
        }
        if (response.status === 422) {
          if (username == '' && password == '')
            messenger = 'Username or password is invalid.';
          else if (password == '') messenger = 'Invalid password.';
          else if (username == '') messenger = 'Invalid username.';
          this.setState({
            circleLoading: false,
            errorMessage:messenger,
            showError:true,

          });
        }
        if (response.status === 200) {
          response.json().then(data => {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('token_type', data.token_type);
            localStorage.setItem('expires_at', data.expires_at);
            Check.test();
            setTimeout(() => {
              this.setState({
                redirect: true,
                circleLoading: false,
                showLoadingLogin: true
              });
            }, 500);
          });
        }
      })
      .catch(error => console.error('Error:', error));}
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/dashboard/role" />;
    }
  };

  handleKeyUp = event => {
    if (event.keyCode === 13) return this.handleSubmit(event);
  };

  render() {
    const {
      showLogo,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      onLogoClick
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
            <hr/>
            <div className="login-body">
              <div className="form-input" onKeyUp={this.handleKeyUp}>
               {this.state.showError && <div className="error-message-alert alert alert-danger alert-dismissible fade show" role="alert">
                  <div className="text-error">{this.state.errorMessage}</div>
                    <button type="button" onClick={()=>this.setState({showError:false})} className="close" aria-label="">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>}
                <input onChange={this.handleChange} name="username" type="text" className='login-input-text' placeholder="Username"/>
                <input onChange={this.handleChange} name="password" type="password" className="login-input-text" placeholder="Password"/>
              </div>
              <div className="form-forgot text-right">
              <Link to="/dashboard/forgotpassword" className={this.state.circleLoading && "login-disabled-link"}>
                Forgot Password
              </Link>
                  
              </div>
              {this.renderRedirect()}
              <div className="form-submit">
                <button className="btn-login-form" onClick={()=>this.handleSubmit()} disabled={this.state.circleLoading}>
                {!this.state.circleLoading && <span>Login</span>}

                {this.state.circleLoading &&  ( 
                  <div>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span style={{paddingLeft:'4px'}}>Loading...</span> 
                  </div>)}
                  
                </button>
              </div>
            </div>
            <hr/>
            <div className="login-footer">
              <div className="login-footer-text">© 2007 - 2019 - Enclave Recruitment management</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func
};

LoginPage.defaultProps = {
  showLogo: true,
  usernameLabel: 'Username',
  usernameInputProps: {
    type: 'text',
    name: 'username',
    placeholder: 'username'
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    name: 'password',
    placeholder: 'password'
  },
  onLogoClick: () => {}
};
