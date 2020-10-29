import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Card, ListGroup, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";

const Profile = ({match}) => {
  const { token } = isAuthenticated();
  
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { name, email, password } = userInfo;

  useEffect(() => {
    init(match.params.userId);
  });

  const init = (userId) => {
    read(userId, token).then(data => {
      if (data.error) {
        setError(true)
      } else {
        setUserInfo({...userInfo,
          name: data.name,
          email: data.email
        })
      }
    });
  }
  

  return (
    <Layout
      title="User Profile"
      description={`Hello ${name}! Update your Profile`}
      className="container-fluid"
    >
      <h2>Profile Update</h2>

      

    </Layout>
  )
}

export default Profile;