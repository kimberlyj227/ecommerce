import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import CreateCategory from "./admin/CreateCategory";
import CreateProduct from "./admin/CreateProduct";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import Orders from "./admin/Orders";
import Profile from "./user/Profile";
// import "bootstrap/dist/css/bootstrap.min.css";




const Routes = () => {
  return (
    <Router>
     
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/product/:productId" exact component={Product} />

        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
        
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={CreateCategory} />
        <AdminRoute path="/create/product" exact component={CreateProduct} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        

      </Switch>
    </Router>
  )
}

export default Routes;