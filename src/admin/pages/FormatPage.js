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
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap';
import { PulseLoader } from 'react-spinners';
import DropDownTable from '../components/DropDownTable.js';
import { Link } from 'react-router-dom';
import ModalEditFormat from '../components/ModalEditFormat';
import ModalRemoveItem from '../components/ModalRemoveItem';
import { MdCancel, MdPageview } from 'react-icons/md';

export default class FormatPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listDeleteName: [],
      listDeleteId: [],
      rows: [],
      currentPage: 0,
      activePage: 1,
      totalItems: 0,
      listId: [],
      loading: true,
      modalDeleteError: false,
      modalDeleteSuccess: false
    };
    this.toggleModalDeleteError = this.toggleModalDeleteError.bind(this);
    this.toggleModalDeleteSuccess = this.toggleModalDeleteSuccess.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/login');
    }
  }
  async componentDidMount() {
    var url = 'https://api.enclavei3dev.tk/api/format-article';
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    setTimeout(() => {
      this.setState({
        rows: data,
        loading: false
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
    var url = 'https://api.enclavei3dev.tk/api/format-article';
    fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        formatId: listDeleteId,
        status: 'none'
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      fetch(
        'https://api.enclavei3dev.tk/api/format-article?page=' + activePage,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }
        }
      ).then(res => {
        res.json().then(data => {
          if (res.status === 200) {
            this.toggleModalDeleteSuccess();
            this.setState({
              rows: data,
              listDeleteId: []
            });
          } else {
            this.toggleModalDeleteError();
          }
        });
      });
    });
  }

  removeItem(id) {
    const { activePage } = this.state;
    var array = [];
    array.push(id);
    var url = 'https://api.enclavei3dev.tk/api/format-article';
    fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        formatId: array,
        status: 'none'
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      fetch(
        'https://api.enclavei3dev.tk/api/format-article?page=' + activePage,
        {
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
              rows: data
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
            <span style={{ color: 'red' }}>Cannot delete this job</span>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalDeleteError}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/*--------Modal-Error-----*/}
        <CardHeader
          className="card-header-custom"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          Format Management
          <div className="icon-cancle">
            <Link to="/dashboard/article">
              <MdCancel />
            </Link>
          </div>
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
                    <Link to="/dashboard/create-format">
                      <Button color="success">Create</Button>
                    </Link>

                    {this.state.listDeleteId.length != 0 && (
                      <ModalRemoveItem
                        itemName="these formats"
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
                    <th style={{ width: '5%' }}>
                      <input type="checkbox" />
                    </th>
                    <th style={{ width: '5%' }}>#</th>
                    <th>Title</th>
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
                    let url = '/dashboard/format/' + e.id;
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
                        {/* <td>{e.created_at}</td>
                      <td>{e.updated_at}</td> */}
                        <td>
                          <div className="action">
                            <div className="action-item">
                              <ModalEditFormat
                                icon
                                id={e.id}
                                name={e.name}
                                color="warning"
                                buttonLabel="Edit"
                                getUpdate={this.getUpdate.bind(this)}
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
                                function={() => this.removeItem(e.id)}
                                itemName="this format"
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
            </div>
          </CardBody>
        )}
      </Card>
    );
  }
}
