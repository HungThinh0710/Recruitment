import { Media } from 'reactstrap';

import Avatar from '../Avatar';
import { UserCard } from '../../components/Card';
import Notifications from '../../components/Notifications';
// import { notificationsData } from '../../demos/header';
import withBadge from '../../hocs/withBadge';
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Pusher from 'pusher-js';
import axios from 'axios';
import NotificationCard from '../../components/NotificationCard';
import Moment from 'moment';
import {
  MdMenu,
  MdExitToApp,
  MdNotificationsActive,
  MdNotificationsNone,
  MdPersonPin
} from 'react-icons/md';
import {
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody
} from 'reactstrap';
import bn from '../../utils/bemnames';
import './Header.css';
const bem = bn.create('header');

var test = 100;

var MdNotificationsActiveWithBadge = withBadge({
  size: 'md',
  color: 'danger',
  style: {
    top: -10,
    right: -10,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  // children: <small>{test}</small>
})(MdNotificationsActive);

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenNotificationPopover: false,
      isNotificationConfirmed: false,
      isOpenUserCardPopover: false,
      redirect: false,
      idUser: '',
      name: '',
      email: '',
      image: '',
      arrNotification: [],
      ringTheBell: false,
      countNotifications: 0
    };
  }

  async componentDidMount() {
    const { firstName, lastName, email, arrNotification } = this.state;
    var url = 'https://api.enclavei3.tk/api/current-profile';
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    // console.log(data.id);
    this.setState({
      idUser: data.id,
      name: data.name,
      email: data.email,
      image: data.image
    });

    fetch('https://api.enclavei3.tk/api/notifications', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      res.json().then(dataResponse => {
        // console.log(dataResponse);
        // this.setState({arrNotification});
        // headerClass.setState({ arrNotification: dataResponse });
        // console.log(dataResponse);
        this.setState({
          arrNotification: dataResponse,
          countNotifications: dataResponse.length
        });
      });
    });
    // console.log(this.state.arrNotification);

    //Notification initial
    // var pusher = new Pusher('app_key');
    // pusher.connection.bind( 'error', function( err ) {
    //   if( err.error.data.code === 4004 ) {
    //     log('>>> detected limit error');
    //   }
    // });

    // Pusher.logToConsole = true;

    var pusher = new Pusher('47e53ceb02a16b8a22a7', {
      cluster: 'ap1',
      forceTLS: true,
      auth: {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      }
    });

    const { idUser } = this.state;

    var channel = pusher.subscribe('user-notifications-id-' + idUser);
    var event = 'send-new-candidates';

    // console.log("Channel: " + channel);

    // console.log(this.state.arrNotification);
    const abc = this;
    channel.bind(event, function(data) {
      // console.log("Data ne: " + data);
      //fetch new notifications.
      fetch('https://api.enclavei3.tk/api/notifications', {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      }).then(res => {
        res.json().then(dataResponse => {
          // console.log(dataResponse);
          // this.setState({arrNotification});
          test = dataResponse.length;
          abc.setState({
            arrNotification: dataResponse,
            ringTheBell: true,
            countNotifications: dataResponse.length
          });
        });
      });
    });

    console.log(this.state.arrNotification);
    channel.bind('pusher:subscription_succeeded', function(members) {});
  }

  async componentDidUpdate() {
    //const {firstName, lastName, email} = this.state;
    var url = 'https://api.enclavei3.tk/api/current-profile';
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    this.setState({
      name: data.name,
      email: data.email,
      image: data.image
    });
  }

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
      ringTheBell: false
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('token_type');
      localStorage.removeItem('expires_at');
      return <Redirect to="/dashboard/login" />;
    }
  };

  render() {
    const { isNotificationConfirmed } = this.state;
    var i = 0;
    var data = [];
    if (this.state.arrNotification.length !== 0) {
      this.state.arrNotification.map((arr, index) => {
        // console.log(arr);
        var item = {
          id: arr.id,
          candidateId: arr.data.candidate_id,
          message: arr.data.candidate_name + ' sent an application.',
          date: Moment(arr.updated_at, 'YYYYMMDD h:mm').fromNow()
        };
        if (index < 10) data.push(item);
        if ((index = 0)) {
          var itemNull = {
            id: null,
            candidateId: null,
            message: "Don't have notification.",
            date: null
          };
          data.push(itemNull);
        }
        return data;
      });
    }
    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <button
            className="menu-button"
            onClick={this.handleSidebarControlButton}
          >
            <MdMenu size={40} />
          </button>
        </Nav>
        <Nav navbar className={bem.e('nav-right')}>
          {/* Notifications */}
          <NavItem className="d-inline-flex">
            <NavLink id="Popover1" className="position-relative">
              {this.state.countNotifications == 0 ? (
                <MdNotificationsNone
                  size={25}
                  className="text-secondary can-click"
                  onClick={this.toggleNotificationPopover}
                />
              ) : (
                <MdNotificationsActiveWithBadge
                  data={
                    this.state.countNotifications > 10
                      ? '10+'
                      : this.state.countNotifications
                  }
                  size={25}
                  className="text-secondary can-click animated swing infinite badge-react-count-notify"
                  onClick={this.toggleNotificationPopover}
                />
              )}
            </NavLink>
            <Popover
              placement="bottom"
              isOpen={this.state.isOpenNotificationPopover}
              toggle={this.toggleNotificationPopover}
              target="Popover1"
            >
              <PopoverBody>
                {/* <Notifications className="notifications-custom-react" notificationsData={this.state.arrNotification} /> */}
                {/* <  className="notifications-custom-react" /> */}

                {/* <div className="text-right"><Link className="a-mask-as-read-header" to="#">Mask all as read</Link></div> */}
                <Notifications notificationsData={data} />
                <div className="text-center">
                  <Link to="candidate">
                    <button className="btn btn-more-header w-100">More</button>
                  </Link>
                </div>
              </PopoverBody>
            </Popover>
          </NavItem>

          <NavItem>
            <NavLink id="Popover2">
              <Avatar
                src={
                  'https://api.enclavei3.tk/upload/images/avatars/' +
                  `${this.state.image}`
                }
                onClick={this.toggleUserCardPopover}
                className="can-click"
              />
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 border-light">
                <UserCard
                  title={this.state.name}
                  subtitle={this.state.email}
                  avatar={
                    'https://api.enclavei3.tk/upload/images/avatars/' +
                    `${this.state.image}`
                  }
                  // text="Last updated 3 mins ago"
                  className="border-light"
                >
                  <ListGroup flush>
                    <Link to="/dashboard/profile">
                      <ListGroupItem
                        tag="button"
                        action
                        className="border-light"
                      >
                        <MdPersonPin /> My Profile
                      </ListGroupItem>
                    </Link>
                    {this.renderRedirect()}
                    <ListGroupItem
                      tag="button"
                      action
                      className="border-light"
                      onClick={this.setRedirect}
                    >
                      <MdExitToApp /> Logout
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
