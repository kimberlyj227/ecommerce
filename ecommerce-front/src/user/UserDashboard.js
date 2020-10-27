import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Card, ListGroup, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom"

const Dashboard = () => {
  const {user: {_id, name, email, role}} = isAuthenticated();

  const userLinks = () => {
    return (
      <Card className="mb-5">
        <Card.Header><h4>User Links</h4></Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>
              <Link to="/cart">My Cart</Link>
            </ListGroup.Item>

            <ListGroup.Item>
              <Link to="/profile/update">Update Profile</Link>
            </ListGroup.Item>
            
          </ListGroup>
        </Card.Body>
      </Card>
    )
  }

  const userInfo = () => {
    return (
      <Card className="mb-5">
        <Card.Header><h4>User Information</h4></Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item><strong>Name:</strong> {name}</ListGroup.Item>
            <ListGroup.Item><strong>Email:</strong>  {email}</ListGroup.Item>
            <ListGroup.Item><strong>Role:</strong>  {role === 1 ? "Admin" : "Registered User"}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    )
  };

  const userHistory = () => {
    return (
      <Card className="mb-5">
        <Card.Header><h4>Purchase History</h4></Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>Item</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    )
  }

  return (
    <Layout
      title="Dashboard"
      description={`G'day {name}!`}
      className="container-fluid"
    >
      <Row>
        <Col md={3}>
          {userLinks()}
        </Col>
        <Col md={9}>
          {userInfo()}
          {userHistory()}
        </Col>
      </Row>

      

    </Layout>
  )
}

export default Dashboard;