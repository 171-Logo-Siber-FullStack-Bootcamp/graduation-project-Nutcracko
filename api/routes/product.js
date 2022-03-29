//Product routes
const router = require("express").Router();

//verify token
const { sellerVerify } = require("../controllers/verifyToken");

//image upload
const upload = require("../middleware/uploadImage");

//product controller
const productController = require("../controllers/productController");

//returns all products
router.get("/", (req, res) => {
  productController.getAllProducts(req, res);
});

//gets product info by id
router.get("/byid/:productid", (req, res) => {
  productController.getProductbyID(req, res);
});

//returns seller products
router.get("/seller", sellerVerify, (req, res) => {
  productController.getSellerProducts(req, res);
});

//POST, PUT, DELETE
//product create and update done by the owner of the product
router.post("/", sellerVerify, upload.single("image"), (req, res) => {
  productController.createProduct(req, res);
});

//update product by id
router.put("/:productid", sellerVerify, (req, res) => {
  productController.updateProductbyID(req, res);
});

//update stockexists
router.put("/changestock/:productid", sellerVerify, (req, res) => {
  productController.changeStock(req, res);
});

//delete product by id
router.delete("/:productid", sellerVerify, (req, res) => {
  productController.deleteProduct(req, res);
});

module.exports = router;
