import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import PropTypes from 'prop-types';
import CollapsePermission from '../components/CollapsePermission';
import $ from 'jquery';
export default class ModalAddArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: '',
      content: '',
      jobId: 0,
      catId: '',
      jobData: [],
      catData: [],
      activePageJob: 1,
      currentPageJob: 1,
      activePageCat: 1,
      currentPageCat: 1,
      totalItemsJob: '',
      totalItemsCat: ''
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageJobChange = this.handlePageJobChange.bind(this);
    this.handlePageCatChange = this.handlePageCatChange.bind(this);
  }

  async componentWillMount() {
    let { jobId, catId } = this.state;
    var url1 = 'https://api.enclavei3dev.tk/api/list-job?page=1';
    var url2 = 'https://api.enclavei3dev.tk/api/category?page=1';
    const data1 = await fetch(url1, {
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
    data1.data.map(e => {
      return (e.action = (
        <input
          id={e.id}
          type="radio"
          name="checkboxJob"
          onChange={() => this.handleJobCheck(e)}
        />
      ));
    });
    data2.data.map(e => {
      return (e.action = (
        <input
          id={e.id}
          type="radio"
          name="checkboxCat"
          onChange={() => this.handleCatCheck(e)}
        />
      ));
    });

    this.setState({
      jobData: data1.data,
      catData: data2.data,
      jobId: jobId,
      catId: catId,
      totalItemsJob: data1.total,
      totalItemsCat: data2.total,
      currentPageJob: data1.current_page,
      currentPageCat: data2.current_page
    });
  }

  handleEditorChange(html) {
    this.setState({ content: html });
  }

  handleJobCheck(e) {
    var { jobId } = this.state;
    if (jobId === 0) {
      jobId += e.id;
    } else {
      jobId = 0;
      jobId += e.id;
    }

    this.setState({
      jobId: jobId
    });
  }

  handleCatCheck(e) {
    var { catId } = this.state;
    if (catId === 0) {
      catId += e.id;
    } else {
      catId = 0;
      catId += e.id;
    }

    this.setState({
      catId: catId
    });
  }

  wrapperFunction = () => {
    this.handleSubmit();
    this.toggle();
  };

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleSubmit = () => {
    const { title, jobId, content, catId } = this.state;
    var url = 'https://api.enclavei3dev.tk/api/article';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        content: content,
        jobId: jobId,
        catId: catId
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
          res.json().then(data => {
            var url2 =
              'https://api.enclavei3dev.tk/api/list-article?page=' +
              this.props.page;
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
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handlePageJobChange(pageNumber) {
    this.setState({ activePageJob: pageNumber, currentPageJob: pageNumber });
    var { jobId } = this.state;
    var url = 'https://api.enclavei3dev.tk/api/list-job?page=' + pageNumber;
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
          jobId = e.id;
        }
        this.setState({
          jobData: data.data,
          jobId: jobId,
          totalItemsJob: data.total,
          currentPageCat: data.current_page
        });
      });
    });
  }

  handlePageCatChange(pageNumber) {
    this.setState({ activePageCat: pageNumber, currentPageCat: pageNumber });
    var { catId } = this.state;
    var url = 'https://api.enclavei3dev.tk/api/category?page=' + pageNumber;
    fetch(url, {
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
    }).then(res => {
      res.json().then(data => {
        data.data.map(e => {
          return (e.action = (
            <input type="checkbox" onChange={() => handleCheck(e)} />
          ));
        });
        function handleCheck(e) {
          catId = e.id;
        }
        this.setState({
          catData: data.data,
          catId: catId,
          totalItemsCat: data.total,
          currentPageCat: data.current_page
        });
      });
    });
  }

  render() {
    return (
      <div>
        <Button color={this.props.color} onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>
        <Modal
          size="lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Create A New Article</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="Name">Title</Label>
                <Input type="text" name="title" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="Content">Content</Label>
                <ReactQuill
                  onChange={this.handleEditorChange}
                  value={this.state.content}
                  modules={ModalAddArticle.modules}
                  formats={ModalAddArticle.formats}
                  bounds={'.app'}
                  placeholder={this.props.placeholder}
                />
              </FormGroup>
              <FormGroup>
                <CollapsePermission
                  name="Jobs"
                  data={this.state.jobData}
                  activePage={this.state.activePageJob}
                  itemsCountPerPage={10}
                  totalItemsCount={this.state.totalItemsJob}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageJobChange}
                />
              </FormGroup>
              <FormGroup>
                <CollapsePermission
                  name="Categories"
                  data={this.state.catData}
                  activePage={this.state.activePageCat}
                  itemsCountPerPage={10}
                  totalItemsCount={this.state.totalItemsCat}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageCatChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.wrapperFunction}>
              Submit
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
ModalAddArticle.modules = {
  toolbar: [
    [{ header: [] }, { font: [] }],
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

ModalAddArticle.formats = [
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

ModalAddArticle.propTypes = {
  placeholder: PropTypes.string
};
