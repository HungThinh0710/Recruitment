import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import ModalEditItem from '../components/ModalEditItem';
import './RoleDetail.css';
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
      rows: []
    };
  }
  async componentWillMount() {
    var i = 0;
    const { id } = this.props.match.params;
    var listRoles = [];
    var url = 'https://api.enclavei3dev.tk/api/role/' + id;
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    data.permissions.forEach(function(e) {
      delete e.id;
      delete e.created_at;
      delete e.updated_at;
      delete e.pivot;
      i++;
      e = Object.assign({ index: i }, e, { description: 'abc' });
      listRoles.push(e);
    });
    setTimeout(() => {
      this.setState({
        name: data.name,
        rows: listRoles,
        loading: false
      });
    }, 500);
  }

  editRole(rows, name) {
    this.setState({
      name: name,
      rows: rows
    });
  }

  render() {
    const { id } = this.props.match.params;
    return (
      <Card style={styleCard}>
        <CardHeader style={styleFont}>
          {this.state.name}'s Permissions
        </CardHeader>
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
              color={'green'}
              loading={this.state.loading}
            />
          </div>
        ) : (
          <CardBody>
            <ModalEditItem
              icon
              id={id}
              name={this.state.name}
              color="success"
              buttonLabel="Edit"
              function={this.editRole.bind(this)}
            />
            <br />
            <MDBDataTable striped bordered hover data={this.state} />
          </CardBody>
        )}
      </Card>
    );
  }
}
