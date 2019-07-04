import React, { Component } from 'react';
import RouterURL from './RouterURL';
import './about.css';
export default class About extends Component {
  render() {
    return (
      <section id="About">
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
          <section className="home-section section-hero inner-page overlay bg-image" style={{ backgroundImage: 'url("/candidate/images/hero_1.jpg")' }} id="home-section">
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-12">
                  <div className="mb-5 text-center">
                    <h1 className="text-white font-weight-bold">About Us</h1>
                    <p>Find your dream jobs in our powerful career website template.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="site-section pb-0">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <a data-fancybox data-ratio={2} href="https://vimeo.com/317571768" className="block__96788">
                    <span className="play-icon"><span className="icon-play" /></span>
                    <img src="/candidate/images/about_1.jpg" alt="Image" className="img-fluid img-shadow" />
                  </a>
                </div>
                <div className="col-lg-5 ml-auto">
                  <h2 className="section-title mb-3">Careers for Your Careers</h2>
                  <p className="lead">Eveniet voluptatibus voluptates suscipit minima, cum voluptatum ut dolor, sed facere corporis
            qui, ea quisquam quis odit minus nulla vitae. Sit, voluptatem.</p>
                  <p>Ipsum harum assumenda in eum vel eveniet numquam, cumque vero vitae enim cupiditate deserunt eligendi officia
            modi consectetur. Expedita tempora quos nobis earum hic ex asperiores quisquam optio nostrum sit!</p>
                </div>
              </div>
            </div>
          </section>
          <section className="site-section">
            <div className="container">
              <div className="row mb-5">
                <div className="col-12 text-center" data-aos="fade">
                  <h2 className="section-title mb-3">Our Team</h2>
                </div>
              </div>
              <div className="row align-items-center block__69944">
                <div className="col-md-6">
                  <img src="/candidate/images/person_2.jpg" alt="Image" className="img-fluid mb-4 rounded" />
                  <h3>John Smith</h3>
                  <p className="text-muted">Creative Director</p>
                  <p>Soluta quasi cum delectus eum facilis recusandae nesciunt molestias accusantium libero dolores repellat id in
                    dolorem laborum ad modi qui at quas dolorum voluptatem voluptatum repudiandae voluptatibus ut? Ex vel ad
            explicabo iure ipsa possimus consectetur neque rem molestiae eligendi velit?.</p>
                  <div className="social mt-4">
                    <a href="#"><span className="icon-facebook" /></a>
                    <a href="#"><span className="icon-twitter" /></a>
                    <a href="#"><span className="icon-instagram" /></a>
                    <a href="#"><span className="icon-linkedin" /></a>
                  </div>
                </div>
                <div className="col-md-6 order-md-2">
                  <img src="/candidate/images/person_1.jpg" alt="Image" className="img-fluid mb-4 rounded" />
                  <h3>Drew Anderson</h3>
                  <p className="text-muted">Creative Director</p>
                  <p>Soluta quasi cum delectus eum facilis recusandae nesciunt molestias accusantium libero dolores repellat id in
                    dolorem laborum ad modi qui at quas dolorum voluptatem voluptatum repudiandae voluptatibus ut? Ex vel ad
            explicabo iure ipsa possimus consectetur neque rem molestiae eligendi velit?.</p>
                  <div className="social mt-4">
                    <a href="#"><span className="icon-facebook" /></a>
                    <a href="#"><span className="icon-twitter" /></a>
                    <a href="#"><span className="icon-instagram" /></a>
                    <a href="#"><span className="icon-linkedin" /></a>
                  </div>
                </div>
              </div>
            </div></section>
          <section className="py-5 bg-image overlay-primary fixed overlay" id="next-section" style={{ backgroundImage: 'url("/candidate/images/hero_1.jpg")' }}>
            <div className="container">
              <div className="row mb-5 justify-content-center">
                <div className="col-md-7 text-center">
                  <h2 className="section-title mb-2 text-white">JobBoard Site Stats</h2>
                  <p className="lead text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita unde officiis
            recusandae sequi excepturi corrupti.</p>
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
          <footer className="site-footer">
            <div className="container">
              <div className="row mb-5">
                <div className="col-6 col-md-3 mb-4 mb-md-0">
                  <h3>Search Trending</h3>
                  <ul className="list-unstyled">
                    <li><a href="#">Web Design</a></li>
                    <li><a href="#">Graphic Design</a></li>
                    <li><a href="#">Web Developers</a></li>
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
            </div>
          </footer>
        </div>
      </section>

    )
  }
}