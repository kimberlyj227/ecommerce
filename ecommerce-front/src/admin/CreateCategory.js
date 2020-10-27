import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Card, ListGroup, Col, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localStorage
  const { user, token } = isAuthenticated();

  const handleChange = e => {
    setError("");
    setName(e.target.value)
  }

  const clickSubmit = e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // make request to API to create category
  }

  const newCategoryForm = () => (
    <Form onSubmit={clickSubmit}>

        <Form.Group controlId="name">
          <Form.Label className="text-muted">Category Name</Form.Label>
          <Form.Control 
            type="text" 
            name="name" 
            placeholder="Category name" 
            onChange={handleChange}
            value={name}
            autoFocus
           />
        </Form.Group>
        <Button >
          Create Category
        </Button>
    </Form>
  )

  return (
    <Layout
      title="Create Category"
      description="Add a new category"
      className="container"
    >
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          {newCategoryForm()}
        </Col>
      </Row>

    </Layout>
  )
}

export default CreateCategory;