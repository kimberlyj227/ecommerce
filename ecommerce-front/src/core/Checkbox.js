import React, {useState, useEffect} from "react";
import { Form, ListGroup } from "react-bootstrap"

const Checkbox = ({categories}) => {

  return categories.map((category, i) => (
        <li key={i} className="list-unstyled">
          <Form.Check 
            type="checkbox"
            label={category.name}
            id={category._id}
          />
        </li>
  
    ))
}

export default Checkbox;