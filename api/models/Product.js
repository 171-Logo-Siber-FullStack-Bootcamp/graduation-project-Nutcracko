//DB connection
const pool = require("../config/db");

//elasticcontroller
const elasticController = require("../controllers/elasticController");

//Product model and DAL
class Product {
  constructor(name, description, category, image, price, seller) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.image = image;
    this.price = price;
    this.seller = seller;
  }

  //returns all products
  static getAllProducts = async () => {
    const allProducts = await pool.query("SELECT * FROM product");

    if (allProducts.rowCount == 0) {
      throw "No Products have been found.";
    }

    return allProducts.rows;
  };

  //returning product owned by seller
  static getSellerProducts = async (sellerid) => {
    //finding seller
    const seller = await pool.query(
      "SELECT * FROM seller_account WHERE s_id=$1",
      [sellerid]
    );

    if (seller.rowCount == 0) {
      throw "Seller does not exists!";
    }

    //getting seller products
    const allProducts = await pool.query(
      "SELECT * FROM product WHERE seller=$1",
      [seller.rows[0].username]
    );

    if (allProducts.rowCount == 0) {
      throw "No Products have been found.";
    }

    return allProducts.rows;
  };

  //returns product object by id
  static getProductByID = async (productid) => {
    const product = await pool.query("SELECT * FROM product WHERE p_id = $1", [
      productid,
    ]);

    if (product.rowCount == 0) {
      throw "Product does not exists!";
    }
    const productReturned = product.rows[0];

    //create new product
    const productObj = new Product(
      productReturned.name,
      productReturned.description,
      productReturned.category,
      productReturned.image,
      productReturned.price,
      productReturned.seller
    );

    return productObj;
  };

  //changes product stock option
  static changeStock = async (sellerid, productid) => {
    const product = await pool.query("SELECT * FROM product WHERE p_id = $1", [
      productid,
    ]);

    if (product.rowCount == 0) {
      throw "Product does not exists!";
    }
    const productReturned = product.rows[0];

    //check if seller owns the product
    const seller = await pool.query(
      "SELECT * FROM seller_account WHERE s_id = $1",
      [sellerid]
    );

    //throw error if seller does not owns product
    if (productReturned.seller != seller.rows[0].username) {
      throw "Seller does not owns the product.";
    }
    //change stock
    const stock = !productReturned.stockexists;

    //update product
    const updatedProduct = await pool.query(
      "UPDATE product SET stockexists=$1 WHERE p_id=$2 RETURNING *",
      [stock, productid]
    );

    return updatedProduct.rows[0];
  };

  //deletes product by id
  static deleteProductByID = async (productid) => {
    const deletedProduct = await pool.query(
      "DELETE FROM product WHERE p_id = $1",
      [productid]
    );

    if (deletedProduct.rowCount == 0) {
      throw "Product does not exists!";
    }

    return deletedProduct;
  };

  //updates product with given id
  updateProductByID = async (productid) => {
    //updating the product
    const updatedProduct = await pool.query(
      "UPDATE product SET name=$1, description=$2, category=$3, image=$4, price=$5, seller=$6 WHERE p_id=$7",
      [
        this.name,
        this.description,
        this.category,
        this.image,
        this.price,
        this.seller,
        productid,
      ]
    );
  };

  //saves product to DB
  saveProduct = async () => {
    //Creating current date
    var newDate = new Date().toISOString().slice(0, 25).toString();

    //Inserting new product
    const newProduct = await pool.query(
      "INSERT INTO product (name, description, category, image, price, seller, date) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [
        this.name,
        this.description,
        this.category,
        this.image,
        this.price,
        this.seller,
        newDate,
      ]
    );

    //indexes product in ES
    await elasticController.elasticPost(newProduct.rows[0]);

    return newProduct.rows[0];
  };
}

module.exports = Product;
