import React from 'react';
import PropTypes from '../utils/propTypes';
import { Link } from 'react-router-dom';

import { Media } from 'reactstrap';
import Avatar from '../components/Avatar';

function maskAsRead(idNotification) {
  fetch('https://api.enclavei3dev.tk/api/notifications/' + idNotification, {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  });
}

const Notifications = ({ notificationsData }) => {
  var url = '/dashboard/candidate/';
  if (notificationsData.length == 0) {
    return (
      <Media key={'null'} className="pb-2">
        <Media left className="align-self-center pr-3">
          {/* <Avatar tag={Media} object src={avatar} alt="Avatar" /> */}
        </Media>
        <Media body middle className="align-self-center">
          Don't have notification.
          {/* <Link style={{ textDecoration: 'none', color: 'black' }} onClick={() => maskAsRead(id)} to={url + candidateId} >{message}</Link> */}
        </Media>
        <Media right className="align-self-center">
          {/* <small className="text-muted">{date}</small> */}
        </Media>
      </Media>
    );
  } else {
    return (
      notificationsData &&
      notificationsData.length &&
      notificationsData.map(({ id, avatar, message, date, candidateId }) => (
        <Media key={id} className="pb-2">
          <Media left className="align-self-center pr-3">
            <Avatar tag={Media} object src={avatar} alt="Avatar" />
          </Media>
          <Media body middle className="align-self-center">
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              onClick={() => maskAsRead(id)}
              to={url + candidateId}
            >
              {message}
            </Link>
          </Media>
          <Media right className="align-self-center">
            <small className="text-muted">{date}</small>
          </Media>
        </Media>
      ))
    );
  }
};

Notifications.propTypes = {
  notificationsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.id,
      avatar: PropTypes.string,
      message: PropTypes.node,
      date: PropTypes.date,
      candidateId: PropTypes.candidateId
    })
  )
};

Notifications.defaultProps = {
  notificationsData: []
};

export default Notifications;
