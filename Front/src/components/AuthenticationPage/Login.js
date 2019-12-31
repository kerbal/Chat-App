import React, { useState } from 'react';
import { Container, Row, Form, Col, Button, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import AuthenticationService from '../../services/authentication.service';
import { history } from '../../App';
import CookieService from '../../services/cookie.service';

const Login = (props) => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const [isLogingin, setIsLogingin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onRegister = async () => {
    const info = {
      loginName: emailRef.current.value,
      password: passwordRef.current.value
    }

    setIsLogingin(true);
    const response = await AuthenticationService.login(info);
    if(response) {
      setIsLogingin(false);
      setErrorMessage(response);
    }
    else {
      history.push('/chat');
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
            <h1 className="my-5"><strong>Chat App</strong></h1>
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
          <Button className="w-100 my-3" onClick={onRegister} disabled={isLogingin}>
            {
              isLogingin ? <span className="fas fa-spin fa-spinner"/> : "Login"
            }
          </Button>
          <div className="text-center">
            <em>Need an account? <Link to="/">Register</Link></em>
          </div>
        </Col>
        <Col md={4} lg={4}/>
      </Row>
    </Container>
  );
}

export default Login;