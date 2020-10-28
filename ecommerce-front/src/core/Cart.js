import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import ProductCard from "./Card";
import { getCart } from "./cartHelpers";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart())
  }, []);

  const showItems = (items) => {
    return (
      <div>
        <h2> Your cart has {`${items.length}`} items. </h2>
        <hr/>
        {items.map((product, i) => (
          <ProductCard 
            key={i}
            product={product}
            showAddToCart={false}
            cartUpdate={true}
          />
        ))}
      </div>
    )
  };

  const noItems = () => {
    <h2>
      Your cart is empty
      <br/>
      <Link to="/shop">Continue Shopping</Link>
    </h2>
  }

  return (
    <Layout
      title="Shopping Cart"
      description="Manage Cart Items"
      className="container-fluid"
    >
      
      <Row>
        <Col md={6}>
          {items.length ? (
            showItems(items)
          ) : (
            noItems()
          )}
        </Col>

        <Col md={6}>
          cart checkout options
        </Col>
        
      </Row>
      
    </Layout>
  )
}

export default Cart;