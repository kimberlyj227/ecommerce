import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import ProductCard from "./Card";
import { Row, Col, ListGroup } from "react-bootstrap";
import { getCategories } from "./apiCore";
import Checkbox from "./Checkbox";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    getCategories().then(data => {
      if(data.error) {
        setError(data.error)
      } else {
        setCategories(data)
      }
    })
  }
  

  return (
    <Layout
      title="Shop Page"
      description="Search and find books of your choice"
      className="container-fluid"
    >
      
      <Row>
        <Col md={4}>
          <h2>Filter by Categories</h2>
          <ul>
            <Checkbox
              categories={categories}
            />
          </ul>
        </Col>
        <Col md={8}>
          right
        </Col>

      </Row>
      

    </Layout>
  )
}

export default Shop;