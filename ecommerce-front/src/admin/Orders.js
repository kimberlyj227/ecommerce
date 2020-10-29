import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Col, Row, Form, Button, Alert, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listOrders } from "./apiAdmin";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { user, token } =isAuthenticated();

  useEffect(() => {
    loadOrders();
  }, [])

  const loadOrders = ( ) => {
    listOrders(user._id, token).then(data=> {
      if(data.error) {
        console.log(data.error)
      } else {
        setOrders(data)
      }
    });
  }

  const showOrderLength = orders => {
    if(orders.length > 0) {
      return (
        <h1 className="text-info display-2">Total Orders: {orders.length}</h1>
        )
      } else {
        return (
          <h1 className="text-danger display-2">No Orders</h1>
      )
    }
  };

  const showInput = (key, value) => {
    return (
      <div className="input-group mb-2 mr-2">
        <div className="input-group-prepend">
          <div className="input-group-text">
            {key}
          </div>
        </div>
        <input 
          type="text"
          value={value}
          className="form-control"
          readOnly
        />
      </div>
    )
  }
  

  return (
    <Layout
    title="Orders"
    description="Manage orders here"
    className="container"
  >
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        {showOrderLength(orders)}
        {orders.map((o, oIndex) => (
          <div 
            className="mt-5"
            key={oIndex}
            style={{ borderBottom: "5px solid indigo"}}
          >
            <h2 className="mb-5">
              <span className="bg-light">
                Order ID: {o._id}
              </span>
            </h2>

            <ListGroup className="mb-2">
              <ListGroup.Item>
                Order status: {o.status}
              </ListGroup.Item>

              <ListGroup.Item>
                Transaction ID: {o.transaction_id}
              </ListGroup.Item>

              <ListGroup.Item>
                Order amount: ${o.amount}
              </ListGroup.Item>

              <ListGroup.Item>
                Ordered by: {o.user.name}
              </ListGroup.Item>

              <ListGroup.Item>
                Ordered on: {moment(o.createdAt).fromNow()}
              </ListGroup.Item>

              <ListGroup.Item>
                Delivery Address: {o.address}
              </ListGroup.Item>
            
            </ListGroup>

            <h3 className="my-4 font-italic">
              Total products in the order: {o.products.length}
            </h3>

            {o.products.map((p, pIndex) => (
              <div 
                className="mb-4" 
                key={pIndex}
                style={{ padding: "20px", border: "2px solid indigo"}}
              >
                {showInput("Product name:", p.name)}
                {showInput("Product price:", p.price)}
                {showInput("Product total:", p.count)}
                {showInput("Product Id:", p._id)}
                
              </div>
            ))}



          </div>
        ))}
    
      </Col>
    </Row>

  </Layout>
  )
}

export default Orders;