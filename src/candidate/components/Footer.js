import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../components/Footer/footer.css';
import { FacebookShareButton, FacebookIcon} from 'react-share';
export default class Footer extends Component {
  render() {
    return (
      <footer>
  <div className="footer" id="footer">
  
    <div className="container">
    <div class="col-md-12 py-1">
                  <div class="mb-5 text-center footer-social" id="fixa">
                    <span>Contact us: &nbsp;</span>
                    <NavLink to={"https://www.facebook.com/enclaveit"} className="facebook"><span className="icon-facebook" /></NavLink>
                    <NavLink to={"#"} className="twitter"><span className="icon-twitter" /></NavLink>
                    <NavLink to={"#"} className="skype"><span className="icon-skype" /></NavLink>
                  </div>
                </div>
      <p className="text-center textbottom"> © 2007 - 2019 TRG-Enclave:12. All Rights Reserved. Terms and Conditions. </p>
    </div>
  </div>
  {/*/.footer-bottom*/} 
</footer>

    )
  }
}