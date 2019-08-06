import React, { Component } from 'react';
import RouterURL from '../RouterURL';
import './homepage.css';
import { NavLink, Link } from 'react-router-dom';
import Footer from '../Footer';
import Newfooter from '../Newfooter';
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
      keyword: '',
      location: '',
      filter: '',
      All: false,
      Internship: false,
      designer: false,
      tester: false,
      developer: false,
      status: '',
      activeItem: 1,
      

    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addActiveClass= this.addActiveClass.bind(this);
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
      "keyword": this.state.keyword,
      "position": "",
      "location": "",
      "experience": "",
      "orderby": "asc"
    }
    const data = await fetch('https://api.enclavei3dev.tk/api/article-web?page=1', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    }).then(res => res.json());
    setTimeout(() => {
      this.setState({
        listjob: data.data,
        totalItems: data.total,
        loading: false,
      });
    }, 500);
  }
  handleFilter(keyword, pageNumber) {
    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }

    let body = {
      "keyword": "",
      "position": keyword,
      "location": "",
      "experience": "",
      "orderby": "asc"
    }
    var url = 'https://api.enclavei3dev.tk/api/article-web?page=' + pageNumber;
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
          activePage: pageNumber,
        }); 
      });
      
    });
  }
  
  handlePageChange(pageNumber, keyword, location, status) {
    keyword = this.state.keyword;
    location = this.state.location;
    status = this.state.status;
    // const {keyword, location, status} = this.state;
    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
    let body = {
      "keyword": keyword,
      "position": "",
      "location": location,
      "catelogy": "",
      "status": status,
      "orderby": "asc"
    }
    var url = 'https://api.enclavei3dev.tk/api/article-web?page=' + pageNumber;
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
          activePage: data.current_page,
        }); 
      });
      
    });
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value
    })
  }
  addActiveClass(event) {
    this.setState({[event.target.name]: !event.target.value
    })  
}
  handleActive(index) {
    this.setState({
      activeItem: index
    })
  }
  render() {
    const {active} = this.state;
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
                    <h1 className="text-green font-weight-bold">Enclave Recruitment</h1>
                    <p className="text-green" >Find your dream jobs in our company</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="site-section">
            <div className="container">
              <div className="row mb-5 justify-content-center">
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
                          <NavLink className="item" to={"#"}>Why join Enclave</NavLink>
                        </li>
                        <li class="list-group-item">
                          <NavLink className="item" to={"#"}>Working environment</NavLink>
                        </li>
                        <li class="list-group-item">
                          <NavLink className="item" to={"#"}>Flat model</NavLink>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p class="list-group-title">
                        Job opening
                      </p>
                      <ul  class="site-menu list-group navbar-nav candi-no-border" id="myLink">
                        <li key={1} className={this.state.activeItem === 1 ? 'list-group-item active' : 'list-group-item'} onClick={this.handleActive.bind(this, 1)}  onClick={()=>this.handleFilter('')} name="All">
                          <Link key={1} className={this.state.activeItem === 1 ? 'item active' : 'item'} onClick={this.handleActive.bind(this, 1)}  to="/" exact  >All</Link>
                        </li>
                        <li key={2} className={this.state.activeItem === 2 ? 'list-group-item active' : 'list-group-item'} onClick={this.handleActive.bind(this, 2)} onClick={()=>this.handleFilter('Internship')} name="internship">
                          <Link key={2} className={this.state.activeItem === 2 ? 'item active' : 'item'} onClick={this.handleActive.bind(this, 2)}  to="/" exact  >Internship</Link>
                        </li>
                        <li key={3} className={this.state.activeItem === 3 ? 'list-group-item active' : 'list-group-item'} onClick={this.handleActive.bind(this, 3)} onClick={()=>this.handleFilter('Desginer')} name="designer">
                          <Link key={3} className={this.state.activeItem === 3 ? 'item active' : 'item'} onClick={this.handleActive.bind(this, 3)} to="/" exact  >Designer</Link>
                        </li>
                        <li key={4} className={this.state.activeItem === 4 ? 'list-group-item active' : 'list-group-item'} onClick={this.handleActive.bind(this, 4)} onClick={()=>this.handleFilter('Tester')} name="tester">
                          <Link key={4} className={this.state.activeItem === 4 ? 'item active' : 'item'} onClick={this.handleActive.bind(this, 4)} to="/" exact  >Tester</Link>
                        </li>
                        <li key={5} className={this.state.activeItem === 5 ? 'list-group-item active' : 'list-group-item'} onClick={this.handleActive.bind(this, 5)} onClick={()=>this.handleFilter('Developer')} name="developer">
                          <Link key={5} className={this.state.activeItem === 5 ? 'item active' : 'item'} onClick={this.handleActive.bind(this, 5)} to="/" exact  >Developer</Link>
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
                          <div className="row mb-5 Searchtype">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                              <label>Position</label>
                              <input name="keyword" value={this.state.keyword} onChange={this.handleChange} type="text" className="form-control form-control-lg-2" ref="search" placeholder="Search" />
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                              <label>Location</label>
                              <select name="location" value={this.state.location} onChange={this.handleChange} className="form-control">
                                <option value="">All</option>
                                <option value="453-455 Hoang Dieu" type="text">453-455 Hoang Dieu</option>
                                <option value="117 Nguyen Huu Tho">117 Nguyen Huu Tho</option>
                              </select>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                              <label>Status</label>
                              <select name="status" value={this.state.status} onChange={this.handleChange} className="form-control">
                                <option value="">All</option>
                                <option value="Part-time">Part Time</option>
                                <option value="Full-time">Full Time</option>
                                {/* <option value="freelancer">Freelancer</option> */}
                              </select>
                            </div>
                            <div className="col-12 ml-auto col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                              <label>&nbsp; </label>
                              <button onClick={this.handlePageChange} className="btn btn-success btn-lg-2 btn-block text-white" type="button" style={{ fontSize: 14 }}><span className="icon-search icon mr-2" />Search</button>
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
                            <th>Status</th>
                            <th>Day expired</th>
                          </thead>
                          <tbody class="transistion">
                            {this.state.listjob.map(p => {
                              return <tr class="transfer">
                                <td data-th="Position">
                                  <div>
                                    <Link to={"/article/" + p.id} className="colorbottomline">
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
                                <td data-th="Status">
                                  <div>
                                    <p class="status-id">
                                      <p class="status-title">
                                        {p.job.status}
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
          <Newfooter />
        </div>
      </section>
    )
  }
}
