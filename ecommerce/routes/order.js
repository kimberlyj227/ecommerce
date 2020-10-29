const express = require("express");
const router = express.Router();

const { userById, addOrderToHistory  } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { create, listOrders, getStatusValues } = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");


router.post(
  "/order/create/:userId", 
  requireSignin, 
  isAuth, 
  addOrderToHistory, 
  decreaseQuantity, 
  create
);

router.get("/order/list/:userId", requireSignin, isAuth, isAdmin, listOrders);
router.get("/order/status-values/:userId", requireSignin, isAuth, isAdmin, getStatusValues);



router.param("userId", userById)


module.exports = router;