const express = require("express");
const router = express.Router();

const { create } = require("../controllers/category");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");


router.post("/category/create/:userId", requireSignin, isAdmin, isAuth, create);

router.param("userId", userById);

module.exports = router;