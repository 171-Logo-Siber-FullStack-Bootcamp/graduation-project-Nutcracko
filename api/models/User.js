//DB connection
const pool = require("../config/db");

//product model
const Product = require("../models/Product");

//user model and DAL
class User {
  constructor(username, email, password, cart, noi_incart) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.cart = cart;
    this.noi_incart = noi_incart;
  }

  //for users to get their profile info staticly
  static getUserByID = async (userid) => {
    const user = await pool.query(
      "SELECT * FROM user_account WHERE u_id = $1",
      [userid]
    );

    if (user.rowCount == 0) {
      throw "User does not exists!";
    }
    //creating a new user object
    const userObj = new User(
      user.rows[0].username,
      user.rows[0].email,
      user.rows[0].password,
      user.rows[0].cart,
      user.rows[0].noi_incart
    );

    return userObj;
  };

  static getUserByEmail = async (email) => {
    const user = await pool.query(
      "SELECT * FROM user_account WHERE email = $1",
      [email]
    );

    if (user.rowCount == 0) {
      throw "User does not exists!";
    } else if (user.rowCount > 1) {
      throw "Something went wrong!";
    }

    return user.rows[0];
  };

  static emailExists = async (email) => {
    const user = await pool.query(
      "SELECT * FROM user_account WHERE email = $1",
      [email]
    );

    if (user.rowCount == 0) {
      return false;
    } else if (user.rowCount >= 1) {
      return true;
    } else {
      throw "Something went wrong!";
    }
  };

  static usernameExists = async (username) => {
    const user = await pool.query(
      "SELECT * FROM user_account WHERE username = $1",
      [username]
    );

    if (user.rowCount == 0) {
      return false;
    } else if (user.rowCount >= 1) {
      return true;
    } else {
      throw "Something went wrong!";
    }
  };

  //getting user cart and returning products and noi
  static getUserCart = async (userid) => {
    //finding user by userid
    var user = await pool.query("SELECT * FROM user_account WHERE u_id = $1", [
      userid,
    ]);
    //user
    user = user.rows[0];

    //defining vars
    const cart = user.cart;
    var cartofproducts = [];
    var i = 0;
    if (cart.length != 0) {
      var product;
      for (var productid of cart) {
        product = await Product.getProductByID(productid);
        product.numberofitem = user.noi_incart[i];
        cartofproducts.push(product);
        i++;
      }

      return cartofproducts;
    } else {
      return [];
    }
  };

  static addPtoUserCart = async (userid, productid) => {
    //finding user by userid
    var user = await User.getUserByID(userid);

    //check if product exists in the cart
    const index = user.cart.indexOf(productid);

    //if product does not exists in the cart
    if (index == -1) {
      //updateing user.cart and user.noi_incart
      user.cart.push(productid);
      user.noi_incart.push(1);
    } else {
      //cart stayes the same
      //updateing noi_incart
      user.noi_incart[index]++;
    }

    const updatedUser = await user.updateUser(userid);

    return updatedUser;
  };

  //clears user cart
  static clearCart = async (userid) => {
    //finding user by userid
    var user = await User.getUserByID(userid);

    //clear cart
    user.cart = [];
    user.noi_incart = [];

    //update user
    const updatedUser = await user.updateUser(userid);

    //return user
    return updatedUser;
  };

  //for further use
  static deleteUserByID = async (userid) => {
    const deletedUser = await pool.query(
      "DELETE * FROM user_account WHERE u_id = $1",
      [userid]
    );

    if (deletedUser.rowCount == 0) {
      throw "User does not exists!";
    }

    return deletedUser;
  };

  //saves user to DB
  saveUser = async () => {
    //Creating current date
    var newDate = new Date().toISOString().slice(0, 25).toString();

    //Inserting new user
    const newUser = await pool.query(
      "INSERT INTO user_account (username, email, password, cart, noi_incart, date) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [
        this.username,
        this.email,
        this.password,
        this.cart,
        this.noi_incart,
        newDate,
      ]
    );
    return newUser.rows[0];
  };

  //updates any info delivered username email or password
  updateUser = async (userid) => {
    //updating user
    const updatedUser = await pool.query(
      "UPDATE user_account SET username=$1, email=$2, password=$3, cart=$4, noi_incart=$5 WHERE u_id=$6 RETURNING *",
      [
        this.username,
        this.email,
        this.password,
        this.cart,
        this.noi_incart,
        userid,
      ]
    );

    return updatedUser.rows[0];
  };

  //verifies user
  verifyUser = async (userid) => {
    //updating user
    const updatedUser = await pool.query(
      "UPDATE user_account SET verified=$1 WHERE u_id=$2",
      [true, userid]
    );

    return updatedUser;
  };
}

module.exports = User;
