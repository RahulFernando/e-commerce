import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Layout from "../../components/layouts";
import Input from "../../components/ui";
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions'
import { Redirect } from 'react-router-dom'

const Signin = (props) => {
  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();



  // login function
  const userLogin = e => {
    e.preventDefault();

    const user = { email, password }

    dispatch(login(user));
  }

  // redirect user to home if logged
  if (auth.authenticate) {
    return <Redirect to={`/`} />
  }

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={ userLogin }>
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
                onChange={(e) => setPassword(e.target.value )}
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

export default Signin;
