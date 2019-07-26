import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../components/Footer/footer.css';
import { FacebookShareButton, FacebookIcon} from 'react-share';
export default class Footer extends Component {
  render() {
    return (
      <div>
      <div className="footer-web">
            <div className="container">
              <div class="row">
                <div class="col-md-12 py-1">
                  <div class="mb-5 footer-social" id="fixa">
                    <span style={{fontSize: 20}}>Contact us: </span>

                    <NavLink to={"https://www.facebook.com/enclaveit"}><span className="icon-facebook" /></NavLink>
                    <NavLink to={"#"}><span className="icon-twitter" /></NavLink>
                    <NavLink to={"#"}><span className="icon-instagram" /></NavLink>
                    <NavLink to={"#"}><span className="icon-skype" /></NavLink>

                    <h6>© 2007 - 2019 TRG-Enclave:12. All Rights Reserved. Terms and Conditions.</h6>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          </div>
    )
  }
}