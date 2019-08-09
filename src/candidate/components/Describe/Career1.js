import React, { Component } from 'react';
import RouterURL from '../RouterURL';
import Applyform from './Applyform';
import { Button, Modal, ModalFooter, Form, ModalBody, FormGroup, Label, ModalHeader } from 'reactstrap';
import './Career1.css';
import { NavLink, Link } from 'react-router-dom';
import Footer from '../Footer';
import Newfooter from '../Newfooter';
import { IntlProvider, FormattedDate } from 'react-intl';
import renderHTML from 'react-render-html';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import MetaTags from 'react-meta-tags';
import { Head } from 'react-static';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { HeadProvider, Meta, Title } from 'react-head';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import TechnicalSkill from '../TechnicalSkill';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phonevalid = /(09|03|08|07|05|[0|1|2|4|6|8|9])+([0-9]{9})\b/g;
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};
export default class Careers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      address: null,
      email: null,
      phone: null,
      CV: null,
      // loaded: 0,
      visible: true,
      modalisOpen: false,
      modalError: false,
      modalSuccess: false,
      jobID: [],
      listRecommend: [],
      IDapply: '',
      loading: true,
      title: '',
      position: '',
      amount: '',
      image: '',
      publishedOn: '',
      deadline: '',
      experience: '',
      salary: '',
      status: '',
      addressed: '',
      content: '',
      selectedFile: '',
      amountTechnicalSkills: 1,
      arrayTechnicalSkillComponents: [
        <TechnicalSkill
          key={0}
          function={this.getDataTechnicalSkill.bind(this)}
          functionGetElement={this.removeTechnicalSkill.bind(this)}
          id={0}
          isDeleted={true}
        />
      ],
      currentid: '',
      listChecked: [],
      errorData: '',
      urlInterviewer: '',
      dataTechnicalSkills: [],
      active: false,
      description: null,
      technicalSkill: null,
      Nodejs: false,
      dotnet: false,
      java: false,
      Reactjs: false,
      copied: false,
      listcandidate: [],
      formErrors: {
        fullName: '',
        addressed: '',
        email: '',
        phone: '',
        CV: '',
        description: '',
        technicalSkill: '',
        Nodejs: ''
      }


    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFilechange = this.handleFilechange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
    this.onCopy = this.onCopy.bind(this);
  }
  toggleAlert() {
    this.setState({
      visible: !this.state.visible
    })
  }
  toggleModal() {
    this.setState({
      modalisOpen: !this.state.modalisOpen
    })
  }
  toggleModalError() {
    this.setState(prevState => ({
      modalError: !prevState.modalError
    }));
  }
  toggleModalSuccess() {
    this.setState(prevState => ({
      modalSuccess: !prevState.modalSuccess
    }));
  }
onCopy = () => {
  this.setState({copied: true});
};
  async componentDidMount() {
    let headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
    const { id } = this.props.match.params;
    const data = await fetch('https://api.enclavei3.tk/api/article-web/' + id, {
      headers: headers,
    }).then(response => response.json())
    await this.setState({
      jobID: data,
      title: data.title,
      position: data.job.position,
      amount: data.job.amount,
      publishedOn: data.job.publishedOn,
      deadline: data.job.deadline,
      experience: data.job.experience,
      salary: data.job.salary,
      status: data.job.status,
      address: data.job.address,
      content: data.content,
      IDapply: data.job.id,
      image: data.image,
      currentid: id,
    });
    $("<meta name=\"fb-id\" property=\"fb:app_id\" content=\"2309010198\"/>").insertAfter($('meta[name=application-name]'))
    $("<meta property=\"og:title\" content=\"Enclave Recruitment System\" />").insertAfter($('meta[name=fb-id]'))
  }
  updateHead() {
    const link = document.createElement('meta');
    link.property = "og:title";
    link.content = "Content should be displayed";
    document.getElementsByTagName('head')[0].append(link);
  }
  async componentWillMount() {

    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
    let body = {
      "keyword": "",
      "position": "",
      "location": "",
      "category": "Recruitment",
      "experience": "",
      "orderby": "desc"
    }
    var url = 'https://api.enclavei3.tk/api/article-web';
    const data = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    }).then(res => res.json());
    setTimeout(() => {
      this.setState({
        listRecommend: data.data,
      });
    }, 500);
  }
  handleSubmit() {
    const { fullName,
      email,
      phone,
      description,
      address,
      CV,
      dataTechnicalSkills, IDapply } = this.state;
    var array = [];
    dataTechnicalSkills.map(e => {
      if (typeof e == 'string') array.push(e);
      return array;
    });
    var arrayString = array.toString();
    let configs = { header: { 'Content-Type': 'multipart/form-data' } }
    const formData = new FormData();
    formData.set('jobId', this.state.IDapply)
    formData.set('fullname', this.state.fullName);
    formData.set('email', this.state.email);
    formData.set('phone', this.state.phone);
    formData.set('address', this.state.address);
    formData.set('description', this.state.description);
    formData.set('technicalSkill', arrayString);
    formData.append('file', this.state.selectedFile);
    var url = 'https://api.enclavei3.tk/api/candidate';
    const data = axios.post(url, formData, {}, configs
    )
      .then(res => {
        if (res.status === 401) {
          alert('Add Failed');
        }
        if (res.status === 422) {
          this.toggleModalError();
          res.json().then(data => {
            const dataArray = Object.keys(data.errors).map(i => data.errors[i]);
            this.setState({
              errorData: dataArray,
              modalError: true,
              modalSuccess: false,
            });
          });
        }
        if (res.status === 200) {
          this.toggleModalSuccess();
          this.setState(prevState => ({
            modalisOpen: !prevState.modalisOpen,
            modalError: false,
            modalSuccess: true
          }
          ));
        }
      })
      .catch(error => console.error('Error:', error));
  };
  handleFile = event => {
    this.setState({
      CV: event.target.files[0],
    })
  }
  handleFilechange = e => {
    this.setState({
      selectedFile: e.target.files[0],
      loaded: 0,
    });


  }
  handleChange(e) {
    const value = e.target.value;
    let { formErrors } = this.state;
    switch (e.target.name) {
      case 'fullName':
        formErrors.fullName =
          value.length < 1 ? 'Full Name is required' : '';
        break;
      case 'addressed':
        formErrors.addressed =
          value.length < 1 ? 'Address is required' : '';
        break;
      case 'email':
        formErrors.email = emailRegex.test(value)
          ? ''
          : 'Invalid email address';
        break;
      case 'phone':
        formErrors.phone = phonevalid.test(value)
          ? ''
          : 'Invalid phone number';
        break;
      default:
        break;
    }
    this.setState({ formErrors, [e.target.name]: value })
  };
  handleErrorMessage = () => {
    var { listChecked } = this.state;
    var array1 = [...new Set(listChecked)];
    var array2 = [];
    array1.map(element => {
      var count = listChecked.filter(e => e === element);
      var length = count.length;
      if (length % 2 !== 0) {
        array2.push(element);
      }
      return array2;
    });
    this.setState({
      showErrorMessage: true,
    });
  };
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

    document.body.scrollTop = document.documentElement.scrollTop = 0;
    var i = 0;
    const { formErrors, dataTechnicalSkills, urlInterviewer, listRecommend } = this.state;
    var array = [];
    dataTechnicalSkills.map(e => {
      if (typeof e == 'string') array.push(e);
      return array;
    });
    var errorTechnicalSkillMessage = '';
    array.length === 0
      ? (errorTechnicalSkillMessage = 'Technical skill is required')
      : (errorTechnicalSkillMessage = '');
    const { id } = this.props.match.params;
    const { jobID } = this.state;
    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggleModal.bind(this)}>&times;</button>;
    return (
      <div className="site-wrap">
        <div className="site-mobile-menu site-navbar-target">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close mt-3">
              <span className="icon-close2 js-menu-toggle" />
            </div>
          </div>
          <div className="site-mobile-menu-body" />
        </div> {/* .site-mobile-menu */}
        {/* NAVBAR */}
        <header className="site-navbar mt-3">
          <div className="container-fluid">
            <RouterURL />
          </div>
          {/*--------Modal-Success-----*/}
          <Modal
            isOpen={this.state.modalSuccess}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggleModalSuccess}>
              <span className="dashboard-modal-header">Notification</span>
            </ModalHeader>
            <ModalBody>
              <span style={{ color: '#45b649' }}>
                Successfully! Thank you for your application!
              </span>
            </ModalBody>

          </Modal>
          {/*--------Modal-Success-----*/}

          {/*--------Modal-Error-----*/}
          <Modal
            isOpen={this.state.modalError}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggleModalError}>
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
        </header>
        <div>
          <section className="section-hero overlay inner-page bg-image" style={{ backgroundImage: 'url("/candidate/images/back5.jpg")' }} id="career1">
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                </div>
              </div>
            </div>
          </section>
          <section className="site-section" id="section-describe">
            <div className="container">
              <div className="row align-items-center mb-5 fix-space-sharing" >
                <div className="col-lg-8 mb-4 mb-lg-0" id="view-mobile">
                  <div className="d-flex align-items-center">
                    <div>
                      <h2 className="modify-title">{this.state.title}</h2>
                      <div class="show-line">
                        <span className="ml-0 mr-2 mb-2"><span className="icon-briefcase mr-2" />{this.state.position}</span>
                        <span className="m-2"><span className="icon-room mr-2" />{this.state.address}</span>
                        <span className="m-2"><span className="icon-clock-o mr-2" /><span className="text">{this.state.status}
                        </span></span>
                      </div>
                      <div class="show-line-2">
                        <p className="m-2"><span className="icon-briefcase mr-2" />{this.state.position}</p>
                        <p className="m-2"><span className="icon-room mr-2" />{this.state.address}</p>
                        <p className="m-2"><span className="icon-clock-o mr-2" /><span className="text">{this.state.status}</span></p>
                      </div>
                      <div class="show-line-3">
                        <div className="row text-center" style={{paddingTop: 20, paddingLeft: 15}}>
                        {/* <span className="ml-0 mr-2 mb-2"><span className="icon-briefcase mr-2" />{this.state.position}</span>
                        <span className="m-2"><span className="icon-room mr-2" />{this.state.addressed}</span>
                        <span className="m-2"><span className="icon-clock-o mr-2" /><span className="text">{this.state.status} */}
                        {/* </span></span> */}
                        {/* <div className="col-4" style ={{paddingLeft: 0, paddingRight: 0}}> */}
                        <span className="ml-0 mr-2 mb-2">
                          <div class="fb-share-button"
                            data-href={"https://enclavei3.tk/information/" + id}
                            data-layout="button_count"
                            data-size="large">
                          </div>
                        </span>  
                        {/* </div>   */}
                        {/* <div className="col-4" style ={{paddingLeft: 0, paddingRight: 0}}> */}
                        <span className="ml-0 mr-2 mb-2">
                          <a class="twitter-share-button ml-auto"
                            href={"https://enclavei3.tk/information/" + id}
                            data-size="large">
                            </a>
                        </span>
                        {/* </div> */}
                      <div className="modify-copylink">
                        <CopyToClipboard onCopy={this.onCopy} text={"https://enclavei3.tk/information/" +id}>
                        <button className="hover-clipboard">&nbsp;<span class="far fa-copy" aria-hidden="true">&nbsp;</span> <span style={{fontSize: 14, fontWeight: 'bold'}}> Link&nbsp;</span></button>
                        </CopyToClipboard>
                      </div>
                      </div>
                      </div>  
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="row">
                    <div className="col-6">
                    </div>
                    <div className="col-sm-6">
                      <Modal id="articleModal" isOpen={this.state.modalisOpen}
                        toggle={this.toggleModal.bind(this)} className={this.props.className}
                      >
                        <p></p>
                        <h3 className="modal-title" id="myModallabel" style={{ fontSize: 24, fontWeight: "bold" }}>APPLICATION FORM</h3>
                        <ModalBody>
                          <Form encType="multipart/form-data" onSubmit={this.handleSubmit} noValidate>
                            <FormGroup>
                              <div className="fullName">
                                <label class="col-form-label">Full Name<span style={{ color: 'red' }}>*</span></label>
                                <input
                                  class="form-control"
                                  className={formErrors.fullName.length > 0 ? 'error' : null}
                                  placeholder="Full Name"
                                  type="text"
                                  name="fullName"
                                  noValidate
                                  onChange={this.handleChange}
                                />
                                {formErrors.fullName.length > 0 && (
                                  <span className="errorMessage">{formErrors.fullName}</span>
                                )}
                              </div>
                            </FormGroup>
                            <FormGroup>
                              <div className="email">
                                <label class="col-form-label">Email<span style={{ color: 'red' }}>*</span></label>
                                <input
                                  class="form-control"
                                  className={formErrors.email.length > 0 ? 'error' : null}
                                  placeholder="Email"
                                  type="email"
                                  name="email"
                                  noValidate
                                  onChange={this.handleChange}
                                />
                                {formErrors.email.length > 0 && (
                                  <span className="errorMessage">{formErrors.email}</span>
                                )}
                              </div>
                            </FormGroup>
                            <FormGroup>
                              <div className="phone">
                                <label class="col-form-label">Phone<span style={{ color: 'red' }}>*</span></label>
                                <input
                                  class="form-control"
                                  className={formErrors.phone.length > 0 ? 'error' : null}
                                  placeholder="Phone"
                                  type="text"
                                  name="phone"
                                  noValidate
                                  onChange={this.handleChange}
                                />
                                {formErrors.phone.length > 0 && (
                                  <span className="errorMessage">{formErrors.phone}</span>
                                )}
                              </div>
                            </FormGroup>
                            <FormGroup>
                              <div className="address">
                                <label class="col-form-label">Address<span style={{ color: 'red' }}>*</span></label>
                                <input
                                  class="form-control"
                                  className={formErrors.addressed.length > 0 ? 'error' : null}
                                  placeholder="Address"
                                  type="text"
                                  name="addressed"
                                  noValidate
                                  onChange={this.handleChange}
                                />
                                {formErrors.addressed.length > 0 && (
                                  <span className="errorMessage">{formErrors.addressed}</span>
                                )}
                              </div>
                            </FormGroup>
                            <FormGroup>
                              <div className="CV">
                                <label class="col-form-label">Resume/CV</label>
                                <input
                                  type="file"
                                  class="form-control"
                                  className={formErrors.CV.length > 0 ? 'error' : null}
                                  placeholder="Choose your CV"
                                  name="file"
                                  noValidate
                                  multiple
                                  onChange={this.handleFilechange}
                                />
                                {formErrors.CV.length > 0 && (
                                  <span className="errorMessage">{formErrors.CV}</span>
                                )}
                              </div>
                            </FormGroup>
                            <FormGroup>
                              <div className="description">
                                <label class="col-form-label">Description</label>
                                <textarea
                                  class="form-control"
                                  className={formErrors.description.length > 0 ? 'error' : null}
                                  placeholder="Describe by yourself"
                                  type="text"
                                  name="description"
                                  noValidate
                                  onChange={this.handleChange}
                                />
                                {formErrors.description.length > 0 && (
                                  <span className="errorMessage">{formErrors.description}</span>
                                )}
                              </div>
                            </FormGroup>
                            <FormGroup>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Label for="exampleDescription">
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
                          </Form>
                        </ModalBody>
                        <ModalFooter>
                          <Button id="abc" type="submit" color="success" className="success ml-auto" onClick={this.toggleModal.bind(this)} onClick={e => this.handleSubmit(e)}>Apply</Button>{' '}
                          <Button id="abc" type="Button" className="second" onClick={this.toggleModal.bind(this)}>Close</Button>
                        </ModalFooter>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="show-jobsummary-2">
                  <div className="col-lg-4 jobsummary-moblie">
                    <div className="bg-light p-3 border rounded mb-4">
                      <h3 className="text-jobsummary mt-3 h5 pl-3 mb-3 text-center">Job Summary</h3>
                      <ul className="list-unstyled pl-3 mb-0" style={{paddingRight: 15}}>
                        <li className="mb-2"><strong className="text-black">Published on:</strong> <IntlProvider locale="fr">
                          <FormattedDate
                            value={this.state.publishedOn}
                            day="numeric"
                            month="long"
                            year="numeric" />
                        </IntlProvider></li>
                        <li className="mb-2"><strong className="text-black">Vacancy:</strong> {this.state.amount}</li>
                        <li className="mb-2"><strong className="text-black">Status:</strong> {this.state.status}</li>
                        <li className="mb-2"><strong className="text-black">Experience:</strong> {this.state.experience}</li>
                        <li className="mb-2"><strong className="text-black">Location:</strong> {this.state.address}</li>
                        <li className="mb-2"><strong className="text-black">Salary:</strong> {this.state.salary}</li>
                        {/* <li className="mb-2"><strong className="text-black">Gender:</strong> Any</li> */}
                        <li className="mb-2"><strong className="text-black">Deadline:</strong> <IntlProvider locale="fr">
                          <FormattedDate
                            value={this.state.deadline}
                            day="numeric"
                            month="long"
                            year="numeric" />
                        </IntlProvider></li>
                        <Button block={true} color="success" onClick={this.toggleModal.bind(this)} style={{marginTop: 35}}>Apply Now</Button>
                      <Button color="danger" className="close"
                        onClick={this.toggleModal.bind(this)}>{this.props.buttonLabel}
                      </Button>
                      </ul>
                    </div>
                    
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="mb-5">
                    {/**/}
                    <figure className="mb-5"><img src={"https://api.enclavei3.tk/upload/images/articles/" + this.state.image} 
                     alt="Free Website Template by Free-Template.co" className="img-fluid rounded modify-img" /></figure>
                  </div>
                  {renderHTML(this.state.content)}
                </div>
                <div className="col-lg-4">
                  <div className="show-jobsummary">
                    <div className="bg-light p-3 border rounded mb-4" style={{height: 400}}>
                      <h3 className="text-jobsummary mt-3 h5 pl-3 mb-3 text-center">Job Summary</h3>
                      <ul className="list-unstyled pl-3 mb-0 fix-job-padding-left" style={{paddingRight: 15}}>
                        <li className="mb-2"><strong className="text-black">Published on:</strong> <IntlProvider locale="fr">
                          <FormattedDate
                            value={this.state.publishedOn}
                            day="numeric"
                            month="long"
                            year="numeric" />
                        </IntlProvider></li>
                        <li className="mb-2"><strong className="text-black">Vacancy:</strong> {this.state.amount}</li>
                        <li className="mb-2"><strong className="text-black">Status:</strong> {this.state.status}</li>
                        <li className="mb-2"><strong className="text-black">Experience:</strong> {this.state.experience}</li>
                        <li className="mb-2"><strong className="text-black">Location:</strong> {this.state.address}</li>
                        <li className="mb-2"><strong className="text-black">Salary:</strong> {this.state.salary}</li>
                        {/* <li className="mb-2"><strong className="text-black">Gender:</strong> Any</li> */}
                        <li className="mb-2"><strong className="text-black">Deadline:</strong> <IntlProvider locale="fr">
                          <FormattedDate
                            value={this.state.deadline}
                            day="numeric"
                            month="long"
                            year="numeric" />
                        </IntlProvider></li>
                      </ul>
                      <Button block={true} color="success" onClick={this.toggleModal.bind(this)} style={{marginTop: 35}}>Apply Now</Button>
                      <Button color="danger" className="close"
                        onClick={this.toggleModal.bind(this)}>{this.props.buttonLabel}
                      </Button>
                    </div>

                      {/* <NavLink to={"#"} className="col-lg-3"><span class="icon-twitter" /></NavLink>
                        <NavLink to={"#"} className="col-lg-3"><span class="icon-instagram" /></NavLink>
                        <NavLink to={"#"} className="col-lg-3"><span class="icon-skype" /></NavLink> */}

                   
                  </div>
                </div>
                <div className="col-lg-8 recommendjob">


                  <h3 className="panel-title-article" style={{color: 'black', paddingBottom: 10,fontSize: 25,textTransform: 'none'}}>We Recommend</h3>
                  <div className="row">
                    <div className="col-lg-6 panel-article mr-auto" style={{paddingTop: 10}}>
                      <div className="table table-striped table-responsive-sm" cellspacing="0" cellpadding="0">
                        <tbody>
                          {listRecommend.map((list, index) => {
                            if (index < 4 && !(this.state.currentid == list.id))
                              return <tr className="border-title">
                                <td class="list-group-item article-recommend" style={{paddingBottom: 3}}>
                                  <Link className="item-info" style={{color: '#212629'}} to={"/article/" + list.id} >{list.title}</Link>
                                  <h6 className="time-update"> <IntlProvider locale="fr"><FormattedDate
                                    value={list.updated_at}
                                    day="numeric"
                                    month="long"
                                    year="numeric" />
                                  </IntlProvider>
                                  </h6>
                                </td>
                              </tr>
                          })}
                        </tbody>
                      </div>
                    </div>
                    <div className="col-lg-6 panel-article ml-auto" style={{paddingTop: 10}}>
                      <div className="table table-striped table-responsive-sm" cellspacing="0" cellpadding="0">
                        <tbody>
                          {listRecommend.map((list, index) => {
                            if (index > 2 && index < 6 && !(this.state.currentid == list.id))
                              return <tr className="border-title">
                                <td class="list-group-item article-recommend article-recommend-2" style={{paddingBottom: 3}}>
                                  <Link className="item-info" style={{color: '#212629'}} to={"/article/" + list.id} >{list.title}</Link>
                                  <h6 className="time-update"> <IntlProvider locale="fr"><FormattedDate
                                    value={list.updated_at}
                                    day="numeric"
                                    month="long"
                                    year="numeric" />
                                  </IntlProvider>
                                  </h6>
                                </td>
                              </tr>
                          })}
                        </tbody>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Newfooter />
        </div>
      </div >
    )
  }
}