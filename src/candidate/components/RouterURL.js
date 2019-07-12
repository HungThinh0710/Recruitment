import React, { Component } from 'react';
import {NavLink, Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import './layout.css';
class RouterURL extends Component {
    render() {
        return(
          <nav className="nav-brand">
            <div className="row align-items-center">
              <div className="site-logo col-6"><NavLink to="/"><img src="/candidate/images/EnclaveLogo.png" className="icon-image" width="200px"/></NavLink></div>
              <nav role="full-horizontal" className="mx-auto site-navigation" id="myTopnav">
                <ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
                  <li className="navbar-item"><NavLink to={"/home"} exact className="smoothscroll">Home</NavLink></li>
                  <li className="navbar-item"><NavLink to={"/careers"} className="smoothscroll">Job Opening</NavLink></li>
                  <li className="navbar-item"><NavLink to={"/about"} className="smoothscroll">About</NavLink></li>
                  <li><a href="#jobjob">Services</a></li>
                  <li><Link to={"#"}>Apply</Link></li>
                  <li className="d-lg-none"><Link to={"#"}>Contact Us</Link></li>
                </ul>
              </nav>
              <div className="right-cta-menu text-right d-flex aligin-items-center col-6">
              
                <div className="ml-auto">
                  <NavLink to={"#"} className="btn btn-primary border-width-2 d-none d-lg-inline-block"><a><span className="mr-2 icon-paper-plane" />Contact Us</a></NavLink>
                </div>
                <NavLink to={"#"} className="site-menu-toggle js-menu-toggle d-inline-block d-xl-none mt-lg-2 ml-3"><a><span className="icon-menu h3 m-0 p-0 mt-1" /></a></NavLink>
              </div>
            </div>
            </nav>
            
        )
    }
}
export default withRouter(RouterURL);