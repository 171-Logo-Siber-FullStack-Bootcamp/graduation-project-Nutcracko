//admin controller
//logger
const logger = require("../config/dev-logger");

//model
const Seller = require("../models/Seller");

//! these controllers are moved to productController
//deleting product
deleteProduct = async (req, res) => {
  try {
    //check if admin owns the product
    //delete product from admin owned products
    //delete product
    //update admin
    //return
  } catch (error) {
    //return error
  }
};

//changing stock
changeStock = async (req, res) => {
  try {
    //check if admin owns the product
    //find product
    //change stock setting
    //update product
    //return
  } catch (error) {
    //return error
  }
};

module.exports = { deleteProduct, changeStock };
