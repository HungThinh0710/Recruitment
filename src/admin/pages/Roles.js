import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  InputGroupAddon,
  InputGroup,
  Input,
  Container,
  Row,
  Col,
  FormGroup,
  Badge,
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
import DropDownTable from '../components/DropDownTable.js';
import './TestPage.css';

import { PulseLoader } from 'react-spinners';
import ModalEditRole from '../components/ModalEditRole';

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
      modalDeleteSuccess: false,
      checkRole: 0
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
    } else {
      const checkId = window.name;
      if (checkId == 1) {
        this.setState({
          checkRole: true
        });
      } else {
        this.setState({
          checkRole: false
        });
      }
    }
  }
  async componentDidMount() {
    const { activePage, checkRole } = this.state;
    // var url = 'https://api.enclavei3dev.tk/api/list-role?page=' + activePage;
    var url1 = 'https://api.enclavei3dev.tk/api/list-role?page=' + activePage;
    var url2 = 'https://api.enclavei3dev.tk/api/permission';
    // var i = 0;
    // var listRoles = [];
    if (checkRole == true) {
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
    } else {
      this.setState({
        loading: false
      });
    }
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
      <Card className="dashboard-card" style={{ marginBottom: '330px' }}>
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
        <CardHeader className="card-header-custom">Roles Management</CardHeader>
        {this.state.loading ? (
          <div
            style={{
              marginTop: '100px',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '250px'
            }}
            className="sweet-loading"
          >
            <PulseLoader
              sizeUnit={'px'}
              size={15}
              color={'#45b649'}
              loading={this.state.loading}
            />
          </div>
        ) : (
          <CardBody>
            {this.state.checkRole ? (
              <div>
                <Container fluid={true} className="role-container-head-row">
                  <Row className="role-head-row">
                    <Col sm="12" md="6" className="role-form-create">
                      <div className="form-header-area-button">
                        <Link to="/dashboard/create-role">
                          <Button color="success">Create</Button>
                        </Link>

                        {this.state.listDeleteId.length != 0 && (
                          <ModalRemoveItem
                            itemName="these roles"
                            buttonLabel="Delete"
                            function={() => this.removeManyItems()}
                          />
                        )}
                      </div>
                    </Col>
                    <Col sm="12" md="6" className="role-form-search">
                      <Row style={{}}>
                        <Col sm="12" md="5">
                          <FormGroup>
                            <Input
                              type="select"
                              name="select"
                              id="exampleSelect"
                            >
                              <option>Show 10 entries</option>
                              <option>Show 20 entries</option>
                              <option>Show 50 entries</option>
                              <option>Show 100 entries</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col sm="12" md="7">
                          <InputGroup className="role-input-group-search">
                            <Input className="role-input-search" />
                            <InputGroupAddon addonType="append">
                              <Button
                                className="role-btn-search"
                                color="success"
                              >
                                Search
                              </Button>
                            </InputGroupAddon>
                          </InputGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Container>
                <div className="table-rm">
                  <table className="table table-responsive-sm table-bordered table-striped table-hover table-custom">
                    <thead className="thead-light">
                      <tr>
                        <th>
                          <input type="checkbox" />
                        </th>
                        <th>#</th>
                        <th>Role</th>
                        <th>Description</th>
                        <th style={{ width: '180px' }}>Action</th>
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
                            <td>
                              {e.name.toLowerCase() == 'admin' ? (
                                <Badge color="danger" pill>
                                  {e.name}
                                </Badge>
                              ) : (
                                <Badge color="primary" pill>
                                  {e.name}
                                </Badge>
                              )}
                            </td>
                            <td>{e.description}</td>
                            <td>
                              <div className="action">
                                <div className="action-item">
                                  <ModalEditRole
                                    icon
                                    dataPermissions={this.state.dataPermissions}
                                    id={e.id}
                                    name={e.name}
                                    color="warning"
                                    getUpdate={this.getUpdate.bind(this)}
                                  />
                                </div>
                                <div className="action-item">
                                  <Link style={{ width: 'auto' }} to={url}>
                                    <Button
                                      className="view-button"
                                      color="primary"
                                    >
                                      <MdPageview />
                                    </Button>
                                  </Link>
                                </div>
                                <div className="action-item">
                                  <ModalRemoveItem
                                    item={e}
                                    itemName="this role"
                                    function={() => this.removeItem(e.id)}
                                  />
                                </div>
                              </div>
                              <div className="action-mobile">
                                <DropDownTable />
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
              </div>
            ) : (
              <div>
                <h3 style={{ color: 'red' }}>
                  {' '}
                  You don't have permission to access this page
                </h3>
              </div>
            )}
          </CardBody>
        )}
      </Card>
    );
  }
}
