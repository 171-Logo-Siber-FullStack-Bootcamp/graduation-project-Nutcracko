//Product routes
const router = require("express").Router();

//verify token
const { sellerVerify } = require("../controllers/verifyToken");

//image upload
const upload = require("../middleware/uploadImage");

//product controller
const productController = require("../controllers/productController");

//GETTERS
router.get("/", (req, res) => {
  productController.getAllProducts(req, res);
});

router.get("/:productid", (req, res) => {
  productController.getProductbyID(req, res);
});

//SETTERS
//product create and update done by the owner of the product
router.post("/", sellerVerify, upload.single("image"), (req, res) => {
  productController.createProduct(req, res);
});

router.put("/:productid", sellerVerify, (req, res) => {
  productController.updateProductbyID(req, res);
});

router.put("/changestock", sellerVerify, (req, res) => {
  adminController.changeStock(req, res);
});

router.delete("/:productid", sellerVerify, (req, res) => {
  productController.deleteProduct(req, res);
});

module.exports = router;
