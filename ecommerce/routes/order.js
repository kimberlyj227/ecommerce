const express = require("express");
const router = express.Router();

const { userById, addOrderToHistory  } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { create, listOrders } = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");


router.post(
  "/order/create/:userId", 
  requireSignin, 
  isAuth, 
  addOrderToHistory, 
  decreaseQuantity, 
  create
);

router.get("/order/list/:userId", requireSignin, isAuth, isAdmin, listOrders)


router.param("userId", userById)


module.exports = router;