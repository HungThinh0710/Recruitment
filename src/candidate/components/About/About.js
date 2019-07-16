import React, { Component } from 'react';
import RouterURL from '../RouterURL';
import './about.css';
import Footer from '../Footer';
import {Link} from 'react-router-dom';
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
          <section className="home-section section-hero inner-page overlay bg-image" style={{ backgroundImage: 'url("/candidate/images/back6.jpg")' }} id="about">
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
                    <Link to={"#"}><span className="icon-facebook" /></Link>
                    <Link to={"#"}><span className="icon-twitter" /></Link>
                    <Link to={"#"}><span className="icon-instagram" /></Link>
                    <Link to={"#"}><span className="icon-linkedin" /></Link>
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
                    <Link to={"#"}><span className="icon-facebook" /></Link>
                    <Link to={"#"}><span className="icon-twitter" /></Link>
                    <Link to={"#"}><span className="icon-instagram" /></Link>
                    <Link to={"#"}><span className="icon-linkedin" /></Link>
                  </div>
                </div>
              </div>
            </div></section>
          <Footer />
        </div>
      </section>
    )
  }
}