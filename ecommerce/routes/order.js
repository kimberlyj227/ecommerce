const express = require("express");
const router = express.Router();

const { userById  } = require("../controllers/user");
const { requireSignin, isAuth } = require("../controllers/auth");
const { create} = require("../controllers/order");


router.post("/order/create/:userId", requireSignin, isAuth, create)

router.param("userId", userById)


module.exports = router;