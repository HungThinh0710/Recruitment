import React, { Component } from 'react';

import { MdPageview } from 'react-icons/md';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import ModalRemoveUser from '../components/ModalRemoveUser';
import ModalRemoveUsers from '../components/ModalRemoveUsers';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination.js';
// import './Roles.css'
import ModalAddUser from '../components/ModalAddUser';
import $ from 'jquery';
const styleFont = {
  fontSize: '200%'
};
const styleCard = {
  width: '80%',
  marginTop: '5%',
  alignSelf: 'center',
  marginBottom: '8%'
};
export default class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDeleteName: [],
      listDeleteId: [],
      rows: [],
      currentPage: 0,
      activePage: 1,
      totalItems: 0,
      listId: []
    };
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    // this.removeManyItems = this.removeManyItems.bind(this);
  }

  async componentWillMount() {
    var url = 'https://api.enclavei3dev.tk/api/list-user?page=1';
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    this.setState({
      rows: data.data,
      totalItems: data.total
    });
    $('.dataTables_paginate').remove();
  }

  handlePageChange(pageNumber) {
    // this.setState({activePage: pageNumber});
    var url = 'https://api.enclavei3dev.tk/api/list-user?page=' + pageNumber;
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

  edit(index) {
    $('.item').removeClass('item-active');
    $('#' + index).addClass('item-active');
    var url = 'https://api.enclavei3dev.tk/api/user?page=' + index;
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
          rows: data.data,
          totalItems: data.total
        });
      });
    });
  }

  addUser(data) {
    this.setState({
      rows: data.data,
      totalItems: data.total
    });
  }

  removeItem(id) {
    const { activePage } = this.state;
    var array = [];
    array.push(id);
    var url = 'https://api.enclavei3dev.tk/api/user';
    fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        userId: array
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      fetch('https://api.enclavei3dev.tk/api/list-user?page=' + activePage, {
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
            totalItems: data.total
          });
        });
      });
    });
  }

  handleCheckChange(name, id) {
    const { listDeleteId, listDeleteName } = this.state;
    listDeleteId.push(id);
    listDeleteName.push(name);
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
      var count = listDeleteName.filter(e => e === element);
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
    var url = 'https://api.enclavei3dev.tk/api/user';
    fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        userId: listDeleteId
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      fetch('https://api.enclavei3dev.tk/api/list-user?page=' + activePage, {
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
        <CardHeader style={styleFont}>Users Management</CardHeader>
        <CardBody>
          <ModalAddUser
            color="success"
            buttonLabel="Create a new user"
            nameButtonAccept="Add"
            function={this.addUser.bind(this)}
          />
          {this.state.listDeleteId.length !== 0 && (
            <ModalRemoveUsers
              arrayName={this.state.listDeleteName}
              buttonLabel="Delete"
              function={() => this.removeManyItems()}
            />
          )}
          <br />
          <div className="table-test">
            <table>
              <thead>
                <tr style={{ background: 'green', color: 'white' }}>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>#</th>
                  <th>Fullname</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>
                    <div className="action">Action</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.rows.map(e => {
                  i++;
                  let url = '/admin/user/' + e.id;
                  return (
                    <tr key={e.id}>
                      <td>
                        <input
                          type="checkbox"
                          onChange={() =>
                            this.handleCheckChange(e.fullname, e.id)
                          }
                        />
                      </td>
                      <td>{i}</td>
                      <td>{e.fullname}</td>
                      <td>{e.email}</td>
                      <td>{e.phone}</td>
                      <td>
                        <div className="action">
                          <Link to={url}>
                            <Button className="view-button" color="primary">
                              <MdPageview />
                            </Button>
                          </Link>
                          <ModalRemoveUser
                            item={e}
                            buttonLabel="Delete"
                            function={() => this.removeItem(e.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={this.state.totalItems}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
          />
        </CardBody>
      </Card>
    );
  }
}
