import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RouterURL from './RouterURL';
import Applyform from './Applyform';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Career1.css';
export default class Careers extends Component {
  constructor(props) {
    super(props);
    this.state ={
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
          <div className="container-fluid"></div>
          
          <RouterURL />
        </header>
        <div>
          <section className="section-hero overlay inner-page bg-image" style={{ backgroundImage: 'url("/candidate/images/hero_1.jpg")' }} id="home-section">
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <h1 className="text-white font-weight-bold">Product Designer</h1>
                </div>
              </div>
            </div>
          </section>
          <section className="site-section">
            <div className="container">
              <div className="row align-items-center mb-5">
                <div className="col-lg-8 mb-4 mb-lg-0">
                  <div className="d-flex align-items-center">
                    <div className="border p-2 d-inline-block mr-3 rounded">
                      <img src="/candidate/images/featured-listing-1.jpg" alt="Free Website Template By Free-Template.co" />
                    </div>
                    <div>
                      <h2>Product Designer</h2>
                      <div>
                        <span className="ml-0 mr-2 mb-2"><span className="icon-briefcase mr-2" />Puma</span>
                        <span className="m-2"><span className="icon-room mr-2" />New York City</span>
                        <span className="m-2"><span className="icon-clock-o mr-2" /><span className="text-primary">Full
                    Time</span></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="row">
                    <div className="col-6">
                      <a href="#" className="btn btn-block btn-light btn-md"><span className="icon-heart-o mr-2 text-danger" />Save
                Job</a>
                    </div>
                    <div className="col-6">
                    
                    <Button block={true} color="info" onClick={this.toggleModal.bind(this)} >Apply Now</Button>
                      <Button color="danger" className="close" 
                        onClick={this.toggleModal.bind(this)}>{this.props.buttonLabel}
                        </Button>
                      <Modal isOpen={this.state.modalisOpen} 
                      toggle={this.toggleModal.bind(this)} className={this.props.className} external={externalCloseBtn}
                      >
                        <h3 className="modal-title" id="myModallabel">Application form</h3>
                        <Applyform />
                        <ModalFooter>
                        <Button type="submit" color="info" className="primary" onClick={this.toggleModal.bind(this)}>Apply for job</Button>{' '}
                        <Button type="Button" className="second" onClick={this.toggleModal.bind(this)}>Close</Button>
                        <small>Ready have a new job?</small>
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
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis illum fuga eveniet. Deleniti asperiores,
                      commodi quae ipsum quas est itaque, ipsa, dolore beatae voluptates nemo blanditiis iste eius officia minus.
            </p>
                    <p>Velit unde aliquam et voluptas reiciendis non sapiente labore, deleniti asperiores blanditiis nihil quia
                      officiis dolor vero iste dolore vel molestiae saepe. Id nisi, consequuntur sunt impedit quidem, vitae
              mollitia!</p>
                  </div>
                  <div className="mb-5">
                    <h3 className="h5 d-flex align-items-center mb-4 text-primary"><span className="icon-rocket mr-3" />Responsibilities</h3>
                    <ul className="list-unstyled m-0 p-0">
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>Necessitatibus quibusdam facilis</span></li>
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>Velit
                          unde aliquam et voluptas reiciendis n Velit unde aliquam et voluptas reiciendis non sapiente
                  labore</span></li>
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>Commodi quae ipsum quas est itaque</span></li>
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>Lorem
                  ipsum dolor sit amet, consectetur adipisicing elit</span></li>
                      <li className="d-flex align-items-start mb-2"><span className="icon-check_circle mr-2 text-muted" /><span>Deleniti asperiores blanditiis nihil quia
                  officiis dolor</span></li>
                    </ul>
                  </div>
                  <div className="mb-5">
                    <h3 className="h5 d-flex align-items-center mb-4 text-primary"><span className="icon-book mr-3" />Education +
              Experience</h3>
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
                    <h3 className="text-primary  mt-3 h5 pl-3 mb-3 ">Job Summary</h3>
                    <ul className="list-unstyled pl-3 mb-0">
                      <li className="mb-2"><strong className="text-black">Published on:</strong> April 14, 2019</li>
                      <li className="mb-2"><strong className="text-black">Vacancy:</strong> 20</li>
                      <li className="mb-2"><strong className="text-black">Employment Status:</strong> Full-time</li>
                      <li className="mb-2"><strong className="text-black">Experience:</strong> 2 to 3 year(s)</li>
                      <li className="mb-2"><strong className="text-black">Job Location:</strong> New ork City</li>
                      <li className="mb-2"><strong className="text-black">Salary:</strong> $60k - $100k</li>
                      <li className="mb-2"><strong className="text-black">Gender:</strong> Any</li>
                      <li className="mb-2"><strong className="text-black">Application Deadline:</strong> April 28, 2019</li>
                    </ul>
                  </div>
                  <div className="bg-light p-3 border rounded">
                    <h3 className="text-primary  mt-3 h5 pl-3 mb-3 ">Share</h3>
                    <div className="px-3">
                      <a href="#" className="pt-3 pb-3 pr-3 pl-0"><span className="icon-facebook" /></a>
                      <a href="#" className="pt-3 pb-3 pr-3 pl-0"><span className="icon-twitter" /></a>
                      <a href="#" className="pt-3 pb-3 pr-3 pl-0"><span className="icon-linkedin" /></a>
                      <a href="#" className="pt-3 pb-3 pr-3 pl-0"><span className="icon-pinterest" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer className="site-footer">
            <div className="container">
              <div className="row mb-5">
                <div className="col-6 col-md-3 mb-4 mb-md-0">
                  <h3>Search Trending</h3>
                  <ul className="list-unstyled">
                    <li><a href="#">Web Design</a></li>
                    <li><a href="#">Graphic Design</a></li>
                    <li><a href="#">Web Developers</a></li>
                    <li><a href="#">Python</a></li>
                    <li><a href="#">HTML5</a></li>
                    <li><a href="#">CSS3</a></li>
                  </ul>
                </div>
                <div className="col-6 col-md-3 mb-4 mb-md-0">
                  <h3>Company</h3>
                  <ul className="list-unstyled">
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Career</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Resources</a></li>
                  </ul>
                </div>
                <div className="col-6 col-md-3 mb-4 mb-md-0">
                  <h3>Support</h3>
                  <ul className="list-unstyled">
                    <li><a href="#">Support</a></li>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms of Service</a></li>
                  </ul>
                </div>
                <div className="col-6 col-md-3 mb-4 mb-md-0">
                  <h3>Contact Us</h3>
                  <div className="footer-social">
                    <a href="#"><span className="icon-facebook" /></a>
                    <a href="#"><span className="icon-twitter" /></a>
                    <a href="#"><span className="icon-instagram" /></a>
                    <a href="#"><span className="icon-linkedin" /></a>
                  </div>
                </div>
              </div>
              <div className="row text-center">
                <div className="col-12">
                  <p>
                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                    Copyright ©
                    All rights reserved | This template is made
            with <i className="icon-heart-o" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
      

    )
  }
}