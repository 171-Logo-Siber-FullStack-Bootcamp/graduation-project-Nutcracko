//DB connection
const pool = require("../config/db");

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.cart = [];
    this.noi_incart = [];
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

  static addPtoUserCart = async (userid, productid) => {
    //finding user by userid
    var user = await pool.query("SELECT * FROM user_account WHERE u_id = $1", [
      userid,
    ]);

    //check if product exists in the cart
    const index = user.rows[0].cart.findIndex(productid);

    //if product does not exists in the cart
    if (index == -1) {
      const updatedCart = user.rows[0].cart.push(productid);
      const updatedNoi = user.rows[0].noi_incart.push(1);
    } else {
      //cart stayes the same
      const updatedCart = user.rows[0].cart;
      const numberofitem = user.rows[0].noi_incart[index] + 1;

      //updateing noi_incart
      user.rows[0].noi_incart[index] = numberofitem;
      const updatedNoi = user.rows[0].noi_incart;
    }
    const updatedUser = await pool.query(
      "UPDATE user_account SET cart=$1, noi_incart=$2 WHERE u_id=$3",
      [updatedCart, updatedNoi, userid]
    );

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
      "UPDATE user_account SET username=$1, email=$2, password=$3 WHERE u_id=$4",
      [this.username, this.email, this.password, userid]
    );

    return updatedUser;
  };

  //verifies user
  verifyUser = async (userid) => {
    //updating admin
    const updatedAdmin = await pool.query(
      "UPDATE user_account SET verified=$1 WHERE u_id=$2",
      [true, userid]
    );

    return updatedUser;
  };
}

module.exports = User;
