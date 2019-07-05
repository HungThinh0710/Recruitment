import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import RouterURL from './RouterURL';
import './career.css';
import Footer from './Footer';

export default class Careers extends Component {
  render() {
    return (

      <section id="joblistings">
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
          {/* HOME */}
          <section className="home-section section-hero inner-page overlay bg-image" style={{ backgroundImage: 'url("/candidate/images/hero_1.jpg")' }} id="home-section">
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-12">
                  <div className="mb-5 text-center">
                    <h1 className="text-white font-weight-bold">Job Opportunities</h1>
                    <p>Find your dream jobs in my Company.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="site-section">
            <div className="container">
              <div className="row mb-5 justify-content-center">
                <div className="col-md-7 text-center">
                  <h2 className="section-title mb-2">Job Opening</h2>
                </div>
              </div>
              <div className="mb-5">
                <div className="row align-items-start job-item border-bottom pb-3 mb-3 pt-3">
                  <div className="col-md-2">
                    <a href="job-single.html"><img src="/candidate/images/featured-listing-5.jpg" alt="Image" className="img-fluid" /></a>
                  </div>
                  <div className="col-md-4">
                    <span className="badge badge-primary px-2 py-1 mb-3">Senior</span>
                    <h2><NavLink to={"/describe"}>Game Audio Headset Engineer</NavLink></h2>
                    <p className="meta">Publisher: <strong>John Stewart</strong> In: <strong>Design</strong></p>
                  </div>
                  <div className="col-md-3 text-center">
                    <h3>Office 1</h3>
                    <span className="meta">453-455 Hoang Dieu</span>
                  </div>
                  <div className="col-md-3 text-md-right">
                    <strong className="text-black">800$ — 1000$</strong>
                  </div>
                </div>
                <div className="row align-items-start job-item border-bottom pb-3 mb-3 pt-3">
                  <div className="col-md-2">
                    <a href="job-single.html"><img src="/candidate/images/featured-listing-3.jpg" alt="Image" className="img-fluid" /></a>
                  </div>
                  <div className="col-md-4">
                    <span className="badge badge-warning px-2 py-1 mb-3">Tester</span>
                    <h2><a ></a>Automation Tester</h2>

                  </div>
                  <div className="col-md-3 text-center">
                    <h3>Office 2</h3>
                    <span className="meta">117 Nguyen Huu Tho</span>
                  </div>
                  <div className="col-md-3 text-md-right">
                    <strong className="text-black">800$ — 1000$</strong>
                  </div>
                </div>
                <div className="row align-items-start job-item border-bottom pb-3 mb-3 pt-3">
                  <div className="col-md-2">
                    <a ><img src="/candidate/images/featured-listing-3.jpg" alt="Image" className="img-fluid" /></a>
                  </div>
                  <div className="col-md-4">
                    <span className="badge badge-warning px-2 py-1 mb-3">Tester</span>
                    <h2><a >Performance Tester</a> </h2>

                  </div>
                  <div className="col-md-3 text-center">
                    <h3>Office 2</h3>
                    <span className="meta">117 Nguyen Huu Tho</span>
                  </div>
                  <div className="col-md-3 text-md-right">
                    <strong className="text-black">800$ — 1000$</strong>
                  </div>
                </div>
                <div className="row align-items-start job-item border-bottom pb-3 mb-3 pt-3">
                  <div className="col-md-2">
                    <a ><img src="/candidate/images/featured-listing-5.jpg" alt="Image" className="img-fluid" /></a>
                  </div>
                  <div className="col-md-4">
                    <span className="badge badge-primary px-2 py-1 mb-3">Senior</span>
                    <h2><a >Senior .NET Engineers</a> </h2>

                  </div>
                  <div className="col-md-3 text-center">
                    <h3>Office 1</h3>
                    <span className="meta">453-455 Hoang Dieu</span>
                  </div>
                  <div className="col-md-3 text-md-right">
                    <strong className="text-black">800$ — 1000$</strong>
                  </div>
                </div>
                <div className="row align-items-start job-item border-bottom pb-3 mb-3 pt-3">
                  <div className="col-md-2">
                    <a ><img src="/candidate/images/featured-listing-1.jpg" alt="Image" className="img-fluid" /></a>
                  </div>
                  <div className="col-md-4">
                    <span className="badge badge-success px-2 py-1 mb-3">Designer</span>
                    <h2><a >Graphic Designer</a> </h2>

                  </div>
                  <div className="col-md-3 text-center">
                    <h3>Office 1</h3>
                    <span className="meta">453-455 Hoang Dieu</span>
                  </div>
                  <div className="col-md-3 text-md-right">
                    <strong className="text-black">700$ — 800$</strong>
                  </div>
                </div>
                <div className="row align-items-start job-item border-bottom pb-3 mb-3 pt-3">
                  <div className="col-md-2">
                    <a ><img src="/candidate/images/featured-listing-5.jpg" alt="Image" className="img-fluid" /></a>
                  </div>
                  <div className="col-md-4">
                    <span className="badge badge-primary px-2 py-1 mb-3">Senior</span>
                    <h2><a >Embedded Engineers</a> </h2>

                  </div>
                  <div className="col-md-3 text-center">
                    <h3>Office 2</h3>
                    <span className="meta">117 Nguyen Huu Tho</span>
                  </div>
                  <div className="col-md-3 text-md-right">
                    <strong className="text-black">800$ — 1000$</strong>
                  </div>
                </div>
                <div className="row align-items-start job-item border-bottom pb-3 mb-3 pt-3">
                  <div className="col-md-2">
                    <a ><img src="/candidate/images/featured-listing-5.jpg" alt="Image" className="img-fluid" /></a>
                  </div>
                  <div className="col-md-4">
                    <span className="badge badge-primary px-2 py-1 mb-3">Senior</span>
                    <h2><a >iOS Engineers</a> </h2>

                  </div>
                  <div className="col-md-3 text-center">
                    <h3>Office 1</h3>
                    <span className="meta">453-455 Hoang Dieu</span>
                  </div>
                  <div className="col-md-3 text-md-right">
                    <strong className="text-black">800$ — 1000$</strong>
                  </div>
                </div>
              </div>
              <div className="row pagination-wrap">
                <div className="col-md-6 text-center text-md-left">
                  <div className="custom-pagination ml-auto">
                    <a href="#" className="prev">Previous</a>
                    <div className="d-inline-block">
                      <a href="#" className="active">1</a>
                      <a href="#">2</a>
                      <a href="#">3</a>
                      <a href="#">4</a>
                    </div>
                    <a href="#" className="next">Next</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="site-section py-4 mb-5 border-top">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-12 text-center mt-4 mb-5">
                  <div className="row justify-content-center">
                    <div className="col-md-7">
                      <h2 className="section-title mb-2">Our Candidates Work In Company</h2>
                      <p className="lead">Porro error reiciendis commodi beatae omnis similique voluptate rerum ipsam fugit
                      mollitia ipsum facilis expedita tempora suscipit iste</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3 col-md-6 text-center">
                  <img src="/candidate/images/logo_mailchimp.svg" alt="Image" className="img-fluid logo-1" />
                </div>
                <div className="col-6 col-lg-3 col-md-6 text-center">
                  <img src="/candidate/images/logo_paypal.svg" alt="Image" className="img-fluid logo-2" />
                </div>
                <div className="col-6 col-lg-3 col-md-6 text-center">
                  <img src="/candidate/images/logo_stripe.svg" alt="Image" className="img-fluid logo-3" />
                </div>
                <div className="col-6 col-lg-3 col-md-6 text-center">
                  <img src="/candidate/images/logo_visa.svg" alt="Image" className="img-fluid logo-4" />
                </div>
              </div>
            </div>
          </section>
          <Footer/>
        </div>
      </section>

    )
  }
}