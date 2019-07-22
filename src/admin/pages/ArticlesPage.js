import React, { Component } from 'react';

import { MdPageview } from 'react-icons/md';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import ModalRemoveArticle from '../components/ModalRemoveArticle';
import ModalRemoveArticles from '../components/ModalRemoveArticles';
import ModalEditItem from '../components/ModalEditItem';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination.js';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import './ArticlesPage.css';
import ModalAddArticle from '../components/ModalAddArticle';
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
export default class ArticlesPage extends Component {
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
    var url = 'https://api.enclavei3dev.tk/api/list-article?page=1';
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
  }

  handlePageChange(pageNumber) {
    // this.setState({activePage: pageNumber});
    var url = 'https://api.enclavei3dev.tk/api/list-article?page=' + pageNumber;
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

  addJob(data) {
    this.setState({
      rows: data.data,
      totalItems: data.total
    });
  }

  removeItem(id) {
    const { activePage } = this.state;
    var array = [];
    array.push(id);
    var url = 'https://api.enclavei3dev.tk/api/article';
    fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        articleId: array
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      fetch('https://api.enclavei3dev.tk/api/list-article?page=' + activePage, {
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
    var url = 'https://api.enclavei3dev.tk/api/article';
    fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        articleId: listDeleteId
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      fetch('https://api.enclavei3dev.tk/api/list-article?page=' + activePage, {
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
        <CardHeader style={styleFont}>Articles Management</CardHeader>
        <CardBody>
          <ModalAddArticle
            color="success"
            page={this.state.activePage}
            buttonLabel="Create an new article"
            nameButtonAccept="Add"
            function={this.addJob.bind(this)}
          />
          <br />
          {this.state.listDeleteId.length != 0 && (
            <ModalRemoveArticles
              arrayName={this.state.listDeleteName}
              buttonLabel="Delete"
              function={() => this.removeManyItems()}
            />
          )}
          <div className="table-test">
            <table>
              <thead>
                <tr style={{ background: 'green', color: 'white' }}>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>#</th>
                  <th>Title</th>
                  <th>Job</th>
                  <th>Created By</th>
                  {/* <th>Created At</th>
                  <th>Updated At</th> */}
                  <th style={{ width: '180px' }}>
                    <div className="action">Action</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.rows.map(e => {
                  i++;
                  let url = '/admin/article/' + e.id;
                  return (
                    <tr key={e.id}>
                      <td>
                        <input
                          type="checkbox"
                          onChange={() => this.handleCheckChange(e)}
                        />
                      </td>
                      <td>{i}</td>
                      <td>{e.title}</td>
                      <td>{e.job.name}</td>
                      <td>{e.user.fullname}</td>
                      {/* <td>{e.created_at}</td>
                      <td>{e.updated_at}</td> */}
                      <td>
                        <div className="action">
                          <ModalEditItem
                            icon
                            // id={listId[index]}
                            name={e.name}
                            color="success"
                            buttonLabel="Edit"
                            // function={this.editRole.bind(this)}
                          />
                          <Link style={{ width: 'auto' }} to={url}>
                            <Button className="view-button" color="primary">
                              <MdPageview />
                            </Button>
                          </Link>
                          <ModalRemoveArticle
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
