import React, { Component } from 'react';
import RouterURL from './RouterURL';
export default class Homepage extends Component {
    render() {
        return(
          <section id="Home">
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
        <section className="home-section section-hero overlay bg-image" style={{backgroundImage: 'url("candidate/images/hero_1.jpg")'}} id="home-section">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-12">
                <div className="mb-5 text-center">
                  <h1 className="text-white font-weight-bold">Recruitment Enclave</h1>
                  <p>Find your dream jobs in my company</p>
                </div>
                <form method="post" className="search-jobs-form">
                  <div className="row mb-5">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                      <input type="text" className="form-control form-control-lg" placeholder="Job title, keywords..." />
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                      <select className="form-control">
                        <option>Anywhere</option>
                        <option>Office 1(453-455 Hoang Dieu)</option>
                        <option>Office 2(117 Nguyen Huu Tho)</option>
                        
                      </select>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                      <select className="form-control">
                        <option>Part Time</option>
                        <option>Full Time</option>
                        <option>Freelancer</option>
                      </select>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                      <button type="submit" className="btn btn-primary btn-lg btn-block text-white btn-search"><span className="icon-search icon mr-2" />Search Job</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="py-5 bg-image overlay-primary fixed overlay" style={{backgroundImage: 'url("candidate/images/hero_1.jpg")'}}>
          <div className="container">
            <div className="row mb-5 justify-content-center">
              <div className="col-md-7 text-center">
                <h2 className="section-title mb-2 text-white">Careers Statistics</h2>
                <p className="lead text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita unde officiis recusandae sequi excepturi corrupti.</p>
              </div>
            </div>
            <div className="row pb-0 block__19738 section-counter">
              <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <strong className="number" data-number={1930}>0</strong>
                </div>
                <span className="caption">Candidates</span>
              </div>
              <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <strong className="number" data-number={54}>0</strong>
                </div>
                <span className="caption">Jobs Posted</span>
              </div>
              <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <strong className="number" data-number={120}>0</strong>
                </div>
                <span className="caption">Jobs Filled</span>
              </div>
              <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <strong className="number" data-number={550}>0</strong>
                </div>
                <span className="caption">Companies</span>
              </div>
            </div>
          </div>
        </section>
        <section className="site-section">
          <div className="container">
            <div className="row mb-5 justify-content-center">
              <div className="col-md-7 text-center">
                <h2 className="section-title mb-2">109,234 Job Listed</h2>
              </div>
            </div>
            <div className="mb-5">
              <div className="row align-items-start job-item border-bottom pb-3 mb-3 pt-3">
                <div className="col-md-2">
                  <a href="job-single.html"><img src="candidate/images/featured-listing-1.jpg" alt="Image" className="img-fluid" /></a>
                </div>
                <div className="col-md-4">
                  <span className="badge badge-primary px-2 py-1 mb-3">Freelancer</span>
                  <h2><a href="job-single.html">Dropbox Product Designer</a> </h2>
                  <p className="meta">Publisher: <strong>John Stewart</strong> In: <strong>Design</strong></p>
                </div>
                <div className="col-md-3 text-left">
                  <h3>Melbourn</h3>
                  <span className="meta">Australia</span>
                </div>
                <div className="col-md-3 text-md-right">
                  <strong className="text-black">$60k — $100k</strong>
                </div>
              </div>
              <div className="row align-items-start job-item border-bottom pb-3 mb-3 pt-3">
                <div className="col-md-2">
                  <a href="job-single.html"><img src="candidate/images/featured-listing-2.jpg" alt="Image" className="img-fluid" /></a>
                </div>
                <div className="col-md-4">
                  <span className="badge badge-warning px-2 py-1 mb-3">Full-time</span>
                  <h2><a href="job-single.html">Creative Director in Intercom</a> </h2>
                  <p className="meta">Publisher: <strong>John Stewart</strong> In: <strong>Design</strong></p>
                </div>
                <div className="col-md-3 text-left">
                  <h3>London</h3>
                  <span className="meta">United Kingdom</span>
                </div>
                <div className="col-md-3 text-md-right">
                  <strong className="text-black">$60k — $100k</strong>
                </div>
              </div>
              <div className="row align-items-start job-item border-bottom pb-3 mb-3 pt-3">
                <div className="col-md-2">
                  <a href="job-single.html"><img src="candidate/images/featured-listing-3.jpg" alt="Image" className="img-fluid" /></a>
                </div>
                <div className="col-md-4">
                  <span className="badge badge-success px-2 py-1 mb-3">Part-time</span>
                  <h2><a href="job-single.html">FullStack Developer in Shopify</a> </h2>
                  <p className="meta">Publisher: <strong>John Stewart</strong> In: <strong>Design</strong></p>
                </div>
                <div className="col-md-3 text-left">
                  <h3>London</h3>
                  <span className="meta">United Kingdom</span>
                </div>
                <div className="col-md-3 text-md-right">
                  <strong className="text-black">$60k — $100k</strong>
                </div>
              </div>
              <div className="row align-items-start job-item border-bottom pb-3 mb-3 pt-3">
                <div className="col-md-2">
                  <a href="job-single.html"><img src="candidate/images/featured-listing-4.jpg" alt="Image" className="img-fluid" /></a>
                </div>
                <div className="col-md-4">
                  <span className="badge badge-primary px-2 py-1 mb-3">Freelancer</span>
                  <h2><a href="job-single.html">Dropbox Product Designer</a> </h2>
                  <p className="meta">Publisher: <strong>John Stewart</strong> In: <strong>Design</strong></p>
                </div>
                <div className="col-md-3 text-left">
                  <h3>Melbourn</h3>
                  <span className="meta">Australia</span>
                </div>
                <div className="col-md-3 text-md-right">
                  <strong className="text-black">$60k — $100k</strong>
                </div>
              </div>
              <div className="row align-items-start job-item border-bottom pb-3 mb-3 pt-3">
                <div className="col-md-2">
                  <a href="job-single.html"><img src="candidate/images/featured-listing-5.jpg" alt="Image" className="img-fluid" /></a>
                </div>
                <div className="col-md-4">
                  <span className="badge badge-warning px-2 py-1 mb-3">Full-time</span>
                  <h2><a href="job-single.html">Creative Director in Intercom</a> </h2>
                  <p className="meta">Publisher: <strong>John Stewart</strong> In: <strong>Design</strong></p>
                </div>
                <div className="col-md-3 text-left">
                  <h3>London</h3>
                  <span className="meta">United Kingdom</span>
                </div>
                <div className="col-md-3 text-md-right">
                  <strong className="text-black">$60k — $100k</strong>
                </div>
              </div>
              <div className="row align-items-start job-item border-bottom pb-3 mb-3 pt-3">
                <div className="col-md-2">
                  <a href="job-single.html"><img src="candidate/images/featured-listing-4.jpg" alt="Image" className="img-fluid" /></a>
                </div>
                <div className="col-md-4">
                  <span className="badge badge-success px-2 py-1 mb-3">Part-time</span>
                  <h2><a href="job-single.html">FullStack Developer in Shopify</a> </h2>
                  <p className="meta">Publisher: <strong>John Stewart</strong> In: <strong>Design</strong></p>
                </div>
                <div className="col-md-3 text-left">
                  <h3>London</h3>
                  <span className="meta">United Kingdom</span>
                </div>
                <div className="col-md-3 text-md-right">
                  <strong className="text-black">$60k — $100k</strong>
                </div>
              </div>
              <div className="row align-items-start job-item border-bottom pb-3 mb-3 pt-3">
                <div className="col-md-2">
                  <a href="job-single.html"><img src="candidate/images/featured-listing-3.jpg" alt="Image" className="img-fluid" /></a>
                </div>
                <div className="col-md-4">
                  <span className="badge badge-success px-2 py-1 mb-3">Part-time</span>
                  <h2><a href="job-single.html">FullStack Developer in Shopify</a> </h2>
                  <p className="meta">Publisher: <strong>John Stewart</strong> In: <strong>Design</strong></p>
                </div>
                <div className="col-md-3 text-left">
                  <h3>London</h3>
                  <span className="meta">United Kingdom</span>
                </div>
                <div className="col-md-3 text-md-right">
                  <strong className="text-black">$60k — $100k</strong>
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
                    <p className="lead">Porro error reiciendis commodi beatae omnis similique voluptate rerum ipsam fugit mollitia ipsum facilis expedita tempora suscipit iste</p>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-3 col-md-6 text-center">
                <img src="candidate/images/logo_mailchimp.svg" alt="Image" className="img-fluid logo-1" />
              </div>
              <div className="col-6 col-lg-3 col-md-6 text-center">
                <img src="candidate/images/logo_paypal.svg" alt="Image" className="img-fluid logo-2" />
              </div>
              <div className="col-6 col-lg-3 col-md-6 text-center">
                <img src="candidate/images/logo_stripe.svg" alt="Image" className="img-fluid logo-3" />
              </div>
              <div className="col-6 col-lg-3 col-md-6 text-center">
                <img src="candidate/images/logo_visa.svg" alt="Image" className="img-fluid logo-4" />
              </div>
            </div>
          </div>
        </section>
        <section className="bg-light pt-5 testimony-full">
          <div className="owl-carousel single-carousel">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 mx-auto">
                  <img className="img-fluid mx-auto" src="candidate/images/person_1.jpg" alt="Image" />
                  <blockquote>
                    <p>“Soluta quasi cum delectus eum facilis recusandae nesciunt molestias accusantium libero dolores repellat id in dolorem laborum ad modi qui at quas dolorum voluptatem voluptatum repudiandae.”</p>
                    <p><cite> — Richard Anderson</cite></p>
                  </blockquote>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-lg-6 mx-auto">
                  <img className="img-fluid mx-auto" src="candidate/images/person_2.jpg" alt="Image" />
                  <blockquote>
                    <p>“Soluta quasi cum delectus eum facilis recusandae nesciunt molestias accusantium libero dolores repellat id in dolorem laborum ad modi qui at quas dolorum voluptatem voluptatum repudiandae.”</p>
                    <p><cite> — Chris Peters</cite></p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-5 bg-image overlay-primary fixed overlay" style={{backgroundImage: 'url("candidate/images/hero_1.jpg")'}}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h2 className="text-white">Looking For A Job?</h2>
                <p className="mb-0 text-white lead">Lorem ipsum dolor sit amet consectetur adipisicing elit tempora adipisci
                  impedit.</p>
              </div>
              <div className="col-md-3 ml-auto">
                <a href="#" className="btn btn-warning btn-block btn-lg">Sign Up</a>
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
                  All rights reserved | This template is made with <i className="icon-heart-o" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
      </section>

      
        )
    }
}
