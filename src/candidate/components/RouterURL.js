import React, { Component } from 'react';
import {NavLink, Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import './layout.css';
class RouterURL extends Component {
    render() {
        return(
          <nav className="nav-brand">
            <div className="row align-items-center">
              <div className="site-logo col-6"><NavLink to="/"><img src="/candidate/images/EnclaveLogo.png" className="icon-image" width="200px" /></NavLink></div>
              <nav role="full-horizontal" className="mx-auto site-navigation" id="myTopnav">
                <ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
                  {/* <li className="navbar-item"><NavLink to={"/"} exact className="smoothscroll" style={{fontSize: 18}}>Home</NavLink></li> */}
                  
                </ul>
              </nav>
              
            </div>
            </nav>
            
        )
    }
}
export default withRouter(RouterURL);
