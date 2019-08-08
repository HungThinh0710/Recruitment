import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Form,
  Label,
  Input,
  Row,
  Col
} from 'reactstrap';
import { MdEdit } from 'react-icons/md';
import TechnicalSkill from '../components/TechnicalSkill';

const fullNameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default class ModalEditInterview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      phone: '',
      address: '',
      interviews: [],
      technicalSkill: [],
      loading: true,
      formError: {
        fullname: '',
        email: '',
        phone: ''
      },
      amountTechnicalSkills: 0,
      arrayTechnicalSkillComponents: [],
      dataTechnicalSkills: [],
      image: '',
      errorData: '',
      modal: false,
      modalError: false,
      modalSuccess: false,
      showErrorMessage: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
    this.handleErrorMessage = this.handleErrorMessage.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props;
    const { dataTechnicalSkills } = this.state;
    var j = -1;
    var url = 'https://api.enclavei3.tk/api/interviewer/' + id;
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    data.technicalSkill.map(e => {
      dataTechnicalSkills.push(e.name + '-' + e.year);
      return dataTechnicalSkills;
    });
    this.setState({
      fullname: data.fullname,
      address: data.address,
      email: data.email,
      phone: data.phone,
      technicalSkill: data.technicalSkill,
      amountTechnicalSkills: data.technicalSkill.length,
      arrayTechnicalSkillComponents: data.technicalSkill.map(e => {
        j++;
        return (
          <TechnicalSkill
            key={j}
            function={this.getDataTechnicalSkill.bind(this)}
            functionGetElement={this.removeTechnicalSkill.bind(this)}
            id={j}
            data={e}
            isDeleted={true}
          />
        );
      }),
      dataTechnicalSkills: dataTechnicalSkills
    });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggleModalSuccess() {
    this.setState(prevState => ({
      modalSuccess: !prevState.modalSuccess
    }));
  }

  toggleModalError() {
    this.setState(prevState => ({
      modalError: !prevState.modalError
    }));
  }

  handleChange(event) {
    var { formError } = this.state;
    switch (event.target.name) {
      case 'fullname':
        if (event.target.value.length === 0) {
          formError.fullname = 'Full Name is required';
        } else {
          fullNameRegex.test(event.target.value)
            ? (formError.fullname = '')
            : (formError.fullname =
                'Full Name cannot contain the number/special characters');
        }
        break;
      case 'email':
        if (event.target.value.length === 0) {
          formError.email = 'Email is required';
        } else {
          emailRegex.test(event.target.value)
            ? (formError.email = '')
            : (formError.email = 'Invalid Email');
        }
        break;
      case 'phone':
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

  handleErrorMessage = () => {
    this.setState({
      showErrorMessage: true
    });
  };

  handleSubmit() {
    const { dataTechnicalSkills, fullname, address, email, phone } = this.state;
    const { id } = this.props;
    var array = [];
    dataTechnicalSkills.map(e => {
      if (typeof e == 'string') array.push(e);
      return array;
    });
    var arrayString = array.toString();
    var url = 'https://api.enclavei3.tk/api/interviewer/' + id;
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        fullname: fullname,
        email: email,
        phone: phone,
        address: address,
        technicalSkill: arrayString
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    })
      .then(res => {
        if (res.status === 401) {
          alert('Add Failed');
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
          var update = true;
          this.toggleModalSuccess();
          this.props.getUpdate(update);
        }
      })
      .catch(error => console.error('Error:', error));
  }

  getDataTechnicalSkill(technicalskill, year, id) {
    var { dataTechnicalSkills } = this.state;
    if (technicalskill && year) {
      var tech = technicalskill.value + '-' + year;
      if (!dataTechnicalSkills[id]) {
        dataTechnicalSkills.push(tech);
      } else {
        dataTechnicalSkills[id] = tech;
      }
      this.setState({
        dataTechnicalSkills: dataTechnicalSkills
      });
    }
  }

  removeTechnicalSkill(element, id) {
    var {
      dataTechnicalSkills,
      arrayTechnicalSkillComponents,
      amountTechnicalSkills
    } = this.state;
    dataTechnicalSkills.splice(id, 1, 0);
    element.remove();
    this.setState({
      dataTechnicalSkills: dataTechnicalSkills,
      arrayTechnicalSkillComponents: arrayTechnicalSkillComponents,
      amountTechnicalSkills: amountTechnicalSkills
    });
  }

  createTechnicalSkill = () => {
    var { amountTechnicalSkills, arrayTechnicalSkillComponents } = this.state;
    amountTechnicalSkills = amountTechnicalSkills + 1;
    arrayTechnicalSkillComponents = [];
    for (var j = 0; j < amountTechnicalSkills; j++) {
      arrayTechnicalSkillComponents.push(
        <TechnicalSkill
          key={j}
          function={this.getDataTechnicalSkill.bind(this)}
          functionGetElement={this.removeTechnicalSkill.bind(this)}
          id={j}
          isDeleted={true}
        />
      );
    }
    this.setState({
      amountTechnicalSkills: amountTechnicalSkills,
      arrayTechnicalSkillComponents: arrayTechnicalSkillComponents
    });
  };

  render() {
    var i = 0;
    const { formError, dataTechnicalSkills } = this.state;
    var array = [];
    dataTechnicalSkills.map(e => {
      if (typeof e == 'string') array.push(e);
      return array;
    });
    var errorTechnicalSkillMessage = '';
    array.length === 0
      ? (errorTechnicalSkillMessage = 'Technical skill is required')
      : (errorTechnicalSkillMessage = '');
    return (
      <div>
        {/*--------Modal-Success-----*/}
        <Modal
          isOpen={this.state.modalSuccess}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader
            toggle={this.toggleModalSuccess}
            className="card-header-custom"
          >
            <span className="dashboard-modal-header">Notification</span>
          </ModalHeader>
          <ModalBody>
            <span style={{ color: '#45b649' }}>Update Successfully</span>
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
          <ModalHeader
            toggle={this.toggleModalError}
            className="card-header-custom"
          >
            <span className="dashboard-modal-header">Notification</span>
          </ModalHeader>
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
        {this.props.icon ? (
          <Button
            className="button-first"
            color={this.props.color}
            onClick={this.toggle}
            style={{ color: 'white' }}
          >
            <MdEdit />
          </Button>
        ) : (
          <Button
            className="button-first"
            color={this.props.color}
            onClick={this.toggle}
          >
            Edit
          </Button>
        )}

        <Modal
          size="lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            {' '}
            <span className="dashboard-modal-header">
              Update interviewer
            </span>{' '}
          </ModalHeader>
          <ModalBody>
            <Form>
              <br />
              <br />
              <Row>
                {/* <Col xs="4">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}
                  >
                    <img
                      src="/admin/img/Default-avatar.png"
                      style={{ width: '200px' }}
                    />
                    <br />
                    <Input
                      type="file"
                      name="image"
                      style={{ padding: '5px' }}
                      onChange={this.handleChange}
                    />
                  </div>
                </Col>
                <Col xs="8"> */}
                <Col>
                  <FormGroup>
                    <Label className="title-input" for="exampleName">
                      Full Name
                    </Label>
                    <Input
                      type="text"
                      name="fullname"
                      onChange={this.handleChange}
                      value={this.state.fullname}
                    />
                    {formError.fullname !== '' &&
                      this.state.showErrorMessage && (
                        <span style={{ color: 'red' }}>
                          {formError.fullname}
                        </span>
                      )}
                  </FormGroup>
                  <FormGroup>
                    <Label className="title-input" for="exampleDescription">
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      onChange={this.handleChange}
                      value={this.state.email}
                    />
                    {formError.email !== '' && this.state.showErrorMessage && (
                      <span style={{ color: 'red' }}>{formError.email}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label className="title-input" for="exampleDescription">
                      Phone
                    </Label>
                    <Input
                      type="text"
                      name="phone"
                      onChange={this.handleChange}
                      value={this.state.phone}
                    />

                    {formError.phone !== '' && this.state.showErrorMessage && (
                      <span style={{ color: 'red' }}>{formError.phone}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label className="title-input" for="exampleDescription">
                      Address
                    </Label>
                    <Input
                      type="text"
                      name="address"
                      value={this.state.address}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Label className="title-input" for="exampleDescription">
                        Technical skill{' '}
                        <Button
                          onClick={() => this.createTechnicalSkill()}
                          style={{
                            fontSize: '15px',
                            padding: '0px 6px',
                            marginLeft: '10px'
                          }}
                        >
                          +
                        </Button>
                      </Label>
                    </div>
                    {this.state.arrayTechnicalSkillComponents.map(e => e)}
                    {errorTechnicalSkillMessage != '' &&
                      this.state.showErrorMessage && (
                        <span style={{ color: 'red' }}>
                          {errorTechnicalSkillMessage}
                        </span>
                      )}
                  </FormGroup>
                </Col>
              </Row>
              <br />
              <FormGroup
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    width: '160px',
                    justifyContent: 'space-between'
                  }}
                >
                  {errorTechnicalSkillMessage == '' &&
                  formError.fullname == '' &&
                  formError.phone == '' &&
                  formError.email == '' ? (
                    <Button color="success" onClick={this.handleSubmit}>
                      Submit
                    </Button>
                  ) : (
                    <Button color="success" onClick={this.handleErrorMessage}>
                      Submit
                    </Button>
                  )}
                  <Button onClick={this.toggle} color="secondary">
                    Back
                  </Button>
                </div>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
