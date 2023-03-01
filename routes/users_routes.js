const express = require("express");
const router = express.Router();
const User = require("../models/users");
const multer = require("multer");
const fs = require("fs");
const controller = require("../controllers/users_ctrl");

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

// Get all users
router.get("/", controller.getAllUsers);

// Insert an user in database
router.post("/add", upload, controller.insertUser);

// Get Add user page
router.get("/add", controller.getAddUserPage);

// Get Edit user page
router.get("/edit/:id", controller.editUserPage);

// Update users
router.post("/update/:id", upload, controller.updateUser);

// Delete users
router.get("/delete/:id", controller.deleteUser);

module.exports = router;
