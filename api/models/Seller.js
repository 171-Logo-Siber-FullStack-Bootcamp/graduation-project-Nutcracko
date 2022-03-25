//DB connection
const pool = require("../config/db");

class Seller {
  constructor(username, email, password, ownedproducts) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.owned_products = ownedproducts;
  }

  //get admin by id
  static getSellerByID = async (sellerid) => {
    const seller = await pool.query(
      "SELECT * FROM seller_account WHERE s_id = $1",
      [sellerid]
    );

    if (seller.rowCount == 0) {
      throw "Seller does not exists!";
    }
    //creating a new seller object
    const sellerObj = new Seller(
      seller.rows[0].username,
      seller.rows[0].email,
      seller.rows[0].password,
      seller.rows[0].owned_products
    );
    return sellerObj;
  };

  //get admin by email
  static getSellerByEmail = async (email) => {
    const seller = await pool.query(
      "SELECT * FROM seller_account WHERE email = $1",
      [email]
    );

    if (seller.rowCount == 0) {
      throw "Seller does not exists!";
    }

    return seller.rows[0];
  };

  //checks if email exists
  static emailExists = async (email) => {
    const seller = await pool.query(
      "SELECT * FROM seller_account WHERE email = $1",
      [email]
    );

    if (seller.rowCount == 0) {
      return false;
    } else if (seller.rowCount >= 1) {
      return true;
    } else {
      throw "Something went wrong!";
    }
  };

  //checks if username exists
  static usernameExists = async (username) => {
    const seller = await pool.query(
      "SELECT * FROM seller_account WHERE username = $1",
      [username]
    );

    if (seller.rowCount == 0) {
      return false;
    } else if (seller.rowCount >= 1) {
      return true;
    } else {
      throw "Something went wrong!";
    }
  };

  static addPtoSellerProducts = async (sellerid, productid) => {
    //finding user by userid
    var seller = await pool.query(
      "SELECT * FROM seller_account WHERE s_id = $1",
      [sellerid]
    );

    //updateing products array
    seller.rows[0].owned_products.push(productid);

    const updatedSeller = await pool.query(
      "UPDATE seller_account SET owned_products=$1 WHERE s_id=$2 RETURNING *",
      [seller.rows[0].owned_products, sellerid]
    );

    return updatedSeller.rows[0];
  };

  //create admin account
  saveSeller = async () => {
    //Creating current date
    var newDate = new Date().toISOString().slice(0, 25).toString();

    //Inserting new user
    const newSeller = await pool.query(
      "INSERT INTO seller_account (username, email, password, owned_products, date) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [this.username, this.email, this.password, this.ownedproducts, newDate]
    );

    return newSeller.rows[0];
  };
}

module.exports = Seller;
