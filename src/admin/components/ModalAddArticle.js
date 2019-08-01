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
export default class ModalAddArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: '',
      content: `<h5><span style="color: rgb(106, 130, 251);"> <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aCA9JzI1cHgnIGNvbG9yPSAncmdiKDEwNiwgMTMwLCAyNTEpJyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJib29rLW9wZW4iIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1ib29rLW9wZW4gZmEtdy0xOCIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik01NDIuMjIgMzIuMDVjLTU0LjggMy4xMS0xNjMuNzIgMTQuNDMtMjMwLjk2IDU1LjU5LTQuNjQgMi44NC03LjI3IDcuODktNy4yNyAxMy4xN3YzNjMuODdjMCAxMS41NSAxMi42MyAxOC44NSAyMy4yOCAxMy40OSA2OS4xOC0zNC44MiAxNjkuMjMtNDQuMzIgMjE4LjctNDYuOTIgMTYuODktLjg5IDMwLjAyLTE0LjQzIDMwLjAyLTMwLjY2VjYyLjc1Yy4wMS0xNy43MS0xNS4zNS0zMS43NC0zMy43Ny0zMC43ek0yNjQuNzMgODcuNjRDMTk3LjUgNDYuNDggODguNTggMzUuMTcgMzMuNzggMzIuMDUgMTUuMzYgMzEuMDEgMCA0NS4wNCAwIDYyLjc1VjQwMC42YzAgMTYuMjQgMTMuMTMgMjkuNzggMzAuMDIgMzAuNjYgNDkuNDkgMi42IDE0OS41OSAxMi4xMSAyMTguNzcgNDYuOTUgMTAuNjIgNS4zNSAyMy4yMS0xLjk0IDIzLjIxLTEzLjQ2VjEwMC42M2MwLTUuMjktMi42Mi0xMC4xNC03LjI3LTEyLjk5eiI+PC9wYXRoPjwvc3ZnPg=="> Job Description</span></h5><p><br></p><h5><br></h5><h5><span style="color: rgb(106, 130, 251);"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aCA9JzI1cHgnIGNvbG9yPSAncmdiKDEwNiwgMTMwLCAyNTEpJyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJyb2NrZXQiIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1yb2NrZXQgZmEtdy0xNiIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik01MDUuMDUgMTkuMWExNS44OSAxNS44OSAwIDAgMC0xMi4yLTEyLjJDNDYwLjY1IDAgNDM1LjQ2IDAgNDEwLjM2IDBjLTEwMy4yIDAtMTY1LjEgNTUuMi0yMTEuMjkgMTI4SDk0Ljg3QTQ4IDQ4IDAgMCAwIDUyIDE1NC40OWwtNDkuNDIgOTguOEEyNCAyNCAwIDAgMCAyNC4wNyAyODhoMTAzLjc3bC0yMi40NyAyMi40N2EzMiAzMiAwIDAgMCAwIDQ1LjI1bDUwLjkgNTAuOTFhMzIgMzIgMCAwIDAgNDUuMjYgMEwyMjQgMzg0LjE2VjQ4OGEyNCAyNCAwIDAgMCAzNC43IDIxLjQ5bDk4LjctNDkuMzlhNDcuOTEgNDcuOTEgMCAwIDAgMjYuNS00Mi45VjMxMi43OWM3Mi41OS00Ni4zIDEyOC0xMDguNCAxMjgtMjExLjA5LjEtMjUuMi4xLTUwLjQtNi44NS04Mi42ek0zODQgMTY4YTQwIDQwIDAgMSAxIDQwLTQwIDQwIDQwIDAgMCAxLTQwIDQweiI+PC9wYXRoPjwvc3ZnPg=="> Responsibilities</span></h5><p><br></p><p><br></p><h5><span style="color: rgb(106, 130, 251);"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aCA9JzIycHgnIGNvbG9yPSAncmdiKDEwNiwgMTMwLCAyNTEpJyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJib29rIiBjbGFzcz0ic3ZnLWlubGluZS0tZmEgZmEtYm9vayBmYS13LTE0IiByb2xlPSJpbWciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDQ0OCA1MTIiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTQ0OCAzNjBWMjRjMC0xMy4zLTEwLjctMjQtMjQtMjRIOTZDNDMgMCAwIDQzIDAgOTZ2MzIwYzAgNTMgNDMgOTYgOTYgOTZoMzI4YzEzLjMgMCAyNC0xMC43IDI0LTI0di0xNmMwLTcuNS0zLjUtMTQuMy04LjktMTguNy00LjItMTUuNC00LjItNTkuMyAwLTc0LjcgNS40LTQuMyA4LjktMTEuMSA4LjktMTguNnpNMTI4IDEzNGMwLTMuMyAyLjctNiA2LTZoMjEyYzMuMyAwIDYgMi43IDYgNnYyMGMwIDMuMy0yLjcgNi02IDZIMTM0Yy0zLjMgMC02LTIuNy02LTZ2LTIwem0wIDY0YzAtMy4zIDIuNy02IDYtNmgyMTJjMy4zIDAgNiAyLjcgNiA2djIwYzAgMy4zLTIuNyA2LTYgNkgxMzRjLTMuMyAwLTYtMi43LTYtNnYtMjB6bTI1My40IDI1MEg5NmMtMTcuNyAwLTMyLTE0LjMtMzItMzIgMC0xNy42IDE0LjQtMzIgMzItMzJoMjg1LjRjLTEuOSAxNy4xLTEuOSA0Ni45IDAgNjR6Ij48L3BhdGg+PC9zdmc+"> Qualification</span></h5><p><br></p><p><span style="color: rgb(106, 130, 251);"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aCA9JzE1cHgnIGNvbG9yPSAncmdiKDEwNiwgMTMwLCAyNTEpJyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJzZWFyY2giIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1zZWFyY2ggZmEtdy0xNiIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik01MDUgNDQyLjdMNDA1LjMgMzQzYy00LjUtNC41LTEwLjYtNy0xNy03SDM3MmMyNy42LTM1LjMgNDQtNzkuNyA0NC0xMjhDNDE2IDkzLjEgMzIyLjkgMCAyMDggMFMwIDkzLjEgMCAyMDhzOTMuMSAyMDggMjA4IDIwOGM0OC4zIDAgOTIuNy0xNi40IDEyOC00NHYxNi4zYzAgNi40IDIuNSAxMi41IDcgMTdsOTkuNyA5OS43YzkuNCA5LjQgMjQuNiA5LjQgMzMuOSAwbDI4LjMtMjguM2M5LjQtOS40IDkuNC0yNC42LjEtMzR6TTIwOCAzMzZjLTcwLjcgMC0xMjgtNTcuMi0xMjgtMTI4IDAtNzAuNyA1Ny4yLTEyOCAxMjgtMTI4IDcwLjcgMCAxMjggNTcuMiAxMjggMTI4IDAgNzAuNy01Ny4yIDEyOC0xMjggMTI4eiI+PC9wYXRoPjwvc3ZnPg=="> Minimum Qualification</span></p><p><br></p><p><br></p><p><span style="color: rgb(106, 130, 251);"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aCA9JzE1cHgnIGNvbG9yPSAncmdiKDEwNiwgMTMwLCAyNTEpJyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhYiIgZGF0YS1pY29uPSJidWZmZXIiIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1idWZmZXIgZmEtdy0xNCIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik00MjcuODQgMzgwLjY3bC0xOTYuNSA5Ny44MmExOC42IDE4LjYgMCAwIDEtMTQuNjcgMEwyMC4xNiAzODAuNjdjLTQtMi00LTUuMjggMC03LjI5TDY3LjIyIDM1MGExOC42NSAxOC42NSAwIDAgMSAxNC42OSAwbDEzNC43NiA2N2ExOC41MSAxOC41MSAwIDAgMCAxNC42NyAwbDEzNC43Ni02N2ExOC42MiAxOC42MiAwIDAgMSAxNC42OCAwbDQ3LjA2IDIzLjQzYzQuMDUgMS45NiA0LjA1IDUuMjQgMCA3LjI0em0wLTEzNi41M2wtNDcuMDYtMjMuNDNhMTguNjIgMTguNjIgMCAwIDAtMTQuNjggMGwtMTM0Ljc2IDY3LjA4YTE4LjY4IDE4LjY4IDAgMCAxLTE0LjY3IDBMODEuOTEgMjIwLjcxYTE4LjY1IDE4LjY1IDAgMCAwLTE0LjY5IDBsLTQ3LjA2IDIzLjQzYy00IDItNCA1LjI5IDAgNy4zMWwxOTYuNTEgOTcuOGExOC42IDE4LjYgMCAwIDAgMTQuNjcgMGwxOTYuNS05Ny44YzQuMDUtMi4wMiA0LjA1LTUuMyAwLTcuMzF6TTIwLjE2IDEzMC40MmwxOTYuNSA5MC4yOWEyMC4wOCAyMC4wOCAwIDAgMCAxNC42NyAwbDE5Ni41MS05MC4yOWM0LTEuODYgNC00Ljg5IDAtNi43NEwyMzEuMzMgMzMuNGExOS44OCAxOS44OCAwIDAgMC0xNC42NyAwbC0xOTYuNSA5MC4yOGMtNC4wNSAxLjg1LTQuMDUgNC44OCAwIDYuNzR6Ij48L3BhdGg+PC9zdmc+"> Preferred Qualification</span></p><p><br></p><p><br></p><h5><span style="color: rgb(106, 130, 251);"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aCA9JzE1cHgnIGNvbG9yPSAncmdiKDEwNiwgMTMwLCAyNTEpJyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhYiIgZGF0YS1pY29uPSJncmlwZmlyZSIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWdyaXBmaXJlIGZhLXctMTIiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzg0IDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTEyLjUgMzAxLjRjMC03My44IDEwNS4xLTEyMi41IDEwNS4xLTIwMyAwLTQ3LjEtMzQtODgtMzkuMS05MC40LjQgMy4zLjYgNi43LjYgMTBDMTc5LjEgMTEwLjEgMzIgMTcxLjkgMzIgMjg2LjZjMCA0OS44IDMyLjIgNzkuMiA2Ni41IDEwOC4zIDY1LjEgNDYuNyA3OC4xIDcxLjQgNzguMSA4Ni42IDAgMTAuMS00LjggMTctNC44IDIyLjMgMTMuMS0xNi43IDE3LjQtMzEuOSAxNy41LTQ2LjQgMC0yOS42LTIxLjctNTYuMy00NC4yLTg2LjUtMTYtMjIuMy0zMi42LTQyLjYtMzIuNi02OS41em0yMDUuMy0zOWMtMTIuMS02Ni44LTc4LTEyNC40LTk0LjctMTMwLjlsNCA3LjJjMi40IDUuMSAzLjQgMTAuOSAzLjQgMTcuMSAwIDQ0LjctNTQuMiAxMTEuMi01Ni42IDExNi43LTIuMiA1LjEtMy4yIDEwLjUtMy4yIDE1LjggMCAyMC4xIDE1LjIgNDIuMSAxNy45IDQyLjEgMi40IDAgNTYuNi01NS40IDU4LjEtODcuNyA2LjQgMTEuNyA5LjEgMjIuNiA5LjEgMzMuNCAwIDQxLjItNDEuOCA5Ni45LTQxLjggOTYuOSAwIDExLjYgMzEuOSA1My4yIDM1LjUgNTMuMiAxIDAgMi4yLTEuNCAzLjItMi40IDM3LjktMzkuMyA2Ny4zLTg1IDY3LjMtMTM2LjggMC04LS43LTE2LjItMi4yLTI0LjZ6Ij48L3BhdGg+PC9zdmc+"> Bonus skills</span></h5><p><br></p><p><br></p><h5><span style="color: rgb(106, 130, 251);"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aCA9JzIycHgnIGNvbG9yPSAncmdiKDEwNiwgMTMwLCAyNTEpJyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJib29rbWFyayIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWJvb2ttYXJrIGZhLXctMTIiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzg0IDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMCA1MTJWNDhDMCAyMS40OSAyMS40OSAwIDQ4IDBoMjg4YzI2LjUxIDAgNDggMjEuNDkgNDggNDh2NDY0TDE5MiA0MDAgMCA1MTJ6Ij48L3BhdGg+PC9zdmc+"> Other Benefits</span></h5><p><br></p><p><br></p><p><br></p>`,
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

  async componentDidMount() {
    let { jobId, catId } = this.state;
    var url1 = 'https://api.enclavei3dev.tk/api/list-job?page=1';
    var url2 = 'https://api.enclavei3dev.tk/api/category?page=1';
    const data1 = await fetch(url1, {
      method: 'POST',
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
      modal: !prevState.modal,
      content: `<h5><span style="color: rgb(106, 130, 251);"> <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aCA9JzI1cHgnIGNvbG9yPSAncmdiKDEwNiwgMTMwLCAyNTEpJyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJib29rLW9wZW4iIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1ib29rLW9wZW4gZmEtdy0xOCIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik01NDIuMjIgMzIuMDVjLTU0LjggMy4xMS0xNjMuNzIgMTQuNDMtMjMwLjk2IDU1LjU5LTQuNjQgMi44NC03LjI3IDcuODktNy4yNyAxMy4xN3YzNjMuODdjMCAxMS41NSAxMi42MyAxOC44NSAyMy4yOCAxMy40OSA2OS4xOC0zNC44MiAxNjkuMjMtNDQuMzIgMjE4LjctNDYuOTIgMTYuODktLjg5IDMwLjAyLTE0LjQzIDMwLjAyLTMwLjY2VjYyLjc1Yy4wMS0xNy43MS0xNS4zNS0zMS43NC0zMy43Ny0zMC43ek0yNjQuNzMgODcuNjRDMTk3LjUgNDYuNDggODguNTggMzUuMTcgMzMuNzggMzIuMDUgMTUuMzYgMzEuMDEgMCA0NS4wNCAwIDYyLjc1VjQwMC42YzAgMTYuMjQgMTMuMTMgMjkuNzggMzAuMDIgMzAuNjYgNDkuNDkgMi42IDE0OS41OSAxMi4xMSAyMTguNzcgNDYuOTUgMTAuNjIgNS4zNSAyMy4yMS0xLjk0IDIzLjIxLTEzLjQ2VjEwMC42M2MwLTUuMjktMi42Mi0xMC4xNC03LjI3LTEyLjk5eiI+PC9wYXRoPjwvc3ZnPg=="> Job Description</span></h5><p><br></p><h5><br></h5><h5><span style="color: rgb(106, 130, 251);"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aCA9JzI1cHgnIGNvbG9yPSAncmdiKDEwNiwgMTMwLCAyNTEpJyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJyb2NrZXQiIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1yb2NrZXQgZmEtdy0xNiIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik01MDUuMDUgMTkuMWExNS44OSAxNS44OSAwIDAgMC0xMi4yLTEyLjJDNDYwLjY1IDAgNDM1LjQ2IDAgNDEwLjM2IDBjLTEwMy4yIDAtMTY1LjEgNTUuMi0yMTEuMjkgMTI4SDk0Ljg3QTQ4IDQ4IDAgMCAwIDUyIDE1NC40OWwtNDkuNDIgOTguOEEyNCAyNCAwIDAgMCAyNC4wNyAyODhoMTAzLjc3bC0yMi40NyAyMi40N2EzMiAzMiAwIDAgMCAwIDQ1LjI1bDUwLjkgNTAuOTFhMzIgMzIgMCAwIDAgNDUuMjYgMEwyMjQgMzg0LjE2VjQ4OGEyNCAyNCAwIDAgMCAzNC43IDIxLjQ5bDk4LjctNDkuMzlhNDcuOTEgNDcuOTEgMCAwIDAgMjYuNS00Mi45VjMxMi43OWM3Mi41OS00Ni4zIDEyOC0xMDguNCAxMjgtMjExLjA5LjEtMjUuMi4xLTUwLjQtNi44NS04Mi42ek0zODQgMTY4YTQwIDQwIDAgMSAxIDQwLTQwIDQwIDQwIDAgMCAxLTQwIDQweiI+PC9wYXRoPjwvc3ZnPg=="> Responsibilities</span></h5><p><br></p><p><br></p><h5><span style="color: rgb(106, 130, 251);"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aCA9JzIycHgnIGNvbG9yPSAncmdiKDEwNiwgMTMwLCAyNTEpJyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJib29rIiBjbGFzcz0ic3ZnLWlubGluZS0tZmEgZmEtYm9vayBmYS13LTE0IiByb2xlPSJpbWciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDQ0OCA1MTIiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTQ0OCAzNjBWMjRjMC0xMy4zLTEwLjctMjQtMjQtMjRIOTZDNDMgMCAwIDQzIDAgOTZ2MzIwYzAgNTMgNDMgOTYgOTYgOTZoMzI4YzEzLjMgMCAyNC0xMC43IDI0LTI0di0xNmMwLTcuNS0zLjUtMTQuMy04LjktMTguNy00LjItMTUuNC00LjItNTkuMyAwLTc0LjcgNS40LTQuMyA4LjktMTEuMSA4LjktMTguNnpNMTI4IDEzNGMwLTMuMyAyLjctNiA2LTZoMjEyYzMuMyAwIDYgMi43IDYgNnYyMGMwIDMuMy0yLjcgNi02IDZIMTM0Yy0zLjMgMC02LTIuNy02LTZ2LTIwem0wIDY0YzAtMy4zIDIuNy02IDYtNmgyMTJjMy4zIDAgNiAyLjcgNiA2djIwYzAgMy4zLTIuNyA2LTYgNkgxMzRjLTMuMyAwLTYtMi43LTYtNnYtMjB6bTI1My40IDI1MEg5NmMtMTcuNyAwLTMyLTE0LjMtMzItMzIgMC0xNy42IDE0LjQtMzIgMzItMzJoMjg1LjRjLTEuOSAxNy4xLTEuOSA0Ni45IDAgNjR6Ij48L3BhdGg+PC9zdmc+"> Qualification</span></h5><p><br></p><p><span style="color: rgb(106, 130, 251);"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aCA9JzE1cHgnIGNvbG9yPSAncmdiKDEwNiwgMTMwLCAyNTEpJyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJzZWFyY2giIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1zZWFyY2ggZmEtdy0xNiIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik01MDUgNDQyLjdMNDA1LjMgMzQzYy00LjUtNC41LTEwLjYtNy0xNy03SDM3MmMyNy42LTM1LjMgNDQtNzkuNyA0NC0xMjhDNDE2IDkzLjEgMzIyLjkgMCAyMDggMFMwIDkzLjEgMCAyMDhzOTMuMSAyMDggMjA4IDIwOGM0OC4zIDAgOTIuNy0xNi40IDEyOC00NHYxNi4zYzAgNi40IDIuNSAxMi41IDcgMTdsOTkuNyA5OS43YzkuNCA5LjQgMjQuNiA5LjQgMzMuOSAwbDI4LjMtMjguM2M5LjQtOS40IDkuNC0yNC42LjEtMzR6TTIwOCAzMzZjLTcwLjcgMC0xMjgtNTcuMi0xMjgtMTI4IDAtNzAuNyA1Ny4yLTEyOCAxMjgtMTI4IDcwLjcgMCAxMjggNTcuMiAxMjggMTI4IDAgNzAuNy01Ny4yIDEyOC0xMjggMTI4eiI+PC9wYXRoPjwvc3ZnPg=="> Minimum Qualification</span></p><p><br></p><p><br></p><p><span style="color: rgb(106, 130, 251);"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aCA9JzE1cHgnIGNvbG9yPSAncmdiKDEwNiwgMTMwLCAyNTEpJyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhYiIgZGF0YS1pY29uPSJidWZmZXIiIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1idWZmZXIgZmEtdy0xNCIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik00MjcuODQgMzgwLjY3bC0xOTYuNSA5Ny44MmExOC42IDE4LjYgMCAwIDEtMTQuNjcgMEwyMC4xNiAzODAuNjdjLTQtMi00LTUuMjggMC03LjI5TDY3LjIyIDM1MGExOC42NSAxOC42NSAwIDAgMSAxNC42OSAwbDEzNC43NiA2N2ExOC41MSAxOC41MSAwIDAgMCAxNC42NyAwbDEzNC43Ni02N2ExOC42MiAxOC42MiAwIDAgMSAxNC42OCAwbDQ3LjA2IDIzLjQzYzQuMDUgMS45NiA0LjA1IDUuMjQgMCA3LjI0em0wLTEzNi41M2wtNDcuMDYtMjMuNDNhMTguNjIgMTguNjIgMCAwIDAtMTQuNjggMGwtMTM0Ljc2IDY3LjA4YTE4LjY4IDE4LjY4IDAgMCAxLTE0LjY3IDBMODEuOTEgMjIwLjcxYTE4LjY1IDE4LjY1IDAgMCAwLTE0LjY5IDBsLTQ3LjA2IDIzLjQzYy00IDItNCA1LjI5IDAgNy4zMWwxOTYuNTEgOTcuOGExOC42IDE4LjYgMCAwIDAgMTQuNjcgMGwxOTYuNS05Ny44YzQuMDUtMi4wMiA0LjA1LTUuMyAwLTcuMzF6TTIwLjE2IDEzMC40MmwxOTYuNSA5MC4yOWEyMC4wOCAyMC4wOCAwIDAgMCAxNC42NyAwbDE5Ni41MS05MC4yOWM0LTEuODYgNC00Ljg5IDAtNi43NEwyMzEuMzMgMzMuNGExOS44OCAxOS44OCAwIDAgMC0xNC42NyAwbC0xOTYuNSA5MC4yOGMtNC4wNSAxLjg1LTQuMDUgNC44OCAwIDYuNzR6Ij48L3BhdGg+PC9zdmc+"> Preferred Qualification</span></p><p><br></p><p><br></p><h5><span style="color: rgb(106, 130, 251);"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aCA9JzE1cHgnIGNvbG9yPSAncmdiKDEwNiwgMTMwLCAyNTEpJyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhYiIgZGF0YS1pY29uPSJncmlwZmlyZSIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWdyaXBmaXJlIGZhLXctMTIiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzg0IDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTEyLjUgMzAxLjRjMC03My44IDEwNS4xLTEyMi41IDEwNS4xLTIwMyAwLTQ3LjEtMzQtODgtMzkuMS05MC40LjQgMy4zLjYgNi43LjYgMTBDMTc5LjEgMTEwLjEgMzIgMTcxLjkgMzIgMjg2LjZjMCA0OS44IDMyLjIgNzkuMiA2Ni41IDEwOC4zIDY1LjEgNDYuNyA3OC4xIDcxLjQgNzguMSA4Ni42IDAgMTAuMS00LjggMTctNC44IDIyLjMgMTMuMS0xNi43IDE3LjQtMzEuOSAxNy41LTQ2LjQgMC0yOS42LTIxLjctNTYuMy00NC4yLTg2LjUtMTYtMjIuMy0zMi42LTQyLjYtMzIuNi02OS41em0yMDUuMy0zOWMtMTIuMS02Ni44LTc4LTEyNC40LTk0LjctMTMwLjlsNCA3LjJjMi40IDUuMSAzLjQgMTAuOSAzLjQgMTcuMSAwIDQ0LjctNTQuMiAxMTEuMi01Ni42IDExNi43LTIuMiA1LjEtMy4yIDEwLjUtMy4yIDE1LjggMCAyMC4xIDE1LjIgNDIuMSAxNy45IDQyLjEgMi40IDAgNTYuNi01NS40IDU4LjEtODcuNyA2LjQgMTEuNyA5LjEgMjIuNiA5LjEgMzMuNCAwIDQxLjItNDEuOCA5Ni45LTQxLjggOTYuOSAwIDExLjYgMzEuOSA1My4yIDM1LjUgNTMuMiAxIDAgMi4yLTEuNCAzLjItMi40IDM3LjktMzkuMyA2Ny4zLTg1IDY3LjMtMTM2LjggMC04LS43LTE2LjItMi4yLTI0LjZ6Ij48L3BhdGg+PC9zdmc+"> Bonus skills</span></h5><p><br></p><p><br></p><h5><span style="color: rgb(106, 130, 251);"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aCA9JzIycHgnIGNvbG9yPSAncmdiKDEwNiwgMTMwLCAyNTEpJyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJib29rbWFyayIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWJvb2ttYXJrIGZhLXctMTIiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzg0IDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMCA1MTJWNDhDMCAyMS40OSAyMS40OSAwIDQ4IDBoMjg4YzI2LjUxIDAgNDggMjEuNDkgNDggNDh2NDY0TDE5MiA0MDAgMCA1MTJ6Ij48L3BhdGg+PC9zdmc+"> Other Benefits</span></h5><p><br></p><p><br></p><p><br></p>`
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
      method: 'POST',
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
    console.log(this.state.content);
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
