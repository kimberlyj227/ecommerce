import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Card, ListGroup, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom"

const Profile = () => {
  const {user: {_id, name, email, role}} = isAuthenticated();

  

  return (
    <Layout
      title="User Profile"
      description={`G'day ${name}!`}
      className="container-fluid"
    >
      <Row>
        <Col md={3}>
          
        </Col>
        <Col md={9}>
          
        </Col>
      </Row>

      

    </Layout>
  )
}

export default Profile;