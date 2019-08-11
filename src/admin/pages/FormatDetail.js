import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { MdCancel, MdSettings, MdBook } from 'react-icons/md';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import PropTypes from 'prop-types';
import './AddNewFormatPage.css';
import classnames from 'classnames';

export default class AddNewFormatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      editTitle: '',
      editContent: '',
      activeTab: '1',
      errorTitle: '',
      errorData: '',
      modalError: false,
      modalSuccess: false,
      modalPreview: false,
      showErrorMessage: false,
      urlFormat: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
    this.toggleModalPreview = this.toggleModalPreview.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/login');
    }
  }
  async componentDidMount() {
    const { id } = this.props.match.params;
    var url = 'https://enclave-recruitment-management.herokuapp.com/api/format-article/' + id;
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    this.setState({
      title: data.title,
      content: data.content,
      editTitle: data.title,
      editContent: data.content
    });
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  handleChange(event) {
    var { errorTitle } = this.state;
    switch (event.target.name) {
      case 'editTitle':
        if (event.target.value.length === 0) errorTitle = 'Title is required';
        else errorTitle = '';
        break;
    }
    this.setState({
      [event.target.name]: event.target.value,
      errorTitle: errorTitle
    });
  }
  toggleModalSuccess() {
    this.setState(prevState => ({
      modalSuccess: !prevState.modalSuccess
    }));
  }
  toggleModalError() {
    this.setState(prevState => ({
      modalError: !prevState.modalError
    }));
  }
  toggleModalPreview() {
    this.setState(prevState => ({
      modalPreview: !prevState.modalPreview
    }));
  }
  handleErrorMessage = () => {
    this.setState({
      showErrorMessage: true
    });
  };

  handleSubmit() {
    const { id } = this.props.match.params;
    const { editTitle, editContent } = this.state;
    var url = 'https://enclave-recruitment-management.herokuapp.com/api/format-article/' + id;
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        title: editTitle,
        content: editContent
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
          this.toggleModalError();
          res.json().then(data => {
            const dataArray = Object.keys(data.errors).map(i => data.errors[i]);
            this.setState({
              errorData: dataArray
            });
          });
        }
        if (res.status === 200) {
          this.toggleModalSuccess();
          this.setState({
            title: editTitle,
            content: editContent
          });
        }
      })
      .catch(error => console.error('Error:', error));
  }

  handleEditorChange(html) {
    this.setState({ editContent: html });
  }
  render() {
    var i = 0;
    return (
      <Card className="dashboard-card">
        {/*--------Modal-Success-----*/}
        <Modal
          isOpen={this.state.modalSuccess}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader
            toggle={this.toggleModalSuccess}
            className="card-header-custom"
          >
            <span className="dashboard-modal-header">Notification</span>
          </ModalHeader>
          <ModalBody>
            <span style={{ color: '#45b649' }}>Update Successfully</span>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalSuccess}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/*--------Modal-Success-----*/}

        {/*--------Modal-Error-----*/}
        <Modal
          isOpen={this.state.modalError}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader
            toggle={this.toggleModalError}
            className="card-header-custom"
          >
            <span className="dashboard-modal-header">Notification</span>
          </ModalHeader>
          <ModalBody>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {this.state.errorData !== undefined &&
                this.state.errorData.length !== 0 &&
                this.state.errorData.map(e => {
                  i++;
                  return (
                    <span key={i} style={{ color: 'red' }}>
                      {e[0]}
                    </span>
                  );
                })}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalError}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/*--------Modal-Error-----*/}

        {/*--------Modal-Preview-----*/}
        <Modal
          size="lg"
          isOpen={this.state.modalPreview}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModalPreview}>
            Title: {this.state.editTitle}
          </ModalHeader>
          <ModalBody>{renderHTML(this.state.editContent)}</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalPreview}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/*--------Modal-Preview-----*/}

        <CardHeader className="card-header-custom">
          Template's information
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      tabactive: this.state.activeTab === '1'
                    })}
                    onClick={() => {
                      this.toggle('1');
                    }}
                  >
                    <MdBook style={{ marginRight: '5px' }} />
                    Detail
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    className={classnames({
                      tabactive: this.state.activeTab === '2'
                    })}
                    onClick={() => {
                      this.toggle('2');
                    }}
                  >
                    <MdSettings style={{ marginRight: '5px' }} />
                    Update
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
          <br />
          <br />
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col xs="2" style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    Name:
                  </span>
                </Col>
                <Col style={{ display: 'flex', alignItems: 'center' }}>
                  <span>{this.state.title}</span>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs="2">
                  <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    Content:
                  </span>
                </Col>
                <Col>{renderHTML(this.state.content)}</Col>
              </Row>
              <br />
              <Row>
                <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Link to="/dashboard/format">
                    <Button>Back</Button>
                  </Link>
                </Col>
              </Row>

              <br />
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <Label for="Name">Name</Label>
                      <Input
                        className="input-title"
                        type="text"
                        name="editTitle"
                        onChange={this.handleChange}
                        value={this.state.editTitle}
                      />
                      {this.state.errorTitle !== '' &&
                        this.state.showErrorMessage && (
                          <span style={{ color: 'red' }}>
                            {this.state.errorTitle}
                          </span>
                        )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="Content">Content</Label>
                      <ReactQuill
                        onChange={this.handleEditorChange}
                        value={this.state.editContent}
                        modules={AddNewFormatPage.modules}
                        formats={AddNewFormatPage.formats}
                        bounds={'.app'}
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          width: '260px'
                        }}
                      >
                        {this.state.errorTitle == '' ? (
                          <Button color="success" onClick={this.handleSubmit}>
                            Submit
                          </Button>
                        ) : (
                          <Button
                            color="success"
                            onClick={this.handleErrorMessage.bind(this)}
                          >
                            Submit
                          </Button>
                        )}
                        <Button
                          color="primary"
                          onClick={this.toggleModalPreview}
                        >
                          Preview
                        </Button>
                        <Link to="/dashboard/format">
                          <Button>Back</Button>
                        </Link>
                      </div>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    );
  }
}
AddNewFormatPage.modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false
  }
};

AddNewFormatPage.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'align',
  'color',
  'background',
  'link',
  'image',
  'video'
];

AddNewFormatPage.propTypes = {
  placeholder: PropTypes.string
};
