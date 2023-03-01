const express = require("express");
const router = express.Router();

const User = require("../models/users");

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    message: "Bienvenue sur ma page",
  });
});

module.exports = router;
