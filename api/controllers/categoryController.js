//PRODUCT CONTROLLER
//Logger
const logger = require("../config/dev-logger");

//model
const Category = require("../models/Category");
const Product = require("../models/Product");

//returns all categories
getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.getAllCategories();
    //returning products
    res.json(allCategories);
  } catch (error) {
    logger.error(new Error(error), {
      location: "./controller/categoryController",
    });

    //returning error
    res.status(400).send(error);
  }
};

//! This is also exists by ElasticSearch => in searchController
//returnes all products in a category
getAllPinCategory = async (req, res) => {
  try {
    const allProducts = await Category.getAllProductsinCategory(
      req.params.categoryname
    );
    //returning products
    res.json(allProducts);
  } catch (error) {
    logger.error(new Error(error), {
      location: "./controller/categoryController",
    });

    //returning error
    res.status(400).send(error);
  }
};

//returns category by name
getCategoryByName = async (req, res) => {
  try {
    if (!req.params.categoryname) {
      throw "No categoryid exists in request.";
    }
    const category = await Category.getCategoryByName(req.params.categoryname);
    //returning product
    return res.json(category);
  } catch (error) {
    logger.error(new Error(error), {
      location: "./controller/categoryController",
    });

    //returning error
    return res.status(400).send(error);
  }
};

//posts category
createCategory = async (req, res) => {
  try {
    //deny non-JSON requests
    if (req.header("Content-Type") !== "application/json") {
      throw "The req should be in JSON format";
    }

    //TODO: Admin verify token to create category

    //check if category with same name exists
    const categoryExists = Category.getCategoryByName(req.body.name);

    //creating new product
    const newCategory = new Category(req.body.name, []);

    //saving product
    const category = await newCategory.saveCategory();

    //logging new category
    logger.info(`A new category has been created in DB: \n ${newCategory}`, {
      meta: "category_create",
    });

    //returning answer
    return res.json(newCategory);
  } catch (error) {
    logger.error(new Error(error), {
      location: "./controller/productController",
    });
    //returning error
    return res.status(400).send(error);
  }
};

//delete category Did not finish it
deleteCategory = async (req, res) => {
  try {
    const deletedProduct = await Category.deleteCategoryByID(
      req.params.categoryid
    );
  } catch (error) {
    logger.error(new Error(error), {
      location: "./controller/productController",
    });
    //returning error
    res.status(400).send(error);
  }
};

module.exports = {
  getAllCategories,
  getAllPinCategory,
  getCategoryByName,
  createCategory,
  deleteCategory,
};
