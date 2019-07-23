import logo200Image from '../assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import './LoginPage.css';
import { FadeLoader } from 'react-spinners';
import './ForgotPasswordPage.css';
export default class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      redirect: false,
      checked: false,
      status: false,
      showLoading: false,
      loading: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleBackToLogin = () => {
    console.log('backkkk');
    this.props.history.push('/admin');
  };

  handleKeyUp = event => {
    if (event.keyCode === 13) return this.handleSubmit(event);
  };

  handleSubmit() {
    const { email } = this.state;
    this.setState({
      status: true,
      showLoading: true
    });
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
            messenger: 'Error Email',
            showLoading: false,
            checked: false
          });
        }
        if (response.status === 422) {
          this.setState({
            messenger: 'Invalid Email',
            showLoading: false,
            checked: false
          });
        }
        if (response.status === 200) {
          response.json().then(data => {
            setTimeout(() => {
              this.setState({
                messenger: data.message,
                checked: true,
                loading: false,
                showLoading: false
              });
            });
          }, 3000);
        }
      })
      .catch(error => console.error('Error:', error));
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
  render() {
    const { showLogo, emailLabel, emailInputProps, onLogoClick } = this.props;

    return (
      // <Form className="form-login" onKeyUp={this.handleKeyUp}>
      <Form className="form-login" onSubmit={this.handleSubmit}>
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
        <FormGroup className="input-area">
          <h5>Please enter the email to reset password</h5>
        </FormGroup>
        {this.state.status && (
          <FormGroup className="input-area">
            {this.state.checked ? (
              <span style={{ color: 'green' }}>{this.state.messenger}</span>
            ) : (
              <span style={{ color: 'red' }}>{this.state.messenger}</span>
            )}
          </FormGroup>
        )}
        <FormGroup className="input-area" style={{ marginBottom: '5%' }}>
          <Label for={emailLabel}>{emailLabel}</Label>
          <Input
            {...emailInputProps}
            value={this.state.username}
            onChange={this.handleChange}
          />
        </FormGroup>
        {/* {this.renderRedirect()} */}
        {this.state.showLoading && this.state.loading ? (
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
        <FormGroup
          className="input-area button-area"
          style={{ marginBottom: '8%' }}
        >
          <Button
            className="btn-submitLogin"
            size="lg"
            block
            onClick={this.handleSubmit}
          >
            {' '}
            Submit
          </Button>
          <Button
            className="btn-backToLogin"
            size="lg"
            block
            color="secondary"
            onClick={() => this.handleBackToLogin()}
          >
            {' '}
            Back
          </Button>
        </FormGroup>
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
  onLogoClick: PropTypes.func
};

ForgotPasswordPage.defaultProps = {
  showLogo: true,
  emailLabel: 'Email',
  emailInputProps: {
    type: 'email',
    name: 'email'
  },
  onLogoClick: () => {}
};
