import React, { useState } from 'react';
import { Container, Row, Form, Col, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import AuthenticationService from '../../services/authentication.service';
import { history } from '../../App';
import CookieService from '../../services/cookie.service';

const Register = (props) => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const displayNameRef = React.createRef();

  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onRegister = async () => {
    const info = {
      email: emailRef.current.value,
      username: displayNameRef.current.value,
      password: passwordRef.current.value
    }

    setIsRegistering(true);
    const response = await AuthenticationService.register(info);
    if(response) {
      setIsRegistering(false);
      setErrorMessage(response);
    }
    else {
      history.push('/login');
    }
  }

  if(CookieService.getInfo()) {
    return <Redirect to="/chat"/>;
  }

  return (
    <Container>
      <Row>
        <Col md={4} lg={4}/>
        <Col md={4} lg={4}>
          <div className="text-center">
            <h1 className="my-5"><strong><span className="far fa-comments"/> Chat App <span className="far fa-comments"/></strong></h1>
            <h2 className="my-5">Register</h2>
          </div>
          <Form autoComplete="off">
          <Form.Group>
            <Form.Label><strong>Email</strong></Form.Label>
            <Form.Control 
              type="email"
              name="email"
              ref={emailRef}
              placeholder="example@gmail.com"
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label><strong>Display name</strong></Form.Label>
            <Form.Control 
              type="text"
              name="displayName"
              ref={displayNameRef}
              autoComplete="off"
              placeholder="your display name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label><strong>Password</strong></Form.Label>
            <Form.Control 
              type="password"
              name="password"
              ref={passwordRef}
              autoComplete="off"
            />
          </Form.Group>
          </Form>
          {
            errorMessage &&
            <div className="w-100 text-danger">
              { errorMessage }
            </div>
          }
          <Button className="w-100 my-3" onClick={onRegister} disabled={isRegistering}>
            {
              isRegistering ? <span className="fas fa-spin fa-spinner"/> : "Register"
            }
          </Button>
          <div className="text-center">
            <em>Already has account? <Link to="/login" className="text-primary">Login</Link></em>
          </div>
        </Col>
        <Col md={4} lg={4}/>
      </Row>
    </Container>
  );
}

export default Register;