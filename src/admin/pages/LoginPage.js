import logo200Image from '../assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import './LoginPage.css';
import { ClipLoader, FadeLoader } from 'react-spinners';
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
      loadingLogin: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  componentWillMount() {
    if (localStorage.getItem('access_token')) {
      this.props.history.push('/admin/role');
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ showLoadingLogin: true });
    const { username, password } = this.state;
    var url = 'https://api.enclavei3dev.tk/api/login';

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
            messenger: 'Error Password/Username'
          });
        }
        if (response.status === 422) {
          this.setState({
            messenger: 'Invalid Password/Username'
          });
        }
        if (response.status === 200) {
          response.json().then(data => {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('token_type', data.token_type);
            localStorage.setItem('expires_at', data.expires_at);
            setTimeout(() => {
              this.setState({
                redirect: true,
                loadingLogin: false
              });
            }, 500);
          });
        }
      })
      .catch(error => console.error('Error:', error));
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/admin/role" />;
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
      <Form className="form-login" onKeyUp={this.handleKeyUp}>
        {showLogo && (
          <div className="text-center pb-4" style={{ marginBottom: '5%' }}>
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: '70%', cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            />
            <span />
          </div>
        )}
        <span style={stl}>{this.state.messenger}</span>
        <FormGroup className="input-area" style={{ marginBottom: '5%' }}>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input
            {...usernameInputProps}
            value={this.state.username}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup className="input-area" style={{ marginBottom: '8%' }}>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input
            {...passwordInputProps}
            value={this.state.password}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup className="input-area" style={{ marginBottom: '8%' }}>
          <Link to="/admin/forgotpassword">
            <h6>Forgot Password</h6>
          </Link>
        </FormGroup>
        {this.state.showLoadingLogin && this.state.loadingLogin ? (
          <FormGroup className="input-area" style={{ marginBottom: '8%' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center'
              }}
              className="sweet-loading"
            >
              <FadeLoader color={'green'} loading={this.state.loadingLogin} />
            </div>
          </FormGroup>
        ) : (
          <div />
        )}

        {this.renderRedirect()}
        <Button
          size="lg"
          className="btn-login"
          block
          onClick={this.handleSubmit}
        >
          {' '}
          LOGIN
        </Button>
      </Form>
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
