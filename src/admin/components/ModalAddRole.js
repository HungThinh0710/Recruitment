import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  FormGroup,
  Form,
  Label,
  Input
} from 'reactstrap';
import './ModalConfirmPassword.css';
import '../pages/RolesPage.css';
import CollapsePermission from '../components/CollapsePermission';
import { MDBBtn } from 'mdbreact';
export default class ModalAddRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activePage: 1,
      currentPage: 1,
      totalItems: '',
      rows: [],
      itemId: '',
      role: '',
      description: '',
      listChecked: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  async componentWillMount() {
    let list = this.state.listChecked;
    var url = 'https://api.enclavei3dev.tk/api/permission?page=1';

    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());

    data.data.map(e => {
      return (e.action = (
        <input type="checkbox" onChange={() => handleCheck(e)} />
      ));
    });
    function handleCheck(e) {
      list.push(e.id);
    }

    this.setState({
      rows: data.data,
      listChecked: list,
      totalItems: data.total,
      currentPage: data.current_page
    });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber, currentPage: pageNumber });
    let list = this.state.listChecked;
    var url = 'https://api.enclavei3dev.tk/api/permission?page=' + pageNumber;
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      res.json().then(data => {
        data.data.map(e => {
          return (e.action = (
            <input type="checkbox" onChange={() => handleCheck(e)} />
          ));
        });
        function handleCheck(e) {
          list.push(e.id);
        }
        this.setState({
          rows: data.data,
          listChecked: list,
          totalItems: data.total,
          currentPage: data.current_page
        });
      });
    });
  }

  wrapperFunction = () => {
    this.addItem();
    this.toggle();
  };

  addItem() {
    const { role, listChecked, description } = this.state;
    var array1 = [...new Set(listChecked)];
    var array2 = [];
    array1.map(element => {
      var count = listChecked.filter(e => e === element);
      var length = count.length;
      if (length % 2 !== 0) {
        array2.push(element);
      }
      return array2;
    });
    var url = 'https://api.enclavei3dev.tk/api/role';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: role,
        description: description,
        permissions: array2
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    })
      .then(res => {
        if (res.status === 401) {
          alert('Add Failed');
        }
        if (res.status === 422) {
          alert('Add Failed');
        }
        if (res.status === 200) {
          alert('Add Successfully');
          var url2 =
            'https://api.enclavei3dev.tk/api/list-role?page=' + this.props.page;
          res.json().then(data => {
            fetch(url2, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
              }
            }).then(res => {
              res.json().then(data => {
                this.props.function(data);
              });
            });
          });
        }
      })
      .catch(error => console.error('Error:', error));
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <MDBBtn onClick={this.toggle} rounded color={this.props.color}>
          {this.props.buttonLabel}
        </MDBBtn>
        <Modal
          size="lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Create A New Role</ModalHeader>
          <ModalBody>
            <Card>
              <CardBody>
                <Form>
                  <FormGroup className="password-input">
                    <Label
                      for="exampleName"
                      style={{
                        marginTop: '1%',
                        marginLeft: '1%',
                        marginRight: '6.7%'
                      }}
                    >
                      Role:
                    </Label>
                    <Input
                      style={{ marginRight: '1%' }}
                      className="input-first"
                      type="text"
                      name="role"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup className="password-input">
                    <Label
                      for="exampleDescription"
                      style={{
                        marginTop: '1%',
                        marginLeft: '1%'
                      }}
                    >
                      Description:
                    </Label>
                    <Input
                      style={{ marginRight: '1%' }}
                      className="input-first"
                      type="text"
                      name="description"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <CollapsePermission
                      style={{
                        marginBottom: '1rem',
                        paddingLeft: '42%',
                        paddingRight: '42%'
                      }}
                      name="Permission"
                      data={this.state.rows}
                      activePage={this.state.activePage}
                      itemsCountPerPage={10}
                      totalItemsCount={this.state.totalItems}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                    />
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.wrapperFunction}>{this.props.nameButtonAccept}</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button> 
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
