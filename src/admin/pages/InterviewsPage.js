import React, { Component } from 'react';

import { MdPageview } from 'react-icons/md';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination.js';
// import './Roles.css'
import ModalRemoveItem from '../components/ModalRemoveItem';
import { ClipLoader } from 'react-spinners';
import $ from 'jquery';
const styleFont = {
  fontSize: '200%',
  fontWeight: 'bold'
};
const styleCard = {
  width: '80%',
  marginTop: '5%',
  alignSelf: 'center',
  marginBottom: '8%',
  loading: true
};
export default class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      listDeleteName: [],
      listDeleteId: [],
      currentPage: 0,
      activePage: 1,
      totalItems: 0,
      loading: true
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    // this.removeManyItems = this.removeManyItems.bind(this);
  }
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/login');
    }
  }

  async componentDidMount() {
    var url = 'https://api.enclavei3dev.tk/api/list-interview?page=1';
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    setTimeout(() => {
      this.setState({
        rows: data.data,
        totalItems: data.total,
        loading: false
      });
    }, 500);
  }

  handlePageChange(pageNumber) {
    var url =
      'https://api.enclavei3dev.tk/api/list-interview?page=' + pageNumber;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      res.json().then(data => {
        this.setState({
          currentPage: data.currentPage,
          totalItems: data.total,
          rows: data.data,
          activePage: pageNumber
        });
      });
    });
  }
  removeItem(id) {
    const { activePage} = this.state;
    var array = [];
    array.push(id);
    var url = 'https://api.enclavei3dev.tk/api/interview';
    fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        interviewId: array,
        status: 'none'
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      fetch('https://api.enclavei3dev.tk/api/list-interview?page=' + activePage, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      }).then(res => {
        res.json().then(data => {
          data.data.forEach(function(e) {
            delete e.created_at;
            delete e.updated_at;
          });
          this.setState({
            rows: data.data,
            totalItems: data.total,
          });
        });
      });
    });
  }
  handleCheckChange(e) {
    const { listDeleteId, listDeleteName } = this.state;
    listDeleteId.push(e.id);
    listDeleteName.push(e);
    var array1 = [...new Set(listDeleteId)];
    var array3 = [...new Set(listDeleteName)];
    var array2 = [];
    var array4 = [];
    array1.map(element => {
      var count = listDeleteId.filter(e => e === element);
      var length = count.length;
      if (length % 2 !== 0) {
        array2.push(element);
      }
      return array2;
    });
    array3.map(element => {
      var count = listDeleteName.filter(e => e.id === element.id);
      var length = count.length;
      if (length % 2 !== 0) {
        array4.push(element);
      }
      return array4;
    });
    this.setState({
      listDeleteId: array2,
      listDeleteName: array4
    });
  }
  removeManyItems() {
    const { listDeleteId, activePage } = this.state;
    var url = 'https://api.enclavei3dev.tk/api/interview';
    fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        interviewId: listDeleteId,
        status: 'none'
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      fetch('https://api.enclavei3dev.tk/api/list-interview?page=' + activePage, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      }).then(res => {
        res.json().then(data => {
          this.setState({
            rows: data.data,
            totalItems: data.total,
            listDeleteId: [],
            listDeleteName: []
          });
        });
      });
    });
  }
  render() {
    var i = 0;
    return (
      <Card style={styleCard}>
        <CardHeader style={styleFont}>interviews Management</CardHeader>
        {this.state.loading ? (
          <div
            style={{
              marginTop: '100px',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '100px'
            }}
            className="sweet-loading"
          >
            <ClipLoader
              sizeUnit={'px'}
              size={200}
              color={'#45b649'}
              loading={this.state.loading}
            />
          </div>
        ) : (
          <CardBody>
            {this.state.listDeleteId.length != 0 && (
              <ModalRemoveItem
                itemName="this candidate"
                buttonLabel="Delete"
                function={() => this.removeManyItems()}
              />
            )}
            <div style={{ overflowX: 'auto' }} className="table-test">
              <table>
                <thead>
                  <tr
                    style={{
                      background:
                        '#45b649 linear-gradient(180deg, #61c164, #45b649) repeat-x',
                      color: 'white'
                    }}
                  >
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>#</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Start</th>
                    <th>End</th>
                    <th style={{ marginHorizontal: '10px' }}>
                      <div className="action">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.rows.map(e => {
                    i++;
                    let url = '/dashboard/interview/' + e.id;
                    return (
                      <tr key={e.id}>
                        <td>
                          <input type="checkbox"  onChange={() => this.handleCheckChange(e)} />
                        </td>
                        <td>{i}</td>
                        <td>{e.name}</td>
                        <td>{e.address}</td>
                        <td>{e.status}</td>
                        <td>{e.timeStart}</td>
                        <td>{e.timeEnd}</td>
                        <td>
                          <div className="action">
                            <Link style={{ width: 'auto' }} to={url}>
                              <Button className="view-button" color="primary">
                                <MdPageview />
                              </Button>
                            </Link>
                            <ModalRemoveItem                               
                                itemName="this interview"
                                function={() => this.removeItem(e.id)}
                              />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <br />
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={10}
                totalItemsCount={this.state.totalItems}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange.bind(this)}
              />
            </div>
          </CardBody>
        )}
      </Card>
    );
  }
}
