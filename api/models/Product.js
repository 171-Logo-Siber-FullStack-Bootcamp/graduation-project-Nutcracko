const pool = require("../config/db");

class Product {
  constructor(name, description, category, image, price, seller) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.image = image;
    this.price = price;
    this.seller = seller;
  }

  static getAllProducts = async () => {
    const allProducts = await pool.query("SELECT * FROM product");

    if (allProducts.rowCount == 0) {
      throw "No Products have been found.";
    }

    return allProducts.rows;
  };

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

  static deleteProductByID = async (productid) => {
    const deletedProduct = await pool.query(
      "DELETE * FROM product WHERE p_id = $1",
      [productid]
    );

    if (deletedProduct.rowCount == 0) {
      throw "Product does not exists!";
    }

    return deletedProduct;
  };

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

    return newProduct.rows[0];
  };
}

module.exports = Product;
