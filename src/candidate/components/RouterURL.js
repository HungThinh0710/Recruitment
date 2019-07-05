import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Homepage from './Hompage';
import Joblistings from './Careers';
import {NavItem} from 'react-bootstrap';
import './layout.css';
class RouterURL extends Component {
    render() {
        return(
            <div className="row align-items-center">
     
              <div className="site-logo col-4"><img src="/candidate/images/download.png" width="40px"/></div>
              <div className="site-logo col-5"><NavLink to="/">&nbsp; &nbsp; &nbsp; Enclave</NavLink></div>
              <nav className="mx-auto site-navigation">
                <ul id="nav" className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
                  <li><NavLink to={"/home"} exact className="smoothscroll">Home</NavLink></li>
                  <li><NavLink to={"/careers"} className="smoothscroll">Job Opening</NavLink></li>
                  <li><NavLink to={"/about"} className="smoothscroll">About</NavLink></li>
                  <li><a >Services</a></li>
                  <li><a >Apply</a></li>
                  <li className="d-lg-none"><a >Contact Us</a></li>
                </ul>
              </nav>
              <div className="right-cta-menu text-right d-flex aligin-items-center col-6">
                <div className="ml-auto">
                  <a href="contact.html" className="btn btn-primary border-width-2 d-none d-lg-inline-block"><span className="mr-2 icon-paper-plane" />Contact Us</a>
                </div>
                <a href="#" className="site-menu-toggle js-menu-toggle d-inline-block d-xl-none mt-lg-2 ml-3"><span className="icon-menu h3 m-0 p-0 mt-2" /></a>
              </div>
            </div>
            
        )
    }
}
export default RouterURL;