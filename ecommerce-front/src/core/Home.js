import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import ProductCard from "./Card";
import { Row, Col } from "react-bootstrap";


const Home = () => {
  const [productsBySell, setProductsBySell] = useState([])
  const [productsByArrival, setProductsByArrival] = useState([])
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  }

  const loadProductsByArrival = () => {
    getProducts("createdAt").then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  }

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, [])

  return (
    <Layout
      title="Home Page"
      description="Node React Ecommerce App"
      className="container"
    >
      <h2 className="mb-2">Best Sellers</h2>
      <Row>
        {productsBySell.map((product, i) => (
          
            <ProductCard
              key={i}
              product={product}
            />
          
        ))}

      </Row>
      <hr/>
      <h2 className="mb-2">New Arrivals</h2>
      <Row>
        {productsByArrival.map((product, i) => (
          <ProductCard
            key={i}
            product={product}
          />
        ))}
        
      </Row>

    </Layout>
  )
}

export default Home;