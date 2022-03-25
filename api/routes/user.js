//LIBS
const router = require("express").Router();

//verify token controller
const { userVerify } = require("../controllers/verifyToken");

//user controller imported
const userController = require("../controllers/userController");

router.post("/addtocart/:productid", userVerify, (req, res) => {
  userController.addItemtoCart(req, res);
});

router.get("/profile", userVerify, (req, res) => {
  userController.userProfile(req, res);
});

router.get("/cart", userVerify, (req, res) => {
  userController.getUserCart(req, res);
});

module.exports = router;
