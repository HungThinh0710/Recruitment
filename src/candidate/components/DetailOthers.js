import React, { Component } from 'react';
import RouterURL from '../components/RouterURL';
import { Button, Modal, ModalFooter, Form, ModalBody, FormGroup, Label, ModalHeader } from 'reactstrap';
import './DetailOthers.css';
import { NavLink, Link } from 'react-router-dom';
import Newfooter from '../components/Newfooter';
import renderHTML from 'react-render-html';
import { IntlProvider, FormattedDate } from 'react-intl';
import $ from 'jquery';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class Careers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobID: [],
      title: '',
      content: '',
      listOther: [],
      listid: this.props.match.params.id,
      copied: false,
    }
    console.log(this.state.listid)
    this.handleReload = this.handleReload.bind(this);
    this.onCopy = this.onCopy.bind(this);
  }


  async componentDidMount() {
    let headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const data = await fetch('https://api.enclavei3dev.tk/api/article-web/' + id, {
      headers: headers,
    }).then(response => response.json())
    await this.setState({
      jobID: data,
      title: data.title,
      content: data.content,
    });
    console.log(this.state.jobID)
    $("<meta name=\"fb-id\" property=\"fb:app_id\" content=\"2309010198\"/>").insertAfter($('meta[name=application-name]'))
    $("<meta property=\"og:title\" content=\"Enclave Recruitment System\" />").insertAfter($('meta[name=fb-id]'))
  }
  async componentWillMount() {

    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
    let body = {
      "keyword": "",
      "position": "",
      "location": "",
      "category": "Others",
      "experience": "",
      "orderby": "asc"
    }
    var url = 'https://api.enclavei3dev.tk/api/article-web';
    const data = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    }).then(res => res.json());
    setTimeout(() => {
      this.setState({
        listOther: data.data,
        listid: data.id,

      });
      console.log(this.state.listOther)
    }, 500);
  }
  handleReload() {
    window.location.reload()
  }
  onCopy = () => {
    this.setState({copied: true});
  };
  //   componentDidUpdate(prevProps) {
  //     const {
  //       match: {
  //         params: { id }
  //       }
  //     } = this.props;
  //     const prevId = prevProps.match.params.id;
  //     if (prevId !== id) {
  //       this.fetchPostData(id);
  //     }
  //     console.log(prevId)
  //   }
  //   fetchPostData = postId => {
  //     const post = this.state.listOther.find(post => post.id == postId);
  //     this.setState({
  //       listOther: post
  //     });
  //   };

  render() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    const { id } = this.props.match.params;
    const { listOther } = this.state;
    return (
      <div className="site-wrap">
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
          <div className="container-fluid">
            <RouterURL />
          </div>

        </header>
        <div>
          <section className="section-hero overlay inner-page bg-image" style={{ backgroundImage: 'url("/candidate/images/back5.jpg")' }} id="career1">
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                </div>
              </div>
            </div>
          </section>
          <section className="site-section" id="section-describe">
            <div className="container">
              <div className="row align-items-center mb-5 fixed-title-space">
                <div className="col-lg-8 mb-4 mb-lg-0" id="view-mobile">
                  <div className="d-flex align-items-center">
                    <div>
                      <h2 className="modify-title">{this.state.title}</h2>

                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-8 image-fixed-info" style={{ textAlign: 'justify'}}>
                  <div className="mb-5">
                    <figure className="mb-5"><img src="/candidate/images/sq_img_1.jpg" alt="Free Website Template by Free-Template.co" className="img-fluid rounded modify-img" /></figure>
                  </div>
                  {renderHTML(this.state.content)}
                </div>
                <div className="col-lg-4">
                <h2 class="panel-title">
                      More information
                        </h2>
                  <div className="show-information">

                    {/* <h3 className="text-jobsummary mt-3 h5 pl-3 mb-3 text-center">Job Summary</h3>
                      <ul className="list-unstyled pl-3 mb-0">
                        <li className="mb-2"><strong className="text-black">Published on:</strong> <IntlProvider locale="fr">
                          <FormattedDate
                            value={this.state.publishedOn}
                            day="numeric"
                            month="long"
                            year="numeric" />
                        </IntlProvider></li>
                        <li className="mb-2"><strong className="text-black">Vacancy:</strong> {this.state.amount}</li>
                        <li className="mb-2"><strong className="text-black">Status:</strong> {this.state.status}</li>
                        <li className="mb-2"><strong className="text-black">Experience:</strong> {this.state.experience}</li>
                        <li className="mb-2"><strong className="text-black">Location:</strong> {this.state.addressed}</li>
                        <li className="mb-2"><strong className="text-black">Salary:</strong> {this.state.salary}</li>
                        {/* <li className="mb-2"><strong className="text-black">Gender:</strong> Any</li> 
                        <li className="mb-2"><strong className="text-black">Deadline:</strong> <IntlProvider locale="fr">
                          <FormattedDate
                            value={this.state.deadline}
                            day="numeric"
                            month="long"
                            year="numeric" />
                        </IntlProvider></li>
                      </ul> */}
                    {listOther.map((list, index) => {
                      if (index < 5)
                      return <li class="list-group-item" >
                         {(list.id !== this.state.listid) ? <Link className="item-info" to={"/information/" + list.id} >{list.title}</Link> : null}
                        </li>
                    })}
                    <h2 class="panel-title sharing-top">
                      Sharing
                        </h2>
                    <div className="bg-light p-3 border rounded fixed-share-space">
                      <div className="row text-center">
                        <div className="col-4">
                          <div class="fb-share-button"
                            data-href={"https://enclavei3dev.tk/information/" + id}
                            data-layout="button_count"
                            data-size="large">
                          </div>
                        </div>
                        <p></p>
                        <div className="col-4">
                          <a class="twitter-share-button ml-auto"
                            href={"https://enclavei3dev.tk/information/" + id}
                            data-size="large">
                            Tweet</a>
                        </div>
                      
                      <div className="col-4 modify-copylink">
                        <CopyToClipboard onCopy={this.onCopy} text={"https://enclavei3dev.tk/information/" +id}>
                          <button>Copy link</button>
                        </CopyToClipboard>
                      </div>
                      </div>
                      {/* <NavLink to={"#"} className="col-lg-3"><span class="icon-twitter" /></NavLink>
                        <NavLink to={"#"} className="col-lg-3"><span class="icon-instagram" /></NavLink>
                        <NavLink to={"#"} className="col-lg-3"><span class="icon-skype" /></NavLink> */}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Newfooter />
        </div>
      </div >
    )
  }
}