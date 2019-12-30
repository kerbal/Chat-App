import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

const Header = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={3} lg={3} className>
          <h1><strong>Chat App</strong></h1>
        </Col>
      </Row>
    </Container>    
  )
}

export default Header;