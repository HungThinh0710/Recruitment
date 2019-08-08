import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { MdCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import PropTypes from 'prop-types';
import './AddNewFormatPage.css';

export default class AddNewFormatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      errorTitle: 'Title is required',
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
  }
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/login');
    }
  }
  handleChange(event) {
    var { errorTitle } = this.state;
    switch (event.target.name) {
      case 'title':
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
    const { title, content } = this.state;
    var url = 'https://api.enclavei3dev.tk/api/format-article';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        content: content
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
          res.json().then(data => {
            this.setState({
              urlFormat: '/dashboard/format/' + data.id
            });
          });
        }
      })
      .catch(error => console.error('Error:', error));
  }

  handleEditorChange(html) {
    this.setState({ content: html });
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
          <ModalHeader toggle={this.toggleModalSuccess}>
            <span className="dashboard-modal-header">Notification</span>
          </ModalHeader>
          <ModalBody>
            <Link to={this.state.urlFormat}>
              <span style={{ color: '#45b649' }}>
                Successfully! Click to see the detail of the new template
              </span>
            </Link>
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
          <ModalHeader toggle={this.toggleModalError}>
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
            Title: {this.state.title}
          </ModalHeader>
          <ModalBody>{renderHTML(this.state.content)}</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalPreview}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/*--------Modal-Preview-----*/}

        <CardHeader className="card-header-custom">
          Create a new template
        </CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="Name">Name</Label>
              <Input
                className="input-title"
                type="text"
                name="title"
                onChange={this.handleChange}
              />
              {this.state.errorTitle !== '' && this.state.showErrorMessage && (
                <span style={{ color: 'red' }}>{this.state.errorTitle}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="Content">Content</Label>
              <ReactQuill
                onChange={this.handleEditorChange}
                value={this.state.content}
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
                <Button color="primary" onClick={this.toggleModalPreview}>
                  Preview
                </Button>
                <Link to="/dashboard/format">
                  <Button>Back</Button>
                </Link>
              </div>
            </FormGroup>
          </Form>
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
