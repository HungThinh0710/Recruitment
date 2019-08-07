import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../components/Footer/Newfooter.css';
import { FacebookShareButton, FacebookIcon} from 'react-share';
export default class Footer_cindy extends Component {
  render() {
    return (
    <footer>
        <div className="footer" id="footer">
            <div className="container">
                <div className="row">
                    <div class="col-md-7 content-footer1">
                        <p>© 2007 - 2019 TRG-Enclave:12. All Rights Reserved. Terms and Conditions.</p>
                    </div>
                    <div class="col-md-5 content-footer footer-social">
                        <a className="facebook" href="https://www.facebook.com/Enclave.Recruitment"><span className="icon icon-facebook" />  </a>
                        <a className="twitter" href="https://twitter.com/EnclaveTexting"><span className="icon icon-twitter" /></a>
                        <a className="skype" href="skype:EnclaveIT.COO?chat"><span className="icon icon-skype" /></a>
                    </div>
                </div>
                <div className="row">
                    <div class="col-md-8 content-footer">
                        <p>Head office: 145-147 Nguyen Co Thach, An Loi Dong Ward, District 2, Ho Chi Minh City
                            <br />Representative office in Da Nang: 453-455 Hoang Dieu, Hai Chau District, Da Nang City 
                            <br />Policies & Regulations General
                        </p>
                    </div>
                    
                    <div class="col-md-4 content-footer right">
                        <p>Name: Technology Resources Vietnam Limited 
                        <br/>Representative: Richard Anthony William Yvanovich Business 
                        <br/>Registration certificate number: 411043000753</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    )
  }
}