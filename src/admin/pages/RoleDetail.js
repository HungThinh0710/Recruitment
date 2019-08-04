import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import ModalEditRole from '../components/ModalEditRole';
import { MdCancel } from 'react-icons/md';
import './RoleDetail.css';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
const styleFont = {
  fontSize: '200%',
  display: 'flex',
  justifyContent: 'space-between'
};
const styleCard = {
  width: '80%',
  marginTop: '5%',
  alignSelf: 'center',
  marginBottom: '8%'
};
export default class RoleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      loading: true,
      columns: [
        {
          label: '#',
          field: 'index',
          sort: 'asc',
          width: 50
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 300
        },
        {
          label: 'Description',
          field: 'description',
          sort: 'asc',
          width: 300
        }
      ],
      rows: [],
      dataPermissions: ''
    };
  }
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/login');
    }
  }
  async componentDidMount() {
    var i = 0;
    const { id } = this.props.match.params;
    var listRoles = [];
    var url = 'https://api.enclavei3dev.tk/api/role/' + id;
    var url2 = 'https://api.enclavei3dev.tk/api/permission';
    const data = await fetch(url, {
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
    if (data.message !== 'Unauthenticated.') {
      data.permissions.forEach(function(e) {
        delete e.id;
        delete e.created_at;
        delete e.updated_at;
        delete e.pivot;
        i++;
        e = Object.assign({ index: i }, e, { description: '' });
        listRoles.push(e);
      });
      setTimeout(() => {
        this.setState({
          name: data.name,
          rows: listRoles,
          loading: false,
          dataPermissions: data2
        });
      }, 500);
    }
  }

  backToPreviousPage = () => {
    this.props.history.push('/dashboard/role');
  };

  editRole(rows, name) {
    this.setState({
      name: name,
      rows: rows
    });
  }
  getUpdate(update) {
    if ((update = true)) {
      this.componentDidMount();
    }
  }

  render() {
    const { id } = this.props.match.params;
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {this.state.loading ? (
          <Card style={styleCard}>
            <CardHeader style={styleFont}>
              Role's Information
              <div className="button-exit">
                <Link to="/dashboard/role">
                  <MdCancel />
                </Link>
              </div>
            </CardHeader>
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
          </Card>
        ) : (
          <Card style={styleCard}>
            <CardHeader style={styleFont}>
              {this.state.name}'s Information
              <div className="button-exit">
                <Link to="/dashboard/role">
                  <MdCancel />
                </Link>
              </div>
            </CardHeader>
            <CardBody>
              <ModalEditRole
                icon
                dataPermissions={this.state.dataPermissions}
                id={id}
                color="success"
                getUpdate={this.getUpdate.bind(this)}
              />
              <br />
              <MDBDataTable striped bordered hover data={this.state} />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  onClick={() => this.backToPreviousPage()}
                  color="secondary"
                >
                  Back
                </Button>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    );
  }
}
