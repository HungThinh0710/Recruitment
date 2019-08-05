import React, { Component } from 'react';

import { MdPageview } from 'react-icons/md';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import ModalRemoveItem from '../components/ModalRemoveItem';
import ModalEditArticle from '../components/ModalEditArticle';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination.js';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import './ArticlesPage.css';
import { ClipLoader } from 'react-spinners';
const styleFont = {
  fontSize: '200%',
  fontWeight: 'bold'
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
      loading: true,
      dataJob: '',
      dataCategory: '',
      dataFormat: '',
      modalDeleteError: false,
      modalDeleteSuccess: false
    };
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.toggleModalDeleteError = this.toggleModalDeleteError.bind(this);
    this.toggleModalDeleteSuccess = this.toggleModalDeleteSuccess.bind(this);
  }

  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/login');
    }
  }

  async componentDidMount() {
    const { activePage } = this.state;
    var url = 'https://api.enclavei3dev.tk/api/list-article?page=' + activePage;
    var url2 = 'https://api.enclavei3dev.tk/api/list-job';
    var url3 = 'https://api.enclavei3dev.tk/api/category?page=1';
    var url4 = 'https://api.enclavei3dev.tk/api/format-article';
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    const data2 = await fetch(url2, {
      method: 'POST',
      body: JSON.stringify({
        all: 1
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    const data3 = await fetch(url3, {
      method: 'POST',
      body: JSON.stringify({
        field: 'name',
        orderBy: 'asc'
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    const data4 = await fetch(url4, {
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
        loading: false,
        dataJob: data2,
        dataCategory: data3,
        dataFormat: data4
      });
    }, 500);
  }

  getUpdate(update) {
    if ((update = true)) {
      this.componentDidMount();
    }
  }

  toggleModalDeleteSuccess() {
    this.setState(prevState => ({
      modalDeleteSuccess: !prevState.modalDeleteSuccess
    }));
  }
  toggleModalDeleteError() {
    this.setState(prevState => ({
      modalDeleteError: !prevState.modalDeleteError
    }));
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
        if (res.status === 200) {
          this.toggleModalDeleteSuccess();
          res.json().then(data => {
            this.setState({
              rows: data.data,
              totalItems: data.total
            });
          });
        } else {
          this.toggleModalDeleteError();
        }
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
        if (res.status === 200) {
          this.toggleModalDeleteSuccess();
          res.json().then(data => {
            this.setState({
              rows: data.data,
              totalItems: data.total,
              listDeleteId: [],
              listDeleteName: []
            });
          });
        } else {
          this.toggleModalDeleteError();
        }
      });
    });
  }

  render() {
    var i = 0;
    return (
      <Card className="dashboard-card">
        {/*--------Modal-Success-----*/}
        <Modal
          isOpen={this.state.modalDeleteSuccess}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModalDeleteSuccess}>
            <span className="dashboard-modal-header">Notification</span>
          </ModalHeader>
          <ModalBody>
            <span style={{ color: '#45b649' }}>Deleted succesfully</span>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalDeleteSuccess}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/*--------Modal-Success-----*/}

        {/*--------Modal-Error-----*/}
        <Modal
          isOpen={this.state.modalDeleteError}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModalDeleteError}>
            <span className="dashboard-modal-header">Notification</span>
          </ModalHeader>
          <ModalBody>
            <span style={{ color: 'red' }}>Cannot delete this article</span>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalDeleteError}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/*--------Modal-Error-----*/}
        <CardHeader style={styleFont}>Articles Management</CardHeader>
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
            <div className="area-btn-header">
              <Link to="/dashboard/create-article">
                <Button color="success">Create A New Article</Button>
              </Link>
              <Link to="/dashboard/format">
                <Button color="primary">Format</Button>
              </Link>
            </div>
            <br />
            {this.state.listDeleteId.length != 0 && (
              <ModalRemoveItem
                itemName="these articles"
                buttonLabel="Delete"
                function={() => this.removeManyItems()}
              />
            )}
            <div className="table-test">
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
                    <th>Title</th>
                    <th>Job</th>
                    <th>Status</th>
                    <th>Author</th>
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
                    let url = '/dashboard/article/' + e.id;
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
                        {e.job ? <td>{e.job.name}</td> : <td />}
                        {e.isPublic === 1 ? (
                          <td>Publised</td>
                        ) : (
                          <td>Not published</td>
                        )}

                        <td>{e.user.fullname}</td>
                        {/* <td>{e.created_at}</td>
                      <td>{e.updated_at}</td> */}
                        <td>
                          <div className="action">
                            <ModalEditArticle
                              icon
                              id={e.id}
                              getUpdate={this.getUpdate.bind(this)}
                              dataJob={this.state.dataJob}
                              dataFormat={this.state.dataFormat}
                              dataCategory={this.state.dataCategory}
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
                            <ModalRemoveItem
                              itemName="this article"
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
        )}
      </Card>
    );
  }
}
