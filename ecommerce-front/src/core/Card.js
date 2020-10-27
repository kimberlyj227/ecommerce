import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import ShowImage from "./ShowImage";

const ProductCard = ({ product }) => {
  return (
    <div className="col-4 mb-3">
      <Card>
        <Card.Header>
          <h4>{product.name}</h4>
        </Card.Header>
        <Card.Body>
          <ShowImage 
            item={product}
            url="product"
          />
          <p><strong>Description: </strong>{product.description}</p>
          <p><strong>Price: </strong>${product.price}</p>
          <Link to="/">
            <Button variant="outline-info" className="m-2">
              View Product
            </Button>
          </Link>
            <Button variant="outline-warning" className="mt-2 mb-2">
              Add to Cart
            </Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ProductCard;