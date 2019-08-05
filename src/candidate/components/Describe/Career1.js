import React, { Component } from 'react';
import RouterURL from '../RouterURL';
import Applyform from './Applyform';
import { Button, Modal, ModalFooter, Form, ModalBody, FormGroup } from 'reactstrap';
import './Career1.css';
import { NavLink, Link } from 'react-router-dom';
import Footer from '../Footer';
import { IntlProvider, FormattedDate } from 'react-intl';
import renderHTML from 'react-render-html';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import MetaTags from 'react-meta-tags';
import { Head } from 'react-static';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { HeadProvider, Meta, Title } from 'react-head';
import ReactDOM from 'react-dom';
import axios from 'axios';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

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
      loading: true,
      title: '',
      position: '',
      amount: '',
      publishedOn: '',
      deadline: '',
      experience: '',
      salary: '',
      status: '',
      addressed: '',
      content: '',
      selectedFile: '',

      active: false,
      description: null,
      technicalSkill: null,
      Nodejs: false,
      dotnet: false,
      java: false,
      Reactjs: false,
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
  async componentDidMount() {
    let headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
    const { id } = this.props.match.params;
    const data = await fetch('https://api.enclavei3dev.tk/api/article-web/' + id, {
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
      addressed: data.job.address,
      content: data.content
    });
    //gia tri thay doi
    const head = document.getElementsByTagName('head')[0];
    const listMeta =  [];
    var metaApp = '<meta property="fb:app_id" content="2309010198"/>';
    
    metaApp += '<meta property="og:title" content="Enclave Recruitment System" />'
    metaApp += '<meta property="og:type" content="article" />'
    metaApp += '<meta property="og:image" content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg"/>'
    metaApp += '<meta property="og:url" content="https://enclavei3dev.tk/article/6" />'
    metaApp += '<meta property="og:description" content="Find your dream job in our company" />'

    listMeta.push(metaApp);
    head.innerHTML = listMeta + head.innerHTML;

    // this.updateHead();
    // console.log(this.state.jobID)
  }


  updateHead() {
    const link = document.createElement('meta');
    link.property = "og:title";
    link.content = "Content should be displayed";
    document.getElementsByTagName('head')[0].append(link);
  }
  handleSubmit() {

    // const formData = new FormData();

    // formData.append('file', this.state.CV, this.state.CV.name)
    const { fullName,
      email,
      phone,
      description,
      address,
      CV,
      technicalSkill } = this.state;

    let configs = { header: { 'Content-Type': 'multipart/form-data' } }
    const formData = new FormData();
    formData.set('fullname', this.state.fullName);
    formData.set('email', this.state.email);
    formData.set('phone', this.state.phone);
    formData.set('address', this.state.address);
    formData.set('description', this.state.description);
    formData.set('technicalSkill', this.state.technicalSkill);
    formData.append('file', this.state.selectedFile);
    var url = 'https://api.enclavei3dev.tk/api/candidate';
    axios.post(url, formData, {}, configs
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
              errorData: dataArray
            });
          });
        }
        if (res.status === 200) {
          this.toggleModalSuccess();
          this.setState(prevState => ({
            modalisOpen: !prevState.modalisOpen,
            modalError: false,
            modalSuccess: true
          }));

        }

      })
      .catch(error => console.error('Error:', error));
  };
  handleFile = event => {
    this.setState({
      CV: event.target.files[0],
    }, () => { console.log(this.state.CV) })

  }
  handleFilechange = e => {
    // let files = e.target.files || e.dataTransfer.files;
    //   if (!files.length)
    //         return;
    //   this.createImage(files[0]);
    this.setState({
      selectedFile: e.target.files[0],
      loaded: 0,
    });


  }
  createImage(file) {
    // let reader = new FileReader();
    // reader.onload = (e) => {
    //   this.setState({
    //     CV: e.target.result
    //   },
    //   () => {console.log(this.state.CV)})
    // };
    // reader.readAsBinaryString(file);


  }



  handleChange(e) {

    // const target = e.target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;

    const value = e.target.value;
    let { formErrors } = this.state;

    switch (e.target.name) {
      case 'fullName':
        formErrors.fullName =
          value.length < 3 ? 'minimum 3 characaters required' : '';
        break;
      case 'addressed':
        formErrors.addressed =
          value.length < 3 ? 'minimum 3 characaters required' : '';
        break;
      case 'email':
        formErrors.email = emailRegex.test(value)
          ? ''
          : 'invalid email address';
        break;
      case 'phone':
        formErrors.phone =
          value.length < 10 ? 'minimum 10 characaters required' : '';
        break;
      default:
        break;
    }

    this.setState({ formErrors, [e.target.name]: value }, () => console.log(this.state.fullName, this.state.email));
  };
  render() {
    const { formErrors } = this.state;



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
              <div className="row align-items-center mb-5">
                <div className="col-lg-8 mb-4 mb-lg-0" id="view-mobile">
                  <div className="d-flex align-items-center">
                    <div className="border p-2 d-inline-block mr-3 rounded">
                      <img src="/candidate/images/featured-listing-5.jpg" alt="Free Website Template By Free-Template.co" />
                    </div>

                    <div>

                      <h2 className="modify-title">{this.state.title}</h2>
                      <div class="show-line">
                        <span className="ml-0 mr-2 mb-2"><span className="icon-briefcase mr-2" />{this.state.position}</span>
                        <span className="m-2"><span className="icon-room mr-2" />{this.state.addressed}</span>
                        <span className="m-2"><span className="icon-clock-o mr-2" /><span className="text">{this.state.status}
                        </span></span>
                      </div>
                      <div class="show-line-2">
                        <p className="m-2"><span className="icon-briefcase mr-2" />{this.state.position}</p>
                        <p className="m-2"><span className="icon-room mr-2" />{this.state.addressed}</p>
                        <p className="m-2"><span className="icon-clock-o mr-2" /><span className="text">{this.state.status}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="row">
                    <div className="col-6">

                    </div>
                    <div className="col-sm-6">

                      <Button block={true} color="success" onClick={this.toggleModal.bind(this)} >Apply Now</Button>
                      <Button color="danger" className="close"
                        onClick={this.toggleModal.bind(this)}>{this.props.buttonLabel}
                      </Button>
                      <Modal isOpen={this.state.modalisOpen}
                        toggle={this.toggleModal.bind(this)} className={this.props.className} external={externalCloseBtn}
                      >
                        <p></p>
                        <h3 className="modal-title" id="myModallabel">Application form</h3>
                        <ModalBody>
                          <Form encType="multipart/form-data" onSubmit={this.handleSubmit} noValidate>
                            <FormGroup>
                              <div className="fullName">
                                <label class="col-form-label">Full Name</label>
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
                                <label class="col-form-label">Email</label>
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
                                <label class="col-form-label" className="phone">
                                  Phone
                                  </label>
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
                                <label class="col-form-label">Address</label>
                                <input
                                  class="form-control"
                                  className={formErrors.addressed.length > 0 ? 'error' : null}
                                  placeholder="Address"
                                  type="text"
                                  name="address"
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
                              <label class="col-form-label">Technical skill</label>
                              <select
                                class="form-control"
                                className={formErrors.technicalSkill.length > 0 ? 'error' : null}
                                placeholder="Write your technicalSkill skill here"
                                type="text"
                                name="technicalSkill"
                                noValidate
                                onChange={this.handleChange}
                              >
                                <option>Java</option>
                                <option>.NET</option>
                                <option>Python</option>
                                <option>Ruby</option>
                                <option>C++</option>
                                <option>Other</option>
                              </select>
                              {formErrors.technicalSkill.length > 0 && (
                                <span className="errorMessage">{formErrors.technicalSkill}</span>
                              )}
                            </FormGroup>
                          </Form>
                        </ModalBody>
                        <ModalFooter>
                          <Button id="abc" type="submit" color="info" className="primary ml-auto" onClick={this.toggleModal.bind(this)} onClick={e => this.handleSubmit(e)}>Apply</Button>{' '}
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
                      <ul className="list-unstyled pl-3 mb-0">
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
                        <li className="mb-2"><strong className="text-black">Location:</strong> {this.state.addressed}</li>
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
                    </div>
                    <div className="bg-light p-3 border rounded">
                      {/* <h3 className="text-primary  mt-3 h5 pl-3 mb-3 text-center"> </h3> */}
                      <div className="px-3 text-center">
                        <NavLink to={"#"} className="pt-3 pb-3 pr-3 pl-0"><span class="icon-facebook" /></NavLink>
                        <NavLink to={"#"} className="pt-3 pb-3 pr-3 pl-0"><span class="icon-twitter" /></NavLink>
                        <NavLink to={"#"} className="pt-3 pb-3 pr-3 pl-0"><span class="icon-instagram" /></NavLink>
                        <NavLink to={"#"} className="pt-3 pb-3 pr-3 pl-0"><span class="icon-skype" /></NavLink>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="mb-5">
                    <figure className="mb-5"><img src="/candidate/images/sq_img_1.jpg" alt="Free Website Template by Free-Template.co" className="img-fluid rounded modify-img" /></figure>
                  </div>
                  {renderHTML(this.state.content)}
                </div>
                <div className="col-lg-4">
                  <div className="show-jobsummary">
                    <div className="bg-light p-3 border rounded mb-4">
                      <h3 className="text-jobsummary mt-3 h5 pl-3 mb-3 text-center">Job Summary</h3>
                      <ul className="list-unstyled pl-3 mb-0">
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
                        <li className="mb-2"><strong className="text-black">Location:</strong> {this.state.addressed}</li>
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
                    </div>
                    <div className="bg-light p-3 border rounded">
                      {/* <h3 className="text-primary  mt-3 h5 pl-3 mb-3 text-center"> </h3> */}
                      <div className="text-center">
                        {/* <FacebookShareButton url={"https://enclavei3dev.tk/article/6"}></FacebookShareButton> */}
                        <div class="fb-share-button"
                          data-href={"https://enclavei3dev.tk/article/" + id}
                          data-layout="button_count">
                        </div>
                        
                        <NavLink to={"#"} className="col-lg-3"><span class="icon-twitter" /></NavLink>
                        <NavLink to={"#"} className="col-lg-3"><span class="icon-instagram" /></NavLink>
                        <NavLink to={"#"} className="col-lg-3"><span class="icon-skype" /></NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}