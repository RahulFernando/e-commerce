import React from "react";
import { Col, Container, Jumbotron, Row } from "react-bootstrap";

import Layout from "../../components/layouts";
import './style.css';

const Home = (props) => {
  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col md={2} className="sidebar">Side Bar</Col>
          <Col md={10} style={{ marginLeft:'auto' }}>content</Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Home;
