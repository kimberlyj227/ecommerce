import React, {useState} from "react";
import Layout from "../core/Layout";
import { API } from "../config";
import { Form, Button } from "react-bootstrap"


const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  })

  const { name, email, password, error, success } = values;

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({...values, error: false, [name]: value })
  }


  const signUpForm = () => {
    return (
      <Form>

        <Form.Group controlId="name">
          <Form.Label className="text-muted">Name</Form.Label>
          <Form.Control 
            type="text" 
            name="name" 
            placeholder="Enter full name" 
            onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label className="text-muted">Email address</Form.Label>
          <Form.Control 
            type="email" 
            name="email"
            placeholder="Enter email" 
            onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label className="text-muted">Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password"
            placeholder="Enter password" 
            onChange={handleChange} />
          <Form.Text className="text-muted">
        Password must be 6 characters or longer and contain a digit.
          </Form.Text>
        </Form.Group>

        <Button> Submit </Button>
      </Form>
    )
  }


  return (
    <Layout
      title="Sign Up Page"
      description="Sign up to Node React Ecommerce App"
      className="container col-md-8 offset-md-2"
    >
     {signUpForm()}
     
    </Layout>
  )
}

export default Signup;