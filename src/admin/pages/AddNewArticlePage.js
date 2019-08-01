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
  ModalFooter
} from 'reactstrap';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import renderHTML from 'react-render-html';
import PropTypes from 'prop-types';
import { MdCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './AddNewArticlePage.css';

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
      showJobError: false
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
    this.toggleModalPreview = this.toggleModalPreview.bind(this);
  }
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/login');
    }
  }
  async componentDidMount() {
    var { optionsJob, optionsCategory, optionsFormat } = this.state;
    var url1 = 'https://api.enclavei3dev.tk/api/list-job';
    var url2 = 'https://api.enclavei3dev.tk/api/category?page=1';
    var url3 = 'https://api.enclavei3dev.tk/api/format-article';
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
    console.log(data2);
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
        selectedJobOption: null
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
      selectedJobOption
    } = this.state;
    var jobId = 0;
    var catId = 0;
    if (selectedCategoryOption) catId = selectedCategoryOption.id;
    if (selectedJobOption) jobId = selectedJobOption.id;
    var body = '';
    jobId === 0
      ? (body = { title: title, content: content, catId: catId, isPublic: 1 })
      : (body = {
          title: title,
          content: content,
          catId: catId,
          jobId: jobId,
          isPublic: 1
        });

    var url = 'https://api.enclavei3dev.tk/api/article';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
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
              urlArticle: '/dashboard/article/' + data.article.id
            });
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
      selectedJobOption
    } = this.state;
    var jobId = 0;
    var catId = 0;
    if (selectedCategoryOption) catId = selectedCategoryOption.id;
    if (selectedJobOption) jobId = selectedJobOption.id;
    var body = '';
    jobId === 0
      ? (body = { title: title, content: content, catId: catId, isPublic: 0 })
      : (body = {
          title: title,
          content: content,
          catId: catId,
          jobId: jobId,
          isPublic: 0
        });

    var url = 'https://api.enclavei3dev.tk/api/article';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
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
              urlArticle: '/dashboard/article/' + data.article.id
            });
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
      <div className="profile-card" style={{ marginBottom: '300px' }}>
        {/*--------Modal-Success-----*/}
        <Modal
          isOpen={this.state.modalSuccess}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModalSuccess}>
            Notification
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
          <ModalHeader toggle={this.toggleModalError}>Notification</ModalHeader>
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

        <Card className="card-body">
          <CardTitle className="title">
            <MdCancel className="first" />
            Create A New Article
            <Link to="/dashboard/article">
              <MdCancel />
            </Link>
          </CardTitle>

          <CardBody>
            <Row>
              <Col>
                <Row>
                  <div style={{ width: '100%' }}>
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
                          />
                        </div>
                      </FormGroup>
                      {/* {this.state.content && ( */}
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
                            width: '350px'
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
                          this.state.selectedFormatOption &&
                          this.state.selectedCategoryOption ? (
                            <Button
                              color="success"
                              onClick={this.handlePublish}
                            >
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
                          this.state.selectedFormatOption &&
                          this.state.selectedCategoryOption ? (
                            <Button onClick={this.handleSave} color="warning">
                              Save
                            </Button>
                          ) : (
                            <Button
                              onClick={this.handleErrorMessage.bind(this)}
                              color="warning"
                            >
                              Save
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
      </div>
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
