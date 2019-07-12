import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../components/Footer/footer.css';
export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="page-footer font-small grey darken-3 py-1">
            <div className="container">
              <div class="row">
                <div class="col-md-12 py-1">
                  <div class="mb-5 flex-center footer-social" id="fixa">
                    <h5>Contact us: &nbsp;</h5>
                    <NavLink to={"#"}><span className="icon-facebook" /></NavLink>
                    <NavLink to={"#"}><span className="icon-twitter" /></NavLink>
                    <NavLink to={"#"}><span className="icon-instagram" /></NavLink>
                    <NavLink to={"#"}><span className="icon-skype" /></NavLink>
                  </div>
                </div>
              </div>
              <div className="footer-copyright text-center py-3">
                © 2007 - 2019 TRG-Enclave:12. All Rights Reserved. Terms and Conditions.
            </div>
            </div>
          </footer>
          </div>
    )
  }
}