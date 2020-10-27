import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import ProductCard from "./Card";
import { Row, Col, ListGroup } from "react-bootstrap";
import { getCategories } from "./apiCore";
import Checkbox from "./Checkbox";
import Radiobox from "./RadioBox";
import { prices } from "./FixedPrices";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [myFilters, setMyFilters] = useState({
    filters: {
      category: [],
      price: []
    }
  })

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

  const handleFilters = (filters, filterBy) => {
    const newFilters = {...myFilters};
    newFilters.filters[filterBy] = filters;

    if(filterBy === "price") {
       let priceValues = handlePrice(filters);
       newFilters.filters[filterBy] = priceValues;
    }

    setMyFilters(newFilters);

  }

  const handlePrice = value => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if(data[key]._id === parseInt(value)) {
        array = data[key].array
      }
    }
    return array;
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
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>

          <h2>Filter by Price</h2>
          <div>
            <Radiobox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </Col>
        <Col md={8}>
          right
        </Col>

      </Row>
      

    </Layout>
  )
}

export default Shop;