import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Card, ListGroup } from "react-bootstrap";

const Dashboard = () => {
  const {user: {_id, name, email, role}} = isAuthenticated();

  return (
    <Layout
      title="Dashboard"
      description="User Dashboard"
      className="container"
    >
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

      <Card className="mb-5">
        <Card.Header><h4>Purchase History</h4></Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>Item</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

    </Layout>
  )
}

export default Dashboard;