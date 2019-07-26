import React, { Component } from 'react';
import RouterURL from '../RouterURL';
import './homepage.css';
import { NavLink, Link } from 'react-router-dom';
import Footer from '../Footer';
import axios from 'axios';
import careerdata from '../data/careerdata.json';
import Pagination from '../Pagination.js';
import { IntlProvider, FormattedDate } from 'react-intl';
// function searchingFor(term) {
//   return
// }
export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listjob: [],
      currentPage: 0,
      activePage: 1,
      totalItems: 0,
      loading: true,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  to_slug = (str) => {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    return str;
  }
  async componentDidMount() {
    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }

    let body = {
      "keyword": "",
      "position": "",
      "location": "",
      "experience": "",
      "orderby": "asc"
    }
    const data = await fetch('https://api.enclavei3.tk/api/article-web?page=1', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    }).then(res => res.json());
    setTimeout(() => {
      this.setState({
        listjob: data.data,
        totalItems: data.total,
        loading: false
      });
    }, 500);
  }
  handlePageChange(pageNumber) {
    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
    let body = {
      "keyword": "",
      "position": "",
      "location": "",
      "experience": "",
      "orderby": "asc"
    }
    // this.setState({activePage: pageNumber});
    var url = 'https://api.enclavei3.tk/api/article-web?page=' + pageNumber;
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    }).then(res => {
      res.json().then(data => {
        this.setState({
          currentPage: data.currentPage,
          totalItems: data.total,
          listjob: data.data,
          activePage: pageNumber
        });
       
      });
      
    });
  }

  render() {
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
                    <p className="text-white" >Find your dream jobs in our company</p>
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
                          <NavLink to={"#"}>Designer</NavLink>
                        </li>
                        <li class="list-group-item">
                          <NavLink to={"#"}>Tester</NavLink>
                        </li>
                        <li class="list-group-item">
                          <NavLink to={"#"}>Developer</NavLink>
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
                        <form method="post" className="search-jobs-form">
                          <div className="row mb-5">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                              <label>Position</label>
                              <input type="text" className="form-control form-control-lg-2" placeholder="Search" />
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
                            <div className="col-12 ml-auto col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                              <label>&nbsp; </label>
                              <button type="submit" className="btn btn-success btn-lg-2 btn-block text-white btn-search" style={{ fontSize: 14 }}><span className="icon-search icon mr-2" />Search</button>
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
                            {this.state.listjob.map(p => {

                              return <tr class="transfer">
                                <td data-th="Position">
                                  <div>
                                    <Link to={"/describe/" + p.id}>
                                      <p class="position-id">
                                        <p class="position-title">
                                          {p.title}
                                        </p>
                                      </p>
                                    </Link>
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
                                        <IntlProvider locale="fr">
                                          <FormattedDate
                                            value={p.job.deadline}
                                            day="numeric"
                                            month="long"
                                            year="numeric" />
                                        </IntlProvider>
                                      </p>
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            })}
                            <tr class="table-pagination-nav">
                              <td colspan="5">
                                <Pagination
                                  activePage={this.state.activePage}
                                  itemsCountPerPage={10}
                                  totalItemsCount={this.state.totalItems}
                                  pageRangeDisplayed={5}
                                  onChange={this.handlePageChange.bind(this)}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
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
