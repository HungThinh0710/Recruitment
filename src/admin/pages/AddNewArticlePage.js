import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  CardHeader
} from 'reactstrap';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import renderHTML from 'react-render-html';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { storage } from '../firebase/firebase';
import './AddNewArticlePage.css';
import axios from 'axios';

export default class AddNewArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: '',
      category: '',
      content: '',
      jobData: [],
      catData: [],
      activePageJob: 1,
      currentPageJob: 1,
      activePageCat: 1,
      currentPageCat: 1,
      totalItemsJob: '',
      totalItemsCat: '',
      errorTitle: 'Title is required',
      errorData: '',
      modalError: false,
      modalSuccess: false,
      modalPreview: false,
      showErrorMessage: false,
      urlArticle: '',
      selectedJobOption: null,
      selectedCategoryOption: null,
      selectedFormatOption: null,
      optionsJob: [],
      optionsCategory: [],
      optionsFormat: [],
      isDisabled: false,
      showJobError: false,
      image: null,
      url: '',
      progressLoading: false
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
    this.toggleModalPreview = this.toggleModalPreview.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
  }
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/login');
    }
  }
  async componentDidMount() {
    var { optionsJob, optionsCategory, optionsFormat } = this.state;
    var url1 = 'https://enclave-recruitment-management.herokuapp.com/api/list-job';
    var url2 = 'https://enclave-recruitment-management.herokuapp.com/api/category?page=1';
    var url3 = 'https://enclave-recruitment-management.herokuapp.com/api/format-article';
    const data1 = await fetch(url1, {
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
    const data2 = await fetch(url2, {
      method: 'POST',
      body: JSON.stringify({
        field: 'name',
        orderBy: 'asc'
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    const data3 = await fetch(url3, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    data1.map(e => {
      var job = { id: e.id, value: e.name, label: e.name };
      optionsJob.push(job);
      return optionsJob;
    });
    data2.data.map(e => {
      var category = { id: e.id, value: e.name, label: e.name };
      optionsCategory.push(category);
      return optionsCategory;
    });
    data3.map(e => {
      var format = {
        id: e.id,
        value: e.title,
        label: e.title,
        content: e.content
      };
      optionsFormat.push(format);
      return optionsFormat;
    });

    this.setState({
      jobData: data1.data,
      catData: data2.data,
      optionsJob: optionsJob,
      optionsCategory: optionsCategory,
      optionsFormat: optionsFormat,
      totalItemsJob: data1.total,
      totalItemsCat: data2.total,
      currentPageJob: data1.current_page,
      currentPageCat: data2.current_page,
      urlArticle: '/dashboard/create-article'
    });
  }
  handleSelectCategoryChange = selectedCategoryOption => {
    if (selectedCategoryOption.value == 'Others') {
      this.setState({
        selectedCategoryOption,
        isDisabled: true,
        showJobError: false,
        selectedJobOption: null,
        selectedFormatOption: null,
        content: ''
      });
    } else {
      this.setState({
        selectedCategoryOption,
        isDisabled: false,
        showJobError: true
      });
    }
  };
  handleSelectJobChange = selectedJobOption => {
    this.setState({ selectedJobOption, showJobError: false });
  };

  handleSelectFormatChange = selectedFormatOption => {
    this.setState({
      selectedFormatOption,
      content: selectedFormatOption.content
    });
  };
  handleErrorMessage = () => {
    this.setState({
      showErrorMessage: true
    });
  };

  handleEditorChange(html) {
    this.setState({ content: html });
  }

  handleChangeImage = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      var url = URL.createObjectURL(e.target.files[0]);

      this.setState({ url: url, image: image });
    }
  };

  backToPreviousPage = () => {
    this.props.history.push('/dashboard/article');
  };

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

  handlePublish = () => {
    const {
      title,
      content,
      selectedCategoryOption,
      selectedJobOption,
      image
    } = this.state;

    var jobId = 0;
    var catId = 0;
    if (selectedCategoryOption) catId = selectedCategoryOption.id;
    if (selectedJobOption) jobId = selectedJobOption.id;
    const formData = new FormData();
    if (jobId === 0) {
      if (image) {
        formData.set('title', title);
        formData.set('content', content);
        formData.set('catId', catId);
        formData.set('isPublic', 1);
        formData.append('image', image);
      } else {
        formData.set('title', title);
        formData.set('content', content);
        formData.set('catId', catId);
        formData.set('isPublic', 1);
      }
    } else {
      if (image) {
        formData.set('title', title);
        formData.set('content', content);
        formData.set('catId', catId);
        formData.set('jobId', jobId);
        formData.set('isPublic', 1);
        formData.append('image', image);
      } else {
        formData.set('title', title);
        formData.set('content', content);
        formData.set('catId', catId);
        formData.set('jobId', jobId);
        formData.set('isPublic', 1);
      }
    }

    let configs = {
      header: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json'
      }
    };

    var url = 'https://enclave-recruitment-management.herokuapp.com/api/article';

    axios.defaults.headers.common = {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json'
    };
    var urlHT = 'https://enclave-recruitment-management.herokuapp.com/api/article';
    axios
      .post(urlHT, formData, {})
      .then(res => {
        if (res.status === 401) {
          alert('Add Failed');
        }
        if (res.status === 422) {
          this.toggleModalError();
          const dataArray = Object.keys(res.data.errors).map(
            i => res.data.errors[i]
          );
          this.setState({
            errorData: dataArray
          });
        }

        if (res.status === 200) {
          this.toggleModalSuccess();
          this.setState({
            urlArticle: '/dashboard/article/' + res.data.article.id
          });
        }
      })
      .catch(error => console.error('Error:', error));
  };

  handleSave = () => {
    const {
      title,
      content,
      selectedCategoryOption,
      selectedJobOption,
      image
    } = this.state;

    var jobId = 0;
    var catId = 0;
    if (selectedCategoryOption) catId = selectedCategoryOption.id;
    if (selectedJobOption) jobId = selectedJobOption.id;
    const formData = new FormData();
    if (jobId === 0) {
      if (image) {
        formData.set('title', title);
        formData.set('content', content);
        formData.set('catId', catId);
        formData.set('isPublic', 0);
        formData.append('image', image);
      } else {
        formData.set('title', title);
        formData.set('content', content);
        formData.set('catId', catId);
        formData.set('isPublic', 0);
      }
    } else {
      if (image) {
        formData.set('title', title);
        formData.set('content', content);
        formData.set('catId', catId);
        formData.set('jobId', jobId);
        formData.set('isPublic', 0);
        formData.append('image', image);
      } else {
        formData.set('title', title);
        formData.set('content', content);
        formData.set('catId', catId);
        formData.set('jobId', jobId);
        formData.set('isPublic', 0);
      }
    }

    let configs = {
      header: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json'
      }
    };

    var url = 'https://enclave-recruitment-management.herokuapp.com/api/article';

    axios.defaults.headers.common = {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json'
    };
    var urlHT = 'https://enclave-recruitment-management.herokuapp.com/api/article';
    axios
      .post(urlHT, formData, {})
      .then(res => {
        if (res.status === 401) {
          alert('Add Failed');
        }
        if (res.status === 422) {
          this.toggleModalError();
          const dataArray = Object.keys(res.data.errors).map(
            i => res.data.errors[i]
          );
          this.setState({
            errorData: dataArray
          });
        }
        if (res.status === 200) {
          this.toggleModalSuccess();
          this.setState({
            urlArticle: '/dashboard/article/' + res.data.article.id
          });
        }
      })
      .catch(error => console.error('Error:', error));
  };

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

  render() {
    var i = 0;
    const { urlArticle, showJobError, selectedJobOption } = this.state;
    var check = false;
    if (showJobError == true && !selectedJobOption) {
      check = false;
    }
    if (showJobError == true && selectedJobOption) {
      check = true;
    }
    if (showJobError == false) {
      check = true;
    }
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
            <Link to={urlArticle}>
              <span style={{ color: '#45b649' }}>
                Successfully! Click to see the detail of the new article
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
          <ModalHeader
            toggle={this.toggleModalPreview}
            className="card-header-custom"
          >
            Title: {this.state.title}
          </ModalHeader>
          <ModalBody style={{ padding: '35px' }}>
            <div>
              <img
                src={this.state.url}
                style={{ width: '100%', marginBottom: '30px' }}
              />
              <br />
              {renderHTML(this.state.content)}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalPreview}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/*--------Modal-Preview-----*/}

        <CardHeader className="card-header-custom">
          Create a new article
        </CardHeader>

        <CardBody>
          <Row>
            <Col>
              <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '90%' }}>
                  {/* <Form onSubmit={this.handleSubmit}> */}
                  <Form>
                    <FormGroup>
                      <Label className="title-input" for="Name">
                        Title
                      </Label>
                      <Input
                        className="title-add-new-article"
                        type="text"
                        name="title"
                        onChange={this.handleChange}
                      />
                      {this.state.errorTitle !== '' &&
                        this.state.showErrorMessage && (
                          <span style={{ color: 'red' }}>
                            {this.state.errorTitle}
                          </span>
                        )}
                    </FormGroup>
                    <FormGroup>
                      <Label className="title-input" for="Category">
                        Category
                      </Label>
                      <Select
                        className="create-article-input"
                        value={this.state.selectedCategoryOption}
                        onChange={this.handleSelectCategoryChange.bind(this)}
                        options={this.state.optionsCategory}
                      />
                      {!this.state.selectedCategoryOption &&
                        this.state.showErrorMessage && (
                          <span style={{ color: 'red' }}>
                            Category is required
                          </span>
                        )}
                    </FormGroup>
                    <FormGroup
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ width: '45%' }}>
                        <Label className="title-input" for="Job">
                          Job
                        </Label>
                        <Select
                          className="create-article-input"
                          value={this.state.selectedJobOption}
                          onChange={this.handleSelectJobChange.bind(this)}
                          options={this.state.optionsJob}
                          isDisabled={this.state.isDisabled}
                        />
                        {!this.state.selectedJobOption &&
                          this.state.showJobError &&
                          this.state.showErrorMessage && (
                            <span style={{ color: 'red' }}>
                              Job is required
                            </span>
                          )}
                      </div>

                      <div style={{ width: '45%' }}>
                        <Label className="title-input" for="Category">
                          Format
                        </Label>
                        <Select
                          className="create-article-input"
                          value={this.state.selectedFormatOption}
                          onChange={this.handleSelectFormatChange.bind(this)}
                          options={this.state.optionsFormat}
                          isDisabled={this.state.isDisabled}
                        />
                      </div>
                    </FormGroup>
                    {/* {this.state.content && ( */}
                    <FormGroup>
                      <Label className="title-input" for="Content">
                        Image
                      </Label>

                      <Input
                        type="file"
                        name="image"
                        onChange={this.handleChangeImage}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="title-input" for="Content">
                        Content
                      </Label>
                      <ReactQuill
                        onChange={this.handleEditorChange}
                        value={this.state.content}
                        modules={AddNewArticlePage.modules}
                        formats={AddNewArticlePage.formats}
                        bounds={'.app'}
                        placeholder={this.props.placeholder}
                      />
                      {this.state.content == '' &&
                        this.state.showErrorMessage && (
                          <span style={{ color: 'red' }}>
                            Content is required
                          </span>
                        )}
                    </FormGroup>
                    {/* )} */}
                    <br />
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
                          width: '380px'
                        }}
                      >
                        <Button
                          onClick={this.toggleModalPreview}
                          color="primary"
                        >
                          Preview
                        </Button>
                        {this.state.errorTitle == '' &&
                        check &&
                        this.state.selectedCategoryOption ? (
                          <Button color="success" onClick={this.handlePublish}>
                            Publish
                          </Button>
                        ) : (
                          <Button
                            color="success"
                            onClick={this.handleErrorMessage.bind(this)}
                          >
                            Publish
                          </Button>
                        )}
                        {this.state.errorTitle == '' &&
                        check &&
                        this.state.selectedCategoryOption ? (
                          <Button onClick={this.handleSave} color="warning">
                            Unpublished
                          </Button>
                        ) : (
                          <Button
                            onClick={this.handleErrorMessage.bind(this)}
                            color="warning"
                          >
                            Unpublished
                          </Button>
                        )}
                        <Button
                          onClick={() => this.backToPreviousPage()}
                          color="secondary"
                        >
                          Back
                        </Button>
                      </div>
                    </FormGroup>
                  </Form>
                </div>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}
AddNewArticlePage.modules = {
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

AddNewArticlePage.formats = [
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

AddNewArticlePage.propTypes = {
  placeholder: PropTypes.string
};
