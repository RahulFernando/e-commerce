import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import Layout from "../../components/layouts";
import Input from "../../components/ui";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from '../../actions/register'

const Signup = (props) => {
  // states
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector(state => state.auth);
  const register = useSelector(state => state.register);

  const dispatch = useDispatch();

  // signup function
  const userSignup = e => {
    e.preventDefault();

    const user = { firstName, lastName, email, password }

    dispatch(signup(user));
  }

  // redirect user to home if logged
  if (auth.authenticate) {
    return <Redirect to={`/`} />
  }

  return (
    <Layout>
      <Container>
        {register.loading ? <div style={{ paddingTop: '5rem' }}><center><Spinner animation="border" variant="success"/></center></div> : ''}
        {register.message ? <Alert variant="success">{register.message}</Alert>: ''}
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={ userSignup }>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    placeholder="Enter fisrt name"
                    value={firstName}
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    placeholder="Enter last name"
                    value={lastName}
                    type="text"
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </Col>
              </Row>

              <Input
                label="Email"
                placeholder="Enter email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Password"
                placeholder="Enter password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signup;
