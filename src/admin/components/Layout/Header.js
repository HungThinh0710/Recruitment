import Avatar from '../../components/Avatar';
import { UserCard } from '../../components/Card';
import Notifications from '../../components/Notifications';
import { notificationsData } from '../../demos/header';
import withBadge from '../../hocs/withBadge';
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
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

const MdNotificationsActiveWithBadge = withBadge({
  size: 'md',
  color: 'primary',
  style: {
    top: -10,
    right: -10,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  children: <small>5</small>
})(MdNotificationsActive);

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenNotificationPopover: false,
      isNotificationConfirmed: false,
      isOpenUserCardPopover: false,
      redirect: false,
      name: '',
      email: '',
      image: ''
    };
  }
  async componentWillMount() {
    //const {firstName, lastName, email} = this.state;
    var url = 'https://api.enclavei3dev.tk/api/current-profile';
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
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover
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

    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <button
            className="menu-button"
            onClick={this.handleSidebarControlButton}
          >
            <MdMenu size={50} />
          </button>
        </Nav>
        <Nav navbar className={bem.e('nav-right')}>
          <NavItem className="d-inline-flex">
            <NavLink id="Popover1" className="position-relative">
              {isNotificationConfirmed ? (
                <MdNotificationsNone
                  size={25}
                  className="text-secondary can-click"
                  onClick={this.toggleNotificationPopover}
                />
              ) : (
                <MdNotificationsActiveWithBadge
                  size={25}
                  className="text-secondary can-click animated swing infinite"
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
                <Notifications notificationsData={notificationsData} />
              </PopoverBody>
            </Popover>
          </NavItem>

          <NavItem>
            <NavLink id="Popover2">
              <Avatar
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
