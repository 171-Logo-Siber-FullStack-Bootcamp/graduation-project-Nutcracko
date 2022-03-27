//LIBS
const router = require("express").Router();

//verify token controller
const { userVerify } = require("../controllers/verifyToken");

//user controller imported
const userController = require("../controllers/userController");

//returns user cart
router.get("/cart", userVerify, (req, res) => {
  userController.getUserCart(req, res);
});

//adds product in req.params to user products
router.post("/addtocart/:productid", userVerify, (req, res) => {
  userController.addProducttoCart(req, res);
});

//returns user profile
router.get("/profile", userVerify, (req, res) => {
  userController.userProfile(req, res);
});

module.exports = router;
