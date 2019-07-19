import React, { Component } from 'react';

import RouterURL from '../RouterURL';
import Applyform from './Applyform';
import { Button, Modal, ModalFooter } from 'reactstrap';
import './Career1.css';
import {NavLink} from 'react-router-dom';
import Footer from '../Footer';
export default class Careers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      modalisOpen: false
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
  render() {
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
                  <h1 className="text-white font-weight-bold">Game Audio Headset Engineer</h1>
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
                      <h2>Game Audio Headset Engineer</h2>
                      <div class="show-line">
                        <span className="ml-0 mr-2 mb-2"><span className="icon-briefcase mr-2" />Senior</span>
                        <span className="m-2"><span className="icon-room mr-2" />453-455 Hoang Dieu</span>
                        <span className="m-2"><span className="icon-clock-o mr-2" /><span className="text">Full
                    Time</span></span>
                      </div>
                      <div class="show-line-2">
                        <p className="m-2"><span className="icon-briefcase mr-2" />Senior</p>
                        <p className="m-2"><span className="icon-room mr-2" />453-455 Hoang Dieu</p>
                        <p className="m-2"><span className="icon-clock-o mr-2" /><span className="text">Full
                    Time</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="row">
                    <div className="col-6">
                     
                    </div>
                    <div className="col-sm-6">

                      <Button block={true} color="info" onClick={this.toggleModal.bind(this)} >Apply Now</Button>
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
                <div className="col-lg-8">
                  <div className="mb-5">
                    <figure className="mb-5"><img src="/candidate/images/sq_img_1.jpg" alt="Free Website Template by Free-Template.co" className="img-fluid rounded" /></figure>
                    <h3 className="h5 d-flex align-items-center mb-4 text-primary"><span className="icon-align-left mr-3" />Job
              Description</h3>
                    <p>Enclave, a company of and by software engineering professionals. We have been providing outstanding quality for software engineering and software testing services since 2007.
                      Basing on demanding features collecting from many big names in IT and ITO industries,
                      we – by ourselves – have created innovative working environment and effective solutions that are now available to all-sized companies.
            </p>
                    <p>We are looking for an experience engineer for the gaming audio headset project.</p>
                  </div>
                  <div className="mb-5">
                    <h3 className="h5 d-flex align-items-center mb-4 text-primary"><span className="icon-rocket mr-3" />Responsibilities</h3>
                    <ul className="list-unstyled m-0 p-0">
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>Work with the audio team to implement new features in new products.</span></li>
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>Work closely with the audio design team to improve our gaming headset audio.
                  </span></li>
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>Work with other engineers to interface audio systems to other game systems.</span></li>
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>Design, document, implement audio gaming headsets to achieve the team’s vision.</span></li>
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>Expand our audio technology to enable our designers to create world class game audio.
</span></li>
                    </ul>
                  </div>
                  <div className="mb-5">
                    <h3 className="h5 d-flex align-items-center mb-4 text-primary"><span className="icon-book mr-3" />Qualification</h3>
                    <h3 className="h6 d-flex align-items-center mb-4 text-primary"><span className="fas fa-bullseye" /> &nbsp; Minimum Qualification</h3>
                    <ul className="list-unstyled m-0 p-0">
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>3+ years as an Audio/Sound software Engineer.</span></li>
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>Experience with Windows Core Audio APIs.</span></li>
                      <li className="d-flex align-items-start mb-4"><span className="icon-check_circle mr-2 text-muted" /><span>Windows audio driver experience.</span></li>
                    </ul>

                    <h3 className="h6 d-flex align-items-center mb-4 text-primary"><span className="fab fa-buffer" />&nbsp; Preferred Qualification</h3>
                    <ul className="list-unstyled m-0 p-0">
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>Fluent in C++, strong C# skills.</span></li>
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>BS/BEng in Math, CS or equivalent.</span></li>
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>Experience with Universal Windows Drivers for Audio.</span></li>
                      <li className="d-flex align-items-start mb-4"><span className="icon-check_circle mr-2 text-muted" /><span>Technical knowledge of the principles of sound and audio manipulation.</span></li>
                    </ul>
                    <h3 className="h6 d-flex align-items-center mb-4 text-primary"><span className="fab fa-gripfire" />&nbsp; Bonus skills</h3>
                    <ul className="list-unstyled m-0 p-0">
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>Windows Spatial Audio Session API (SASAPI) Experience.</span></li>
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>Python.</span></li>
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>knowledge and/or experience of audio DSP technology.</span></li>

                    </ul>
                  </div>
                  <div className="mb-5">
                    <h3 className="h5 d-flex align-items-center mb-4 text-primary"><span className="icon-turned_in mr-3" />Other
              Benifits</h3>
                    <ul className="list-unstyled m-0 p-0">
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>Necessitatibus quibusdam facilis</span></li>
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>Velit
                  unde aliquam et voluptas reiciendis non sapiente labore</span></li>
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>Commodi quae ipsum quas est itaque</span></li>
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>Lorem
                  ipsum dolor sit amet, consectetur adipisicing elit</span></li>
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>Deleniti asperiores blanditiis nihil quia
                  officiis dolor</span></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="bg-light p-3 border rounded mb-4">
                    <h3 className="text-primary  mt-3 h5 pl-3 mb-3 text-center">Job Summary</h3>
                    <ul className="list-unstyled pl-3 mb-0">
                      <li className="mb-2"><strong className="text-black">Published on:</strong> July 14, 2019</li>
                      <li className="mb-2"><strong className="text-black">Vacancy:</strong> 20</li>
                      <li className="mb-2"><strong className="text-black">Status:</strong> Full-time</li>
                      <li className="mb-2"><strong className="text-black">Experience:</strong> 2 to 3 years</li>
                      <li className="mb-2"><strong className="text-black">Location:</strong> 453-455 Hoang Dieu</li>
                      <li className="mb-2"><strong className="text-black">Salary:</strong> 800$ - 1000$</li>
                      {/* <li className="mb-2"><strong className="text-black">Gender:</strong> Any</li> */}
                      <li className="mb-2"><strong className="text-black">Deadline:</strong> July 28, 2019</li>
                    </ul>
                  </div>
                  <div className="bg-light p-3 border rounded">
                    {/* <h3 className="text-primary  mt-3 h5 pl-3 mb-3 text-center"> </h3> */}
                    <div className="px-3 text-center">
                      <NavLink to={"#"} className="pt-3 pb-3 pr-3 pl-0"><span className="icon-facebook" /></NavLink>
                      <NavLink to={"#"} className="pt-3 pb-3 pr-3 pl-0"><span className="icon-twitter" /></NavLink>
                      <NavLink to={"#"} className="pt-3 pb-3 pr-3 pl-0"><span className="icon-instagram" /></NavLink>
                      <NavLink to={"#"} className="pt-3 pb-3 pr-3 pl-0"><span className="icon-skype" /></NavLink>
                    </div>
                  </div>
                </div>
              </div>
             
              
            </div>
          </section>
          <Footer/>
        </div>
      </div>
    )
  }
}