import React, { Component } from 'react';
import RouterURL from '../RouterURL';
import Applyform from './Applyform';
import { Button, Modal, ModalFooter } from 'reactstrap';
import './Career1.css';
import { NavLink, Link } from 'react-router-dom';
import Footer from '../Footer';
import { IntlProvider, FormattedDate } from 'react-intl';
import renderHTML from 'react-render-html';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { Helmet , Parent} from 'react-helmet';
export default class Careers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      modalisOpen: false,
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
      address: '',
      content: '',
    };
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
      address: data.job.address,
      content: data.content
    });
    console.log(this.state.jobID)
  }

  render() {
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
                        <span className="m-2"><span className="icon-room mr-2" />{this.state.address}</span>
                        <span className="m-2"><span className="icon-clock-o mr-2" /><span className="text">{this.state.status}
                        </span></span>
                      </div>
                      <div class="show-line-2">
                        <p className="m-2"><span className="icon-briefcase mr-2" />{this.state.position}</p>
                        <p className="m-2"><span className="icon-room mr-2" />{this.state.address}</p>
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
                        <Applyform />
                        <ModalFooter>
                          <Button id="abc" type="submit" color="info" className="primary ml-auto" onClick={this.toggleModal.bind(this)}>Apply</Button>{' '}
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
                    </div>

                    <div className="bg-light p-3 border rounded">
                      {/* <h3 className="text-primary  mt-3 h5 pl-3 mb-3 text-center"> </h3> */}
                      <div className="text-center">
                        {/* <FacebookShareButton url={"https://enclavei3dev.tk/article/6"}></FacebookShareButton> */}
                         
                         <Helmet>
                          <meta property="fb:app_id" content="2309010198"/>
<meta property="og:title" content="Enclave Recruitment System" />
<meta property="og:type" content="article" />
<meta property="og:image" content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg"/>
<meta property="og:url" content="https://enclavei3dev.tk/article/6" />
<meta property="og:description" content="Find your dream job in our company" />
                        </Helmet> 
                        
                        <div class="fb-share-button"
                          data-href={"https://enclavei3dev.tk/article/6"}
                          data-layout="button_count">
                        </div>
                        

                        <FacebookShareButton url={"https://enclavei3dev.tk/article/6"}> </FacebookShareButton> 
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
          <Footer />
        </div>
      </div>
    )
  }
}