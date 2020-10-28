const express = require("express");
const router = express.Router();

const { userById, addOrderToHistory  } = require("../controllers/user");
const { requireSignin, isAuth } = require("../controllers/auth");
const { create} = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");


router.post(
  "/order/create/:userId", 
  requireSignin, 
  isAuth, 
  addOrderToHistory, 
  decreaseQuantity, 
  create
);


router.param("userId", userById)


module.exports = router;