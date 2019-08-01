import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import ModalRemoveRole from '../components/ModalRemoveRole';
import ModalRemoveRoles from '../components/ModalRemoveRoles';
import ModalAddRole from '../components/ModalAddRole';
import ModalEditItem from '../components/ModalEditItem';
import { Link } from 'react-router-dom';
import './RolesPage.css';
import { MdPageview, MdEdit } from 'react-icons/md';
import PaginationComponent from '../components/Pagination.js';
import './TestPage.css';

import { ClipLoader } from 'react-spinners';
const styleFont = {
  fontSize: '200%'
};
const styleCard = {
  width: '80%',
  marginTop: '5%',
  alignSelf: 'center',
  marginBottom: '8%'
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
      loading: true
    };
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.removeManyItems = this.removeManyItems.bind(this);
  }
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/login');
    }
  }
  async componentDidMount() {
    const { activePage } = this.state;
    // var url = 'https://api.enclavei3dev.tk/api/list-role?page=' + activePage;
    var url = 'https://api.enclavei3dev.tk/api/list-role';
    // var i = 0;
    // var listRoles = [];
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
        currentPage: data.currentPage,
        totalItems: data.total,
        rows: data.data,
        loading: false
      });
    }, 500);
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
    const { totalItems } = this.state;
    var i = 0;
    return (
      <Card style={styleCard}>
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
            <ModalAddRole
              color="success"
              buttonLabel="Create a new role"
              page={this.state.activePage}
              nameButtonAccept="Submit"
              function={this.addRole.bind(this)}
            />

            {this.state.listDeleteId.length != 0 && (
              <ModalRemoveRoles
                arrayName={this.state.listDeleteName}
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
                            <ModalRemoveRole
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
