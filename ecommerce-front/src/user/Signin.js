import React, {useState} from "react";
import { Redirect} from "react-router-dom";
import Layout from "../core/Layout";
import { signIn } from "../auth";
import { Form, Button, Alert } from "react-bootstrap"


const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false
  })

  const { email, password, error, loading, redirectToReferrer } = values;

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({...values, error: false, [name]: value });
  }

  const clickSubmit = event => {
    event.preventDefault();
    setValues({...values, error: false, loading: true});
    signIn({ email, password})
    .then(data => {
      if(data.error) {
        setValues({...values, error: data.error, loading:false})
      } else {
        setValues({
          ...values,
          redirectToReferrer: true
        })
      }
    })
  }

  const signUpForm = () => {
    return (
      <Form>

        <Form.Group controlId="email">
          <Form.Label className="text-muted">Email address</Form.Label>
          <Form.Control 
            type="email" 
            name="email"
            placeholder="Enter email" 
            onChange={handleChange}
            value={email} />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label className="text-muted">Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password"
            placeholder="Enter password" 
            onChange={handleChange}
            value={password} />
        </Form.Group>

        <Button onClick={clickSubmit}> Sign In </Button>
      </Form>
    )
  }

  const showError = () => {
    return (
      <Alert variant="danger" style={{ display: error ? "" : "none" }}>
        {error}
      </Alert>
    )
  }

  const showLoading = () => (
    loading && (
      <Alert variant="info">
        <h2>Loading...</h2>
      </Alert>
    )
  );

  const redirectUser = () => {
    if(redirectToReferrer) {
      return <Redirect to="/" />
    }
  }
  
  

  return (
    <Layout
      title="Sign In Page"
      description="Sign in to Node React Ecommerce App"
      className="container col-md-8 offset-md-2"
    >
       {showError()}
       {showLoading()}

       {signUpForm()}
       {redirectUser()}
    </Layout>
  )
}

export default Signin;