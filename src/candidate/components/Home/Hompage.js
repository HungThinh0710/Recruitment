import React, { Component } from 'react';
import RouterURL from '../RouterURL';
import './homepage.css';
import { NavLink, Link } from 'react-router-dom';
import Footer from '../Footer';
import careerdata from '../data/careerdata.json';
export default class Homepage extends Component {
  render() {
    return (
      <section id="Home">
        <div className="site-wrap" >
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
            <div className="container">
             
              <RouterURL />
            </div>
          </header>

          {/* HOME */}
          <section className="home-section section-hero overlay bg-image" style={{ backgroundImage: 'url("candidate/images/hero_1.jpg")' }} id="home-section">
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-12">
                  <div className="mb-5 text-center">
                    <h1 className="text-white font-weight-bold">Enclave Recruitment</h1>
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
          <section className="site-section" id="jobjob">
            <div className="container">
              <div className="row mb-5 justify-content-center">
                <div className="col-md-7 text-center">
                  <h2 className="section-title mb-2">Job Opening</h2>
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
              <p>

              </p>
              {careerdata.map((p, index)=> { 
                return <div pid={p.id} className="mb-1">
                    <div className="row align-items-start job-item border pb-1 mb-1 pt-1">
                  <div className="col-md-2">
                  <NavLink to={"/describe"} key={index}><img src={p.img} alt="Image" className="img-fluid" /></NavLink>
                  </div>
                  <div className="col-md-4">
                    <span className={p.color}>{p.position}</span>
                    <h2><Link to={"/describe/" + this.props.match.params.pid} key={index}>{p.name}</Link></h2>
                    
                    <p className="meta">Publisher: <strong>John Stewart</strong> In: <strong>Design</strong></p>
                  </div>
                  <div className="col-md-3 text-center justify-content-center align-items-center">
                    <h3>{p.namelocal}</h3>
                    <span className="meta">{p.local}</span>
                  </div>
                  <div className="col-md-3 text-md-right justify-content-center">
                    <strong className="text-black">{p.salary}</strong>
                  </div>
                </div>
                </div>
              })}
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
          <Footer />
        </div>
      </section>
    )
  }
}
