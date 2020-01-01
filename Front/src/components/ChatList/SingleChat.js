import React from 'react';
import { NavLink } from 'react-router-dom';
import CookieService from '../../services/cookie.service';
import { Row, Col, Image } from 'react-bootstrap';

const SingleChat = (props) => {
  const userId = CookieService.getInfo('id');
  const { conversation } = props;
  
  return (
    <NavLink to={`/chat/${conversation.id}`}>
      <div className="p-3 single-chat-item">
        <Row>
          <Col sm={2}><Image fluid src="user-icon.png"/></Col>
          <Col sm={10}>
            <strong>
              {
                conversation.User1.id === userId ? conversation.User2.Username : conversation.User1.Username
              }
            </strong>
            <p className="m-0">
              {
                conversation.LastMessage.Content
              }
            </p>
          </Col>
        </Row>
      </div>
    </NavLink>
  );
}

export default SingleChat;