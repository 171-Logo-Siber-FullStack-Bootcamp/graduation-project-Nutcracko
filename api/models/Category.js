//DB connection
const pool = require("../config/db");

//Category model and DAL
class Category {
  constructor(name, products) {
    this.name = name;
    this.products = products;
  }

  //returns all categories
  static getAllCategories = async () => {
    const allCategories = await pool.query("SELECT * FROM category");
    if (allCategories.rowCount == 0) {
      throw "No Categories have been found.";
    }
    return allCategories.rows;
  };

  //returns category with passed name
  static getCategoryByName = async (categoryname) => {
    const category = await pool.query(
      "SELECT * FROM category WHERE name = $1",
      [categoryname]
    );

    if (category.rowCount == 0) {
      throw "Category does not exists!";
    }

    //return category
    return category.rows[0];
  };

  //returns all products in a category
  //! also exists in elasticsearch
  static getAllProductsinCategory = async (categoryname) => {
    const category = await pool.query(
      "SELECT * FROM category WHERE name = $1",
      [categoryname]
    );

    if (category.rowCount == 0) {
      throw "Category does not exists!";
    }

    const products = await pool.query(
      "SELECT * FROM product WHERE category=$1",
      [categoryname]
    );

    return products.rows;
  };

  //adds product to category products array
  static addPtoCategoryProducts = async (categoryname, productid) => {
    //finding category from name
    var category = await pool.query("SELECT * FROM category WHERE name = $1", [
      categoryname,
    ]);

    //adding product id to category products array
    category.rows[0].products.push(productid);

    const updatedCategory = await pool.query(
      "UPDATE category SET products=$1 WHERE c_id=$2 RETURNING *",
      [category.rows[0].products, category.rows[0].c_id]
    );

    return updatedCategory.rows[0];
  };

  //saves category object to db
  saveCategory = async () => {
    //Creating current date
    var newDate = new Date().toISOString().slice(0, 25).toString();

    //Inserting new Category to DB
    const newCategory = await pool.query(
      "INSERT INTO category (name, products, date) VALUES ($1,$2,$3) RETURNING *",
      [this.name, this.products, newDate]
    );

    return newCategory.rows[0];
  };
}

module.exports = Category;
