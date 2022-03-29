//PRODUCT CONTROLLER
//Logger
const logger = require("../config/dev-logger");

//model
const Product = require("../models/Product");
const Seller = require("../models/Seller");
const Category = require("../models/Category");

//validator
const { createValidation } = require("../validators/productValidators");

//returns all products
getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.getAllProducts();
    //returning productss
    res.json(allProducts);
  } catch (error) {
    logger.error(new Error(error), {
      location: "./controller/productController",
    });
    //returning error
    res.status(400).send(error);
  }
};

//returns products of the seller
getSellerProducts = async (req, res) => {
  try {
    const allProducts = await Product.getSellerProducts(req.sellerid);
    //returning productss
    res.json(allProducts);
  } catch (error) {
    logger.error(new Error(error), {
      location: "./controller/productController",
    });
    //returning error
    res.status(400).send(error);
  }
};

//returns Product Object by productid
getProductbyID = async (req, res) => {
  try {
    if (!req.params.productid) {
      throw "No productid exists in request.";
    }
    const product = await Product.getProductByID(req.params.productid);
    //returning product
    return res.json(product);
  } catch (error) {
    logger.error(new Error(error), {
      location: "./controller/productController",
    });
    //returning error
    return res.status(400).send(error);
  }
};

//posts product
createProduct = async (req, res) => {
  try {
    //if seller did not log in
    if (!req.sellerid) {
      throw "Please log-in to proceed further";
    }

    //seller username
    const seller = await Seller.getSellerByID(req.sellerid);

    //category found
    const category = await Category.getCategoryByName(req.body.category);

    if (!category) {
      throw "No category exists with the given category name.";
    }

    //if image does not exists
    if (!req.file) {
      throw "Please upload an image of the product.";
    }

    //validation for creating product
    const isValid = await createValidation(req.body);

    if (isValid.error) {
      throw isValid.error.details[0].message;
    }

    //link for image file
    const imagelink =
      "http://localhost:5050/static/img/products/" + req.file.filename;

    //creating new product
    const newProduct = new Product(
      req.body.name,
      req.body.description,
      req.body.category,
      imagelink,
      req.body.price,
      seller.username
    );

    //saving product and creating indexing the product to ES
    const product = await newProduct.saveProduct();

    //add product to seller owned_products
    const updatedSeller = await Seller.addPtoSellerProducts(
      req.sellerid,
      product.p_id
    );

    //add product to category
    const updatedCategory = await Category.addPtoCategoryProducts(
      category.name,
      product.p_id
    );
    logger.info(
      `A product is created Successfully.\n  p_id: ${product.p_id}\n  name: ${product.name}`
    );
    //returning answer
    return res.json(product);
  } catch (error) {
    logger.error(new Error(error), {
      location: "./controller/productController",
    });
    //returning error
    return res.status(400).send(error);
  }
};

//changes Product stock option
changeStock = async (req, res) => {
  try {
    const product = await Product.changeStock(
      req.sellerid,
      req.params.productid
    );
    logger.info(
      `Product stock option changed.\n  p_id: ${product.p_id}\n  name: ${product.name}`
    );
    return res.send(product);
  } catch (error) {
    logger.error(new Error(error), {
      location: "./controller/productController",
    });
    //returning error
    return res.status(400).send(error);
  }
};
//deletes product by id
deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.deleteProductByID(
      req.params.productid
    );
  } catch (error) {
    logger.error(new Error(error), {
      location: "./controller/productController",
    });
    //returning error
    res.status(400).send(error);
  }
};

//updates the given properties of the product and the rest stays the same
updateProductbyID = async (req, res) => {
  try {
    const product = Product.getProductByID(req.params.productid);
    const updatedProduct = new Product(
      req.body.name || product.name,
      req.body.description || product.description,
      req.body.category || product.category,
      req.body.image || product.image,
      req.body.price || product.price,
      req.body.seller || product.seller
    );
    const answer = updatedProduct.updateProductbyID(req.params.productid);

    logger.info(`A product is updated.\n ${product},${updatedProduct}`);

    res.send(answer);
  } catch (error) {
    logger.error(new Error(error), {
      location: "./controller/productController",
    });
    //returning error
    res.status(400).send(error);
  }
};

module.exports = {
  getAllProducts,
  getSellerProducts,
  getProductbyID,
  createProduct,
  changeStock,
  deleteProduct,
  updateProductbyID,
};
