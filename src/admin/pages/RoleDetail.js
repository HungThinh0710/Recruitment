import React, { Component } from 'react'
import { Card, CardBody, CardHeader , Button} from 'reactstrap';
import { MDBDataTable } from 'mdbreact';

const styleFont = {
  fontSize: '200%',
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
    this.state={
      name:'',
      columns: [
        {
          label: 'Id',
          field: 'id',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 300
        },
        {
          label: 'Action',
          field: 'action',
          sort: 'asc',
          width: 100
        }
        ],
      rows : []
    }
  }
  async componentWillMount(){
    const {id} = this.props.match.params;
    //const {firstName, lastName, email} = this.state;
    var url = 'http://api.enclavei3dev.tk/api/role/'+id;
    const data = await fetch(url, {
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
      }
    }).then(res => res.json()) 
    data.permissions.forEach(function(e){
      delete e.created_at;
      delete e.updated_at;
      delete e.pivot;
      
    })
    this.setState({
      name: data.name,
      rows: data.permissions
    })
  }
  render() {

    return (
      <Card  style={styleCard}>
      <CardHeader style={styleFont}>{this.state.name}'s Permissions</CardHeader>
      <CardBody>
      <MDBDataTable
      striped
      bordered
      hover
      data={this.state}
      />
    </CardBody>
    </Card> 
    )
  }
}
