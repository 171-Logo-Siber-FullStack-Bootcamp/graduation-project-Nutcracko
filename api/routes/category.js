//Product routes
const router = require("express").Router();

//category controller
const categoryController = require("../controllers/categoryController");

//GETTERS
router.get("/", (req, res) => {
  categoryController.getAllCategories(req, res);
});

router.get("/:categoryname", (req, res) => {
  categoryController.getCategoryByName(req, res);
});

//get all products in a category
router.get("/getproducts/:categoryname", (req, res) => {
  categoryController.getAllPinCategory(req, res);
});

//SETTERS
//product create and update done by the owner of the product
router.post("/", (req, res) => {
  categoryController.createCategory(req, res);
});

module.exports = router;
