import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Form,
  Label,
  Input
} from 'reactstrap';
import { MdEdit } from 'react-icons/md';
import Select from 'react-select';
import renderHTML from 'react-render-html';
import ReactQuill from 'react-quill';

export default class ModalEditArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      status: '',
      errorTitle: '',
      errorData: '',
      modal: false,
      modalError: false,
      modalSuccess: false,
      modalPreview: false,
      showErrorMessage: false,
      selectedJobOption: null,
      selectedCategoryOption: null,
      selectedFormatOption: null,
      optionsJob: [],
      optionsCategory: [],
      optionsFormat: [],
      isDisabled: false,
      showJobError: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
    this.toggleModalPreview = this.toggleModalPreview.bind(this);
  }

  async componentDidMount() {
    const { id, dataJob, dataCategory, dataFormat } = this.props;
    var { optionsJob, optionsFormat, optionsCategory, isDisabled } = this.state;
    var status = '';
    var jobName = '';
    var url = 'https://api.enclavei3dev.tk/api/article/' + id;
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());

    dataJob.map(e => {
      var job = { id: e.id, value: e.name, label: e.name };
      optionsJob.push(job);
      return optionsJob;
    });
    dataCategory.data.map(e => {
      var category = { id: e.id, value: e.name, label: e.name };
      optionsCategory.push(category);
      return optionsCategory;
    });
    dataFormat.map(e => {
      var format = {
        id: e.id,
        value: e.title,
        label: e.title,
        content: e.content
      };
      optionsFormat.push(format);
      return optionsFormat;
    });
    if (data.message !== 'Unauthenticated.') {
      data.isPublic === 1 ? (status = 'Published') : (status = 'Not published');
      data.job ? (jobName = data.job.name) : (jobName = '');
      data.category.name == 'Others'
        ? (isDisabled = true)
        : (isDisabled = false);
      if (data.job) {
        setTimeout(() => {
          this.setState({
            title: data.title,
            content: data.content,
            status: status,
            loading: false,
            optionsJob: optionsJob,
            optionsCategory: optionsCategory,
            optionsFormat: optionsFormat,
            isDisabled: isDisabled,
            selectedJobOption: {
              id: data.job.id,
              value: data.job.name,
              label: data.job.name
            },
            selectedCategoryOption: {
              id: data.category.id,
              value: data.category.name,
              label: data.category.name
            }
          });
        }, 500);
      } else {
        setTimeout(() => {
          this.setState({
            title: data.title,
            content: data.content,
            loading: false,
            optionsJob: optionsJob,
            optionsCategory: optionsCategory,
            optionsFormat: optionsFormat,
            isDisabled: isDisabled,
            selectedCategoryOption: {
              id: data.category.id,
              value: data.category.name,
              label: data.category.name
            }
          });
        }, 500);
      }
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  toggleModalPreview() {
    this.setState(prevState => ({
      modalPreview: !prevState.modalPreview
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

  handleEditorChange(html) {
    this.setState({ content: html });
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
      editContent: selectedFormatOption.content
    });
  };
  handleChange(event) {
    var { errorTitle } = this.state;
    if (event.target.name == 'title') {
      event.target.value !== ''
        ? (errorTitle = '')
        : (errorTitle = 'Title is required');
    }
    this.setState({
      [event.target.name]: event.target.value,
      errorTitle: errorTitle
    });
  }
  handleSubmit() {
    const { id } = this.props;
    const {
      title,
      content,
      selectedCategoryOption,
      selectedJobOption,
      status
    } = this.state;
    var idStatus = 0;
    status == 'Published' ? (idStatus = 1) : (idStatus = 0);
    var body = '';
    var jobId = 0;
    var catId = 0;
    if (selectedCategoryOption) catId = selectedCategoryOption.id;
    if (selectedJobOption) jobId = selectedJobOption.id;
    var body = '';
    jobId === 0
      ? (body = {
          title: title,
          content: content,
          catId: catId,
          isPublic: idStatus
        })
      : (body = {
          title: title,
          content: content,
          catId: catId,
          jobId: jobId,
          isPublic: idStatus
        });
    var url = 'https://api.enclavei3dev.tk/api/article/' + id;
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
          alert('Update Failed');
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
  handleChangeStatus = () => {
    const { id } = this.props;
    const {
      title,
      content,
      selectedCategoryOption,
      selectedJobOption,
      status
    } = this.state;
    var idStatus = 0;
    status == 'Published' ? (idStatus = 0) : (idStatus = 1);
    var body = '';
    var jobId = 0;
    var catId = 0;
    if (selectedCategoryOption) catId = selectedCategoryOption.id;
    if (selectedJobOption) jobId = selectedJobOption.id;
    var body = '';
    jobId === 0
      ? (body = {
          title: title,
          content: content,
          catId: catId,
          isPublic: idStatus
        })
      : (body = {
          title: title,
          content: content,
          catId: catId,
          jobId: jobId,
          isPublic: idStatus
        });
    var url = 'https://api.enclavei3dev.tk/api/article/' + id;
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
          alert('Update Failed');
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
          if (status == 'Published') {
            this.setState({
              status: 'Not published'
            });
          } else {
            this.setState({
              status: 'Published'
            });
          }
        }
      })
      .catch(error => console.error('Error:', error));
  };
  handleErrorMessage = () => {
    this.setState({
      showErrorMessage: true
    });
  };

  render() {
    var i = 0;
    const { showJobError, selectedJobOption } = this.state;
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
            <span className="dashboard-modal-header">Update Article</span>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label className="title-input" for="Name">
                  Title
                </Label>
                <Input
                  className="title-add-new-article"
                  type="text"
                  name="title"
                  value={this.state.title}
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
                    <span style={{ color: 'red' }}>Category is required</span>
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
                      <span style={{ color: 'red' }}>Job is required</span>
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
              {this.state.content && (
                <FormGroup>
                  <Label className="title-input" for="Content">
                    Content
                  </Label>
                  <ReactQuill
                    onChange={this.handleEditorChange}
                    value={this.state.content}
                    modules={ModalEditArticle.modules}
                    formats={ModalEditArticle.formats}
                    bounds={'.app'}
                    placeholder={this.props.placeholder}
                  />
                </FormGroup>
              )}
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
                  <Button onClick={this.toggleModalPreview} color="primary">
                    Preview
                  </Button>
                  {this.state.errorTitle == '' &&
                  check &&
                  this.state.selectedCategoryOption ? (
                    <Button color="success" onClick={this.handleSubmit}>
                      Update
                    </Button>
                  ) : (
                    <Button
                      color="success"
                      onClick={this.handleErrorMessage.bind(this)}
                    >
                      Update
                    </Button>
                  )}
                  {this.state.status == 'Published' ? (
                    <div>
                      {this.state.errorTitle == '' &&
                      check &&
                      this.state.selectedCategoryOption ? (
                        <Button
                          onClick={this.handleChangeStatus}
                          color="warning"
                        >
                          Close
                        </Button>
                      ) : (
                        <Button
                          onClick={this.handleErrorMessage.bind(this)}
                          color="warning"
                        >
                          Close
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div>
                      {this.state.errorTitle == '' &&
                      check &&
                      this.state.selectedCategoryOption ? (
                        <Button
                          onClick={this.handleChangeStatus}
                          color="warning"
                        >
                          Publish
                        </Button>
                      ) : (
                        <Button
                          onClick={this.handleErrorMessage.bind(this)}
                          color="warning"
                        >
                          Publish
                        </Button>
                      )}
                    </div>
                  )}

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
ModalEditArticle.modules = {
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

ModalEditArticle.formats = [
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
