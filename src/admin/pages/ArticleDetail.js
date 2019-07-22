import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardImg,
  Button,
  CardText,
  Row,
  Col,
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { MdSettings, MdMap, MdBook } from 'react-icons/md';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import './JobDetail.css';
export default class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedRole: false,
      activeRole: false,
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
      editname: '',
      editdescription: '',
      editaddress: '',
      editposition: '',
      editsalary: '',
      editstatus: '',
      editexperience: '',
      editamount: '',
      editpublishedOn: '',
      editdeadline: '',
      roles: [],
      editRoles: [],
      editRolesName: [],
      rows: [],
      listId: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  async componentWillMount() {
    const { id } = this.props.match.params;
    var status = '';
    var url = 'https://api.enclavei3dev.tk/api/article/' + id;
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    console.log(data);
    data.isPublic === 1 ? (status = 'Public') : (status = 'Not public');
    // const i = data.publishedOn.indexOf(' ');
    // const j = data.deadline.indexOf(' ');
    // const newDateString = (s, i) => {
    //   return s.substr(0, i) + 'T' + s.substr(i + 1);
    // };
    this.setState({
      title: data.title,
      content: data.content,
      status: status,
      jobId: data.jobId,
      jobName: data.job.name,
      catId: data.catId,
      catName: data.category.name,
      userId: data.userId,
      userName: data.user.fullname,
      created_at: data.created_at,
      updated_at: data.updated_at
      // editname: data.name,
      // editdescription: data.description,
      // editaddress: data.address,
      // editposition: data.position,
      // editsalary: data.salary,
      // editstatus: data.status,
      // editexperience: data.experience,
      // editamount: data.amount,
      // editpublishedOn: newDateString(data.publishedOn, i),
      // editdeadline: newDateString(data.deadline, j)
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
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = () => {
    const { id } = this.props.match.params;
    const {
      editname,
      editdescription,
      editaddress,
      editposition,
      editsalary,
      editstatus,
      editexperience,
      editamount,
      editpublishedOn,
      editdeadline
    } = this.state;
    const i = editpublishedOn.indexOf('T');
    const j = editdeadline.indexOf('T');
    const newDateString = (s, i) => {
      return s.substr(0, i) + ' ' + s.substr(i + 1);
    };
    var url = 'https://api.enclavei3dev.tk/api/job/' + id;
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        name: editname,
        description: editdescription,
        address: editaddress,
        position: editposition,
        salary: editsalary,
        status: editstatus,
        experience: editexperience,
        amount: editamount,
        publishedOn: newDateString(editpublishedOn, i),
        deadline: newDateString(editdeadline, j)
      }),
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
          alert('Update Failed');
        }
        if (res.status === 200) {
          res.json().then(data => {
            alert('Update Success');
            this.setState({
              name: editname,
              description: editdescription,
              address: editaddress,
              position: editposition,
              salary: editsalary,
              status: editstatus,
              experience: editexperience,
              amount: editamount,
              publishedOn: newDateString(editpublishedOn, i),
              deadline: newDateString(editdeadline, j)
            });
          });
        }
      })
      .catch(error => console.error('Error:', error));
  };

  render() {
    const { jobId, userId } = this.state;
    var url1 = '/admin/job/' + jobId;
    var url2 = '/admin/user/' + userId;
    return (
      <div className="profile-card">
        <Card className="card-body">
          <CardTitle className="title">Article Information</CardTitle>
          <CardBody>
            <Container>
              <Row style={{ justifyContent: 'center' }}>
                <div className="table-test" style={{ width: '100%' }}>
                  <table>
                    <tbody>
                      <tr key={1}>
                        <td className="job-title">Title</td>
                        <td>{this.state.title}</td>
                      </tr>
                      <tr key={2}>
                        <td className="job-title">Content</td>
                        <td>{this.state.content}</td>
                      </tr>
                      <tr key={3}>
                        <td className="job-title">Status</td>
                        <td>{this.state.status}</td>
                      </tr>
                      <tr key={4}>
                        <td className="job-title">Job</td>
                        <td>
                          <Link to={url1}>{this.state.jobName}</Link>
                        </td>
                      </tr>
                      <tr key={5}>
                        <td className="job-title">Category</td>
                        <td>{this.state.catName}</td>
                      </tr>
                      <tr key={6}>
                        <td className="job-title">Created By</td>
                        <td>
                          <Link to={url2}>{this.state.userName}</Link>
                        </td>
                      </tr>
                      <tr key={7}>
                        <td className="job-title">Created At</td>
                        <td>{this.state.created_at}</td>
                      </tr>
                      <tr key={8}>
                        <td className="job-title">Updated At</td>
                        <td>{this.state.updated_at}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Row>
            </Container>
          </CardBody>
        </Card>
      </div>
    );
  }
}
