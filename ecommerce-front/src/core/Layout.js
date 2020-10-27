import React from "react";
import { Jumbotron } from "react-bootstrap";
import Menu from "./Menu";
import "../styles.css";


const Layout = ({ title = "Title", description ="Description", className, children }) => {
  return (
    <div>
      <Menu />
      <Jumbotron>
        <h2>{title}</h2>
        <h5>{description}</h5>
      </Jumbotron>
      <div className={className}>
        {children}
      </div>
    </div>
  )
}

export default Layout;