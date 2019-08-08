import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  Container,
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
import { MdSettings, MdMap, MdBook, MdCancel } from 'react-icons/md';
import classnames from 'classnames';
import { PulseLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import './JobDetail.css';
import moment from 'moment';
export default class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      title: '',
      content: '',
      status: '',
      jobId: '',
      jobName: '',
      catId: '',
      catName: '',
      userId: '',
      userName: '',
      created_at: '',
      updated_at: '',
      editTitle: '',
      editContent: '',
      editStatus: '',
      errorTitle: '',
      errorData: '',
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
      showJobError: false,
      loading: true,
      image: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
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
    const { id } = this.props.match.params;
    var { optionsJob, optionsCategory, optionsFormat, isDisabled } = this.state;
    var status = '';
    var jobName = '';
    var url = 'https://api.enclavei3dev.tk/api/article/' + id;

    var url2 = 'https://api.enclavei3dev.tk/api/list-job';
    var url3 = 'https://api.enclavei3dev.tk/api/category?page=1';
    var url4 = 'https://api.enclavei3dev.tk/api/format-article';
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    const data1 = await fetch(url, {
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
    const data3 = await fetch(url3, {
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
    const data4 = await fetch(url4, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    data2.map(e => {
      var job = { id: e.id, value: e.name, label: e.name };
      optionsJob.push(job);
      return optionsJob;
    });
    data3.data.map(e => {
      var category = { id: e.id, value: e.name, label: e.name };
      optionsCategory.push(category);
      return optionsCategory;
    });
    data4.map(e => {
      var format = {
        id: e.id,
        value: e.title,
        label: e.title,
        content: e.content
      };
      optionsFormat.push(format);
      return optionsFormat;
    });
    if (data1.message !== 'Unauthenticated.') {
      data1.isPublic === 1
        ? (status = 'Published')
        : (status = 'Not published');
      data1.job ? (jobName = data.job.name) : (jobName = '');
      data1.category.name == 'Others'
        ? (isDisabled = true)
        : (isDisabled = false);
      if (data.job) {
        setTimeout(() => {
          this.setState({
            title: data1.title,
            content: data1.content,
            status: status,
            jobId: data1.jobId,
            jobName: jobName,
            catId: data1.catId,
            catName: data1.category.name,
            userId: data1.userId,
            userName: data1.user.fullname,
            created_at: data1.created_at,
            updated_at: data1.updated_at,
            loading: false,
            editTitle: data1.title,
            editContent: data1.content,
            editStatus: data1.isPublic,
            optionsJob: optionsJob,
            optionsCategory: optionsCategory,
            optionsFormat: optionsFormat,
            isDisabled: isDisabled,
            selectedJobOption: {
              id: data1.job.id,
              value: data1.job.name,
              label: data1.job.name
            },
            selectedCategoryOption: {
              id: data1.category.id,
              value: data1.category.name,
              label: data1.category.name
            }
          });
        }, 500);
      } else {
        setTimeout(() => {
          this.setState({
            title: data1.title,
            content: data1.content,
            status: status,
            jobId: null,
            jobName: null,
            catId: data1.catId,
            catName: data1.category.name,
            userId: data1.userId,
            userName: data1.user.fullname,
            created_at: data1.created_at,
            updated_at: data1.updated_at,
            loading: false,
            editTitle: data1.title,
            editContent: data1.content,
            editStatus: data1.isPublic,
            optionsJob: optionsJob,
            optionsCategory: optionsCategory,
            optionsFormat: optionsFormat,
            isDisabled: isDisabled,
            // selectedJobOption: {
            //   id: data.job.id,
            //   value: data.job.name,
            //   label: data.job.name
            // },
            selectedCategoryOption: {
              id: data1.category.id,
              value: data1.category.name,
              label: data1.category.name
            }
          });
        }, 500);
      }
    }
  }
  handleErrorMessage = () => {
    this.setState({
      showErrorMessage: true
    });
  };

  handleChangeStatus = () => {
    let { editStatus } = this.state;
    let status = 0;
    if (editStatus === 0) {
      status = 1;
      this.setState({
        editStatus: 1
      });
    } else {
      status = 0;
      this.setState({
        editStatus: 0
      });
    }
    const { id } = this.props.match.params;
    const {
      editTitle,
      editContent,
      selectedCategoryOption,
      selectedJobOption
    } = this.state;
    var body = '';
    var jobId = 0;
    var catId = 0;
    var statusString = '';
    if (selectedCategoryOption) catId = selectedCategoryOption.id;
    if (selectedJobOption) jobId = selectedJobOption.id;
    var body = '';
    jobId === 0
      ? (body = {
          title: editTitle,
          content: editContent,
          catId: catId,
          isPublic: status
        })
      : (body = {
          title: editTitle,
          content: editContent,
          catId: catId,
          jobId: jobId,
          isPublic: status
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
          this.toggleModalSuccess();
          res.json().then(data => {
            status === 1
              ? (statusString = 'Publised')
              : (statusString = 'Not publised');
            if (selectedJobOption) {
              this.setState({
                title: editTitle,
                content: editContent,
                selectedJobOption: selectedJobOption,
                selectedCategoryOption: selectedCategoryOption,
                jobName: selectedJobOption.value,
                jobId: selectedJobOption.id,
                catName: selectedCategoryOption.value,
                status: statusString
              });
            } else {
              this.setState({
                title: editTitle,
                content: editContent,
                selectedJobOption: selectedJobOption,
                selectedCategoryOption: selectedCategoryOption,
                jobName: null,
                jobId: null,
                catName: selectedCategoryOption.value,
                status: statusString
              });
            }
          });
        }
      })
      .catch(error => console.error('Error:', error));
  };

  handleEditorChange(html) {
    this.setState({ editContent: html });
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
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  backToPreviousPage = () => {
    this.props.history.push('/dashboard/article');
  };

  handleChange(event) {
    var { errorTitle } = this.state;
    if (event.target.name == 'editTitle') {
      event.target.value !== ''
        ? (errorTitle = '')
        : (errorTitle = 'Title is required');
    }
    this.setState({
      [event.target.name]: event.target.value,
      errorTitle: errorTitle
    });
  }

  handleSubmit = () => {
    const { id } = this.props.match.params;
    const {
      editTitle,
      editContent,
      selectedCategoryOption,
      selectedJobOption,
      editStatus
    } = this.state;
    var body = '';
    var jobId = 0;
    var catId = 0;
    var status = '';
    if (selectedCategoryOption) catId = selectedCategoryOption.id;
    if (selectedJobOption) jobId = selectedJobOption.id;
    var body = '';
    jobId === 0
      ? (body = {
          title: editTitle,
          content: editContent,
          catId: catId,
          isPublic: editStatus
        })
      : (body = {
          title: editTitle,
          content: editContent,
          catId: catId,
          jobId: jobId,
          isPublic: editStatus
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
          this.toggleModalSuccess();
          res.json().then(data => {
            editStatus === 1
              ? (status = 'Publised')
              : (status = 'Not publised');
            if (selectedJobOption) {
              this.setState({
                title: editTitle,
                content: editContent,
                selectedJobOption: selectedJobOption,
                selectedCategoryOption: selectedCategoryOption,
                jobName: selectedJobOption.value,
                jobId: selectedJobOption.id,
                catName: selectedCategoryOption.value,
                status: status
              });
            } else {
              this.setState({
                title: editTitle,
                content: editContent,
                selectedJobOption: selectedJobOption,
                selectedCategoryOption: selectedCategoryOption,
                jobName: null,
                jobId: null,
                catName: selectedCategoryOption.value,
                status: status
              });
            }
          });
        }
      })
      .catch(error => console.error('Error:', error));
  };

  render() {
    var i = 0;
    const { jobId, userId, showJobError, selectedJobOption } = this.state;
    var url1 = '/dashboard/job/' + jobId;
    var url2 = '/dashboard/user/' + userId;
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
          <ModalHeader
            toggle={this.toggleModalSuccess}
            className="card-header-custom"
          >
            <span className="dashboard-modal-header">Notification</span>
          </ModalHeader>
          <ModalBody>
            <span style={{ color: '#45b649' }}>Update successfully</span>
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
          <ModalBody>{renderHTML(this.state.editContent)}</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalPreview}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/*--------Modal-Preview-----*/}
        <CardHeader className="card-header-custom">
          Article's information
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
            <PulseLoader
              sizeUnit={'px'}
              size={15}
              color={'#45b649'}
              loading={this.state.loading}
            />
          </div>
        ) : (
          <CardBody>
            <Container>
              <Row style={{ justifyContent: 'center' }}>
                <div className="table-test" style={{ width: '100%' }}>
                  <table style={{ width: '100%' }}>
                    <tbody style={{ width: '100%' }}>
                      <tr className="job-title3" key={1}>
                        <td className="job-title">Title</td>
                        <td className="job-title1">{this.state.title}</td>
                      </tr>

                      <tr className="job-title3" key={2}>
                        <td className="job-title">Status</td>
                        <td className="job-title1">{this.state.status}</td>
                      </tr>

                      <tr className="job-title3" key={3}>
                        <td className="job-title">Category</td>
                        <td className="job-title1">{this.state.catName}</td>
                      </tr>
                      {this.state.jobName !== '' && (
                        <tr className="job-title3" key={4}>
                          <td className="job-title">Job</td>
                          <td className="job-title1">
                            <Link to={url1}>{this.state.jobName}</Link>
                          </td>
                        </tr>
                      )}
                      <tr className="job-title3" key={5}>
                        <td className="job-title">Created By</td>
                        <td className="job-title1">
                          <Link to={url2}>{this.state.userName}</Link>
                        </td>
                      </tr>
                      <tr className="job-title3" key={6}>
                        <td className="job-title">Created At</td>
                        <td className="job-title1">
                          {moment(this.state.created_at).format(
                            'MMMM Do YYYY, h:mm:ss a'
                          )}
                        </td>
                      </tr>
                      <tr className="job-title3" key={7}>
                        <td className="job-title">Updated At</td>
                        <td className="job-title1">
                          {moment(this.state.updated_at).format(
                            'MMMM Do YYYY, h:mm:ss a'
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Row>
              <br />
              <br />
              <Row>
                <div className="job-tabs">
                  <Nav tabs>
                    <NavItem style={{ width: '150px' }}>
                      <NavLink
                        className={classnames({
                          jobtabactive: this.state.activeTab === '1'
                        })}
                        onClick={() => {
                          this.toggle('1');
                        }}
                      >
                        <MdBook style={{ marginRight: '5px' }} />
                        Content
                      </NavLink>
                    </NavItem>
                    <NavItem style={{ width: '150px' }}>
                      <NavLink
                        className={classnames({
                          jobtabactive: this.state.activeTab === '2'
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
                </div>
              </Row>

              <br />
              <br />
              <Row>
                <TabContent
                  style={{ width: '100%' }}
                  activeTab={this.state.activeTab}
                >
                  <TabPane tabId="1">
                    <Row>
                      <Col>{renderHTML(this.state.content)}</Col>
                      {/* <Col>{this.state.content}</Col> */}
                    </Row>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '20px'
                      }}
                    >
                      <Button
                        onClick={() => this.backToPreviousPage()}
                        color="secondary"
                      >
                        Back
                      </Button>
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col>
                        <Form>
                          <FormGroup>
                            <Label className="title-input" for="Name">
                              Title
                            </Label>
                            <Input
                              className="title-add-new-article"
                              type="text"
                              name="editTitle"
                              value={this.state.editTitle}
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
                              onChange={this.handleSelectCategoryChange.bind(
                                this
                              )}
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
                                onChange={this.handleSelectFormatChange.bind(
                                  this
                                )}
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
                                value={this.state.editContent}
                                modules={ArticleDetail.modules}
                                formats={ArticleDetail.formats}
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
                              <Button
                                onClick={this.toggleModalPreview}
                                color="primary"
                              >
                                Preview
                              </Button>
                              {this.state.errorTitle == '' &&
                              check &&
                              this.state.selectedCategoryOption ? (
                                <Button
                                  color="success"
                                  onClick={this.handleSubmit}
                                >
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
                              {this.state.editStatus === 1 ? (
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
                                      onClick={this.handleErrorMessage.bind(
                                        this
                                      )}
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
                                      onClick={this.handleErrorMessage.bind(
                                        this
                                      )}
                                      color="warning"
                                    >
                                      Publish
                                    </Button>
                                  )}
                                </div>
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
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </Row>
            </Container>
          </CardBody>
        )}
      </Card>
    );
  }
}
ArticleDetail.modules = {
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

ArticleDetail.formats = [
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
