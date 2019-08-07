import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap';
import ReactQuill from 'react-quill';
import { MdEdit } from 'react-icons/md';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
export default class ModalEditFormat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      errorTitle: '',
      errorData: '',
      modal: false,
      modalError: false,
      modalSuccess: false,
      modalPreview: false,
      showErrorMessage: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
    this.toggleModalPreview = this.toggleModalPreview.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  async componentDidMount() {
    const { id } = this.props;
    var url = 'https://api.enclavei3.tk/api/format-article/' + id;
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    this.setState({
      title: data.title,
      content: data.content
    });
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
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
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
    const { id } = this.props;
    const { title, content } = this.state;
    var url = 'https://api.enclavei3.tk/api/format-article/' + id;
    fetch(url, {
      method: 'PUT',
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
          var update = true;
          this.toggleModalSuccess();
          this.props.getUpdate(update);
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
      <div>
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
            Name: {this.state.title}
          </ModalHeader>
          <ModalBody>{renderHTML(this.state.content)}</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalPreview}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/*--------Modal-Preview-----*/}
        {this.props.icon ? (
          <Button
            className="button-first"
            color={this.props.color}
            onClick={this.toggle}
            style={{ color: 'white' }}
          >
            <MdEdit />
          </Button>
        ) : (
          <Button
            className="button-first"
            color={this.props.color}
            onClick={this.toggle}
          >
            Edit
          </Button>
        )}

        <Modal
          size="lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            {' '}
            <span className="dashboard-modal-header">Update template</span>{' '}
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="Name">Name</Label>
                <Input
                  className="input-title"
                  type="text"
                  name="title"
                  onChange={this.handleChange}
                  value={this.state.title}
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
                  value={this.state.content}
                  modules={ModalEditFormat.modules}
                  formats={ModalEditFormat.formats}
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
                    width: '300px'
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
                  <Button onClick={this.toggle} color="secondary">
                    Back
                  </Button>
                </div>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
ModalEditFormat.modules = {
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

ModalEditFormat.formats = [
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
