const express = require("express");
const router = express.Router();
const User = require("../models/products");
const multer = require("multer");
const fs = require("fs");
const controller = require("../controllers/products_ctrl");

// image upload
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});
var upload = multer({
  storage: storage,
}).single("image");

// Get all products
router.get("/", controller.getAllProducts);

// Insert an product in database
router.post("/add", upload, controller.insertProducts);

// Get Add product page
router.get("/add", controller.getAddProductPage);

// Get Edit product page
router.get("/edit/:id", controller.editProductPage);

// Update products
router.post("/update/:id", upload, controller.updateProduct);

// Delete products
router.get("/delete/:id", controller.deleteProduct);

module.exports = router;
