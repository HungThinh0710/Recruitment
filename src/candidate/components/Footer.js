import React, { Component } from 'react';
import RouterURL from './RouterURL';
export default class Footer extends Component {
  render() {
    return (
        <footer className="page-footer font-small grey darken-3 py-1">
            <div className="container">
              <div class="row">
                <div class="col-md-12 py-1">
                  <div class="mb-5 flex-center footer-social">
                    <h5>Contact us: &nbsp;</h5>
                    <a href="#"><span className="icon-facebook" /></a>
                    <a href="#"><span className="icon-twitter" /></a>
                    <a href="#"><span className="icon-instagram" /></a>
                    <a href="#"><span className="icon-skype" /></a>
                  </div>
                </div>
              </div>
              <div className="footer-copyright text-center py-3">
                © 2007 - 2019 TRG-Enclave:12. All Rights Reserved. Terms and Conditions.
            </div>
            </div>
          </footer>
    )
  }
}