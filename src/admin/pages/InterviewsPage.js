import React, { Component } from 'react';

import { MdPageview } from 'react-icons/md';
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
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap';
import ModalRemoveItem from '../components/ModalRemoveItem';
import ModalEditItem from '../components/ModalEditItem';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination.js';
import { PulseLoader } from 'react-spinners';
import DropDownTable from '../components/DropDownTable.js';

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
      loading: true,
      listDeleteId: [],
      modalDeleteError: false,
      modalDeleteSuccess: false
    };

    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.toggleModalDeleteError = this.toggleModalDeleteError.bind(this);
    this.toggleModalDeleteSuccess = this.toggleModalDeleteSuccess.bind(this);
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

  handleCheckChange(e) {
    const { listDeleteId } = this.state;
    listDeleteId.push(e.id);

    var array1 = [...new Set(listDeleteId)];

    var array2 = [];

    array1.map(element => {
      var count = listDeleteId.filter(e => e === element);
      var length = count.length;
      if (length % 2 !== 0) {
        array2.push(element);
      }
      return array2;
    });
    this.setState({
      listDeleteId: array2
    });
  }

  removeItem(id) {
    const { activePage } = this.state;
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
      fetch(
        'https://api.enclavei3dev.tk/api/list-interview?page=' + activePage,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }
        }
      ).then(res => {
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
      fetch(
        'https://api.enclavei3dev.tk/api/list-interview?page=' + activePage,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }
        }
      ).then(res => {
        if (res.status === 200) {
          this.toggleModalDeleteSuccess();
          res.json().then(data => {
            this.setState({
              rows: data.data,
              totalItems: data.total,
              listDeleteId: []
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
            <span style={{ color: 'red' }}>Cannot delete this interview</span>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalDeleteError}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/*--------Modal-Error-----*/}
        <CardHeader className="card-header-custom">
          interviews Management
        </CardHeader>
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
            <Container fluid={true} className="role-container-head-row">
              <Row className="role-head-row">
                <Col sm="12" md="6" className="role-form-create">
                  <div className="form-header-area-button">
                    <Link to="/dashboard/create-interview">
                      <Button color="success">Create</Button>
                    </Link>
                    {this.state.listDeleteId.length != 0 && (
                      <ModalRemoveItem
                        itemName="this interviews"
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
                        <Input type="select" name="select" id="exampleSelect">
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
                          <Button className="role-btn-search" color="success">
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
                    <th>Name</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Start</th>
                    <th>End</th>
                    <th style={{ width: '180px' }}>
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
                          <input
                            type="checkbox"
                            onChange={() => this.handleCheckChange(e)}
                          />
                        </td>
                        <td>{i}</td>
                        <td>{e.name}</td>
                        <td>{e.address}</td>
                        <td>{e.status}</td>
                        <td>{e.timeStart}</td>
                        <td>{e.timeEnd}</td>
                        <td>
                          <div className="action">
                            <div className="action-item">
                              <ModalEditItem
                                icon
                                // id={listId[index]}
                                name={e.name}
                                color="warning"
                                buttonLabel="Edit"
                                // function={this.editRole.bind(this)}
                              />
                            </div>
                            <div className="action-item">
                              <Link style={{ width: 'auto' }} to={url}>
                                <Button className="view-button" color="primary">
                                  <MdPageview />
                                </Button>
                              </Link>
                            </div>
                            <div className="action-item">
                              <ModalRemoveItem
                                itemName="this interview"
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
