import React from 'react';
import CookieService from '../../services/cookie.service';
import { Row, Col } from 'react-bootstrap';

const SingleMessage = (props) => {
  const { message } = props;

  const userid = CookieService.getInfo('id');

  return (
    userid === message.UserId ?
      <Row>
        <Col md={4}/>
        <Col md={8}>
          <div className="message my-message">
            {message.Content}
          </div>
        </Col>
      </Row>
      :
      <Row>
        <Col md={8}>
          <div className="message your-message">
          {message.Content}
          </div>
        </Col>
        <Col md={4}/>
      </Row>
  )
}

export default SingleMessage;