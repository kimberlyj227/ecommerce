import React, {useState} from "react";
import { Link, Redirect } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { addItem } from "./cartHelpers";
import ShowImage from "./ShowImage";
import moment from "moment";

const ProductCard = ({ product, showViewProductButton = true, showAddToCart = true }) => {

  const [redirect, setRedirect] = useState(false);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
      
          <Link to={`/product/${product._id}`}>
            <Button variant="outline-info" className="m-2">
                  View Product
            </Button>
          </Link>
        
      )
    )
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true)
    });
  }

  const shouldRedirect = (redirect) => {
   if(redirect) {
     return <Redirect to="/cart" />
   }
  }

  const addToCartButton = () => {
    return (
      showAddToCart && (
        <Button onClick={addToCart} variant="outline-warning" className="mt-2 mb-2">
                Add to Cart
        </Button>

      )
    )
  }

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
      ) : (
      <span className="badge badge-danger badge-pill">Out of Stock</span>
      );
  }

  return (
    
      <Card >
        <Card.Header className="name">
          <h4>{product.name}</h4>
        </Card.Header>
        <Card.Body>
          {shouldRedirect(redirect)}
          <ShowImage 
            item={product}
            url="product"
          />
          <p className="lead mt-2">{product.description}</p>
          <p className=" mt-2"><strong>Price: </strong>${product.price}</p>
          <p className=" mt-2"><strong>Category: </strong>{product.category && product.category.name}</p>
          <p className=" mt-2"><strong>Added: </strong>{moment(product.createdAt).fromNow()}</p>
          
            {showStock(product.quantity)}
          
        </Card.Body>
        <Card.Footer>
            {showViewButton(showViewProductButton)}
            {addToCartButton(showAddToCart)}
        </Card.Footer>
      </Card>
    
  )
}

export default ProductCard;