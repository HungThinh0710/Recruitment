import React, { Component } from 'react';
import {NavLink, Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import './layout.css';
class RouterURL extends Component {
    render() {
        return(
            <div className="row align-items-center">
              <div className="site-logo col-4"><NavLink to="/"><img src="/candidate/images/EnclaveLogo.png" width="200px"/></NavLink></div>
              <nav className="mx-auto site-navigation topnav" id="myTopnav">
                <ul className="navbar-header" className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
                  <li className="navbar-item"><Link to={"/home"} exact className="smoothscroll">Home</Link></li>
                  <li className="navbar-item"><Link to={"/careers"} className="smoothscroll">Job Opening</Link></li>
                  <li className="navbar-item"><Link to={"/about"} className="smoothscroll">About</Link></li>
                  <li><a href="#jobjob">Services</a></li>
                  <li><Link to={"#"}>Apply</Link></li>
                  <li className="d-lg-none"><Link to={"#"}>Contact Us</Link></li>
                </ul>
              </nav>
              <div className="right-cta-menu text-right d-flex aligin-items-center col-6">
                <div className="ml-auto">
                  <NavLink to={"#"} className="btn btn-primary border-width-2 d-none d-lg-inline-block"><span className="mr-2 icon-paper-plane" />Contact Us</NavLink>
                </div>
                <NavLink to={"#"} className="site-menu-toggle js-menu-toggle d-inline-block d-xl-none mt-lg-2 ml-3"><span className="icon-menu h3 m-0 p-0 mt-2" /></NavLink>
              </div>
            </div>
            
        )
    }
}
export default withRouter(RouterURL);