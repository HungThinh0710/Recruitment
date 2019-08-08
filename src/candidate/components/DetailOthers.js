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
      image: '', 
      currentid: '', 
    }
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
      image: data.image,
      currentid: id,
    });
    $("<meta name=\"fb-id\" property=\"fb:app_id\" content=\"2309010198\"/>").insertAfter($('meta[name=application-name]'))
    $("<meta property=\"og:title\" content=\"Enclave Recruitment System\" />").insertAfter($('meta[name=fb-id]'))
  }
  async componentWillMount() {

    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
    let body = {
      "count": ""
    }
    const {id} = this.props.match.params;
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
    }, 500);
  }
  handleReload() {
    window.location.reload()
  }
  onCopy = () => {
    this.setState({ copied: true });
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
              <div className="row align-items-center mb-9 fixed-title-space">
                <div className="col-lg-8 mb-4 mb-lg-0" id="view-mobile">
                  <div className="d-flex align-items-center">
                    <div>
                      <h2 className="modify-title">{this.state.title}</h2>
                      <div class="show-line-3">
                        <div className="row text-center" style={{ paddingTop: 20, paddingLeft: 15 }}>
                          {/* <span className="ml-0 mr-2 mb-2"><span className="icon-briefcase mr-2" />{this.state.position}</span>
                        <span className="m-2"><span className="icon-room mr-2" />{this.state.addressed}</span>
                        <span className="m-2"><span className="icon-clock-o mr-2" /><span className="text">{this.state.status} */}
                          {/* </span></span> */}
                          {/* <div className="col-4" style ={{paddingLeft: 0, paddingRight: 0}}> */}
                          <span className="ml-0 mr-2 mb-2">
                            <div class="fb-share-button"
                              data-href={"https://enclavei3dev.tk/information/" + id}
                              data-layout="button_count"
                              data-size="large">
                            </div>
                          </span>
                          {/* </div>   */}
                          {/* <div className="col-4" style ={{paddingLeft: 0, paddingRight: 0}}> */}
                          <span className="ml-0 mr-2 mb-2">
                            <a class="twitter-share-button ml-auto"
                              href={"https://enclavei3dev.tk/information/" + id}
                              data-size="large">
                            </a>
                          </span>
                          {/* </div> */}
                          <div className="modify-copylink">
                            <CopyToClipboard onCopy={this.onCopy} text={"https://enclavei3dev.tk/information/" + id}>
                            <button className="hover-clipboard">&nbsp;<span class="far fa-copy" aria-hidden="true">&nbsp;</span> <span style={{fontSize: 14, fontWeight: 'bold'}}> Link&nbsp;</span></button>
                            </CopyToClipboard>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-8 image-fixed-info" style={{ textAlign: 'justify' }}>
                  <div className="mb-5">
                    
                    <figure className="mb-5"><img src={"https://api.enclavei3dev.tk/upload/images/articles/" + this.state.image} alt="Free Website Template by Free-Template.co" className="img-fluid rounded modify-img" /></figure>
                   
                  
                    
                  </div>
                  {renderHTML(this.state.content)}
                </div>
                <div className="col-lg-4 " style={{paddingLeft: 25}}>
                  <h2 class="panel-title-article-2">
                    More Information
                        </h2>
                  <div className="show-information" style={{paddingTop: 10}}>


                    <div className="table table-striped table-responsive-sm" cellspacing="0" cellpadding="0">
                      <tbody>
                        {listOther.map((list, index) => {
                         if (!(this.state.currentid == list.id))
                         if (index <10)
                           return <tr className="border-title">
                              <td class="list-group-item article-recommend article-recommend-2" style={{paddingBottom: 3}}>
                                <NavLink className="item-info" style={{ color: '#212629' }} to={"/information/" + list.id} >{list.title}</NavLink>
                                <h6 className="time-update"> <IntlProvider locale="fr"><FormattedDate
                                  value={list.updated_at}
                                  day="numeric"
                                  month="long"
                                  year="numeric" />
                                </IntlProvider>
                                </h6>
                              </td>
                            </tr>
                        })}
                      </tbody>
                    </div>
                    {/* <div className="bg-light p-3 border rounded fixed-share-space">
                      
                      {/* <NavLink to={"#"} className="col-lg-3"><span class="icon-twitter" /></NavLink>
                        <NavLink to={"#"} className="col-lg-3"><span class="icon-instagram" /></NavLink>
                        <NavLink to={"#"} className="col-lg-3"><span class="icon-skype" /></NavLink> 

                    </div> */}
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