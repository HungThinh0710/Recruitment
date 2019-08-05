import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap';
import ModalRemoveItem from '../components/ModalRemoveItem';
import { Link } from 'react-router-dom';
import './RolesPage.css';
import { MdPageview } from 'react-icons/md';
import PaginationComponent from '../components/Pagination.js';
import './TestPage.css';

import { ClipLoader } from 'react-spinners';
import ModalEditRole from '../components/ModalEditRole';
const styleFont = {
  fontSize: '200%',
  fontWeight: 'bold'
};

export default class Roles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDeleteName: [],
      listDeleteId: [],
      activePage: 1,
      totalItems: 0,
      rows: [],
      loading: true,
      dataPermissions: '',
      modalDeleteError: false,
      modalDeleteSuccess: false
    };
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.removeManyItems = this.removeManyItems.bind(this);
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
    // var url = 'https://api.enclavei3dev.tk/api/list-role?page=' + activePage;
    var url1 = 'https://api.enclavei3dev.tk/api/list-role?page=' + activePage;
    var url2 = 'https://api.enclavei3dev.tk/api/permission';
    // var i = 0;
    // var listRoles = [];
    const data1 = await fetch(url1, {
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
    setTimeout(() => {
      this.setState({
        currentPage: data1.currentPage,
        totalItems: data1.total,
        rows: data1.data,
        loading: false,
        dataPermissions: data2
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

  removeItem(id) {
    const { activePage, listDeleteId } = this.state;
    var array = [];
    array.push(id);
    var index = listDeleteId.indexOf(id);
    listDeleteId.splice(index, 1);
    var url = 'https://api.enclavei3dev.tk/api/role';
    fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        roleId: array
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      fetch('https://api.enclavei3dev.tk/api/list-role?page=' + activePage, {
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
            data.data.forEach(function(e) {
              delete e.created_at;
              delete e.updated_at;
            });
            this.setState({
              rows: data.data,
              totalItems: data.total,
              listDeleteId: listDeleteId,
              listDeleteName: []
            });
          });
        } else {
          this.toggleModalDeleteError();
        }
      });
    });
  }

  addRole(data) {
    this.setState({
      rows: data.data,
      totalItems: data.total
    });
  }

  handlePageChange(pageNumber) {
    var url = 'https://api.enclavei3dev.tk/api/list-role?page=' + pageNumber;
    fetch(url, {
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
          currentPage: data.currentPage,
          totalItems: data.total,
          rows: data.data,
          activePage: pageNumber
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
    var url = 'https://api.enclavei3dev.tk/api/role';
    fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        roleId: listDeleteId
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      fetch('https://api.enclavei3dev.tk/api/list-role?page=' + activePage, {
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
    const { totalItems } = this.state;
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
            <span style={{ color: 'red' }}>Cannot delete this role</span>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalDeleteError}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/*--------Modal-Error-----*/}
        <CardHeader style={styleFont}>Roles Management</CardHeader>
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
            <Link to="/dashboard/create-role">
              <Button color="success">Create a new role</Button>
            </Link>
            <br />
            <br />
            {this.state.listDeleteId.length != 0 && (
              <ModalRemoveItem
                itemName="this roles"
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
                    <th>Role</th>
                    <th>Description</th>
                    <th style={{ width: '180px' }}>
                      <div className="action">Action</div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.rows.map(e => {
                    i++;
                    let url = '/dashboard/role/' + e.id;
                    return (
                      <tr key={e.id}>
                        <td>
                          <input
                            type="checkbox"
                            onChange={() =>
                              this.handleCheckChange(e.name, e.id)
                            }
                          />
                        </td>
                        <td>{i}</td>
                        <td>{e.name}</td>
                        <td>{e.description}</td>
                        <td>
                          <div className="action">
                            <ModalEditRole
                              icon
                              dataPermissions={this.state.dataPermissions}
                              id={e.id}
                              name={e.name}
                              color="success"
                              getUpdate={this.getUpdate.bind(this)}
                            />
                            <Link style={{ width: 'auto' }} to={url}>
                              <Button className="view-button" color="primary">
                                <MdPageview />
                              </Button>
                            </Link>
                            <ModalRemoveItem
                              itemName="this role"
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
              <PaginationComponent
                activePage={this.state.activePage}
                itemsCountPerPage={10}
                totalItemsCount={totalItems}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
              />
            </div>
          </CardBody>
        )}
      </Card>
    );
  }
}
