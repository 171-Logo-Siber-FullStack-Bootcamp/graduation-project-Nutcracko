//image upload middleware
//LIBS
const multer = require("multer");
const path = require("path");

//creating new date
var newDate = new Date().toISOString().slice(0, 25).replace(/:/g, "-");

//Static folder is selected as the local storage for images
//creating disk storage for file uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/img/products/"),
  filename: function (req, file, cb) {
    return cb(
      null,
      `Sellerid- ${req.sellerid} -${newDate} - ${file.originalname}`
    );
  },
});

//returns multer middleware with storage options
module.exports = multer({ storage: storage });
