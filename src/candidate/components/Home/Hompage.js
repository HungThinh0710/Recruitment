import React, { Component } from 'react';
import RouterURL from '../RouterURL';
import './homepage.css';
import { NavLink, Link } from 'react-router-dom';
import Footer from '../Footer';
import axios from 'axios';
import careerdata from '../data/careerdata.json';
export default class Homepage extends Component {
  constructor(props){
    super(props);
    this.state ={
      product:[],
    }
  }
  componentDidMount()
  {
    fetch('https://api.enclavei3dev.tk/api/article-web').then
    ((Response) => Response.json()).then
    ((findresponse) =>
    {
      console.log(findresponse.data)
      this.setState({
        product:findresponse.data
      })
     
    })
  }
  render() {
    console.log(this.props.match.params.id)

    return (
      <section id="Home">
        <div className="site-wrap" >
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

          {/* HOME */}
          <section className="home-section section-hero overlay inner-page bg-image" style={{ backgroundImage: 'url("candidate/images/back5.jpg")' }} id="home-section">
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-12">
                  <div className="mb-5 text-center">
                    <h1 className="text-white font-weight-bold">Enclave Recruitment</h1>
                    <p>Find your dream jobs in our company</p>
                  </div>
                  
                </div>
              </div>
            </div>
          </section>
          <section className="site-section">
            <div className="container">
              <div className="row mb-5 justify-content-center">
                {/* <div className="col-md-7 text-center">
                  <h2 className="section-title mb-2">Job Opening</h2>
                </div> */}
              </div>

              <div class="row">
                <aside class="col-sm-3 sidebar-nav career-sidebar">
                  <ul class="list-group-wrap">
                    <li id="view" class="list-group-block">
                      <p class="list-group-title">
                        Information
                      </p>
                      <ul class="list-group">
                        <li class="list-group-item">
                          <NavLink to={"#"}>Why join Enclave</NavLink>
                        </li>
                        <li class="list-group-item">
                          <NavLink to={"#"}>Working environment</NavLink>
                        </li>
                        <li class="list-group-item">
                          <NavLink to={"#"}>Flat model</NavLink>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p class="list-group-title">
                        Job opening
                      </p>
                      <ul class="list-group">
                        <li class="list-group-item active">
                          <NavLink to={"#"}>All</NavLink>
                        </li>
                        <li class="list-group-item">
                          <NavLink to={"#"}>Internship</NavLink>
                        </li>
                        <li class="list-group-item">
                          <NavLink to={"#"}>Bootcamp</NavLink>
                        </li>
                        <li class="list-group-item">
                          <NavLink to={"#"}>engineer</NavLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </aside>
                <div class="col-sm-9 main-content career-section">
                  <div class="section-content">
                    <div class="panel career-search-form">
                      <div class="panel-title">Search & apply</div>
                      <div class="panel-body wrap-form border">
                        {/* <form id="job-apply-result" method="get">
                          <div class="radio-row">
                            <div class="radio-inline">
                              <label>
                                <input name="jt" type="radio" value></input>
                                <span> All</span>
                              </label>
                            </div>
                            <div class="radio-inline">
                              <label>
                                <input name="jt" type="radio" value/>
                                <span> Manager/Supervisor</span>
                              </label>
                            </div>
                            <div class="radio-inline">
                              <label>
                                <input name="jt" type="radio" value />
                                <span> Senior/experience</span>
                              </label>
                            </div>
                            <div class="radio-inline">
                              <label>
                                <input name="jt" type="radio" value />
                                <span> Fresh/Intership</span>
                              </label>
                            </div>
                          </div>
                        </form> */}
                        <form method="post" className="search-jobs-form">
                          <div className="row mb-5">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                              <label>Position</label>
                              <input type="text" className="form-control form-control-lg-2" placeholder="Job title, keywords..." />
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                              <label>Location</label>
                              <select className="form-control">
                                <option>All</option>
                                <option>Office 1(453-455 Hoang Dieu)</option>
                                <option>Office 2(117 Nguyen Huu Tho)</option>

                              </select>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                              <label>Job category</label>
                              <select className="form-control">

                                <option>All</option>
                                <option>Part Time</option>
                                <option>Full Time</option>
                                <option>Freelancer</option>
                              </select>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                              <label>&nbsp; </label>
                              <button type="submit" className="btn btn-success btn-lg-2 btn-block text-white btn-search" style={{fontSize: 14}}><span className="icon-search icon mr-2" />Search</button>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div class="panel job-list-panel">
                        <h2 class="panel-title">
                          Job Opening
                        </h2>
                        <table class="table rwd-table border article-table">
                          <thead>
                            <th>Position</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Day expired</th>
                          </thead>
                          <tbody class="transistion">
                            {/* {careerdata.map((p, index) => {
                              return <tr class="transfer">
                                <td data-th="Position">
                                  <div>
                                    <NavLink to={"/describe/"+ this.props.match.params.id}>
                                      <p class="position-id">
                                        <p class="position-title">
                                          {p.name}
                                        </p>
                                      </p>
                                    </NavLink>
                                  </div>
                                </td>
                                <td data-th="Category">
                                  <div>
                                    <p class="category-id">
                                      <p class="category-title">
                                        {p.position}
                                      </p>
                                    </p>
                                  </div>
                                </td>
                                <td data-th="Location">
                                  <div>
                                    <p class="location-id">
                                      <p class="location-title">
                                        {p.local}
                                      </p>
                                    </p>
                                  </div>
                                </td>
                                <td data-th="Day expired">
                                  <div>
                                    <p class="Dayexpired-id">
                                      <p class="Dayexpired-title">
                                        {p.outdate}
                                      </p>
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            })} */}
                            {this.state.product.map((p, index) => {
                              return <tr class="transfer">
                                <td data-th="Position">
                                  <div>
                                    <NavLink to={"/describe/"+ this.props.match.params.pid}>
                                      <p class="position-id">
                                        <p class="position-title">
                                          {p.title}
                                        </p>
                                      </p>
                                    </NavLink>
                                  </div>
                                </td>
                                <td data-th="Category">
                                  <div>
                                    <p class="category-id">
                                      <p class="category-title">
                                        {p.job.position}
                                      </p>
                                    </p>
                                  </div>
                                </td>
                                <td data-th="Location">
                                  <div>
                                    <p class="location-id">
                                      <p class="location-title">
                                        {p.job.address}
                                      </p>
                                    </p>
                                  </div>
                                </td>
                                <td data-th="Day expired">
                                  <div>
                                    <p class="Dayexpired-id">
                                      <p class="Dayexpired-title">
                                        {p.job.deadline}
                                      </p>
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            })}
                            <tr class="table-pagination-nav">
                              <td colspan="5">
                                <div class="pagination-nav float-right article-pagination">
                                <ul class="pagination">
                                  <ul id="paginator" data-current="1" data-total="3" class="pagination">
                                    <li class="active">
                                      <a title="current is page 1"> 1 </a>
                                      
                                    </li>
                                    <li>
                                    <a title="go to page 2"> 2 </a>
                                    </li>
                                    <li>
                                    <a title="go to page 3"> 3 </a>
                                    </li>
                                    <li>
                                    <a title="go to next page"> > </a>
                                    </li>
                                    <li>
                                    <a title="go to last page"> >> </a>
                                    </li>
                                  </ul>
                                </ul>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {/* <div className="row pagination-wrap ml-auto">
                <div className="col-md-6 text-center ml-auto">
                  <div className="custom-pagination ml-auto">
                    <a href="#" className="prev">Previous</a>
                    <div className="ml-auto">
                      <a href="#" className="active">1</a>
                      <a href="#">2</a>
                      <a href="#">3</a>
                      <a href="#">4</a>
                    </div>
                    <a href="#" className="next">Next</a>
                  </div>
                </div>
              </div> */}
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </section>
          <Footer />
        </div>
      </section>
    )
  }
}
