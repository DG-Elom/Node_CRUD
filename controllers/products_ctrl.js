const Product = require("../models/products");
const fs = require("fs");

exports.getAllProducts = (req, res) => {
  Product.find()
    .exec()
    .then((products) => {
      res.render("show_products", {
        title: "Products",
        products: products,
      });
    })
    .catch((err) => {
      res.json({ message: err.message });
    });
};

exports.insertProducts = (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    image: req.file.filename,
  });
  product
    .save()
    .then(() => {
      req.session.message = {
        type: "success",
        message: "User added successfully!",
      };
      res.redirect("/products");
    })
    .catch((err) => {
      res.json({ message: err.message, type: "danger" });
    });
};

exports.getAddProductPage = (req, res) => {
  res.render("add_product", { title: "Add Product" });
};

exports.editProductPage = (req, res) => {
  let id = req.params.id;
  Product.findById({ _id: id })
    .then((product) => {
      if (product == null) {
        res.redirect("/products");
      } else {
        res.render("edit_products", {
          title: "Edit Products",
          product: product,
        });
      }
    })
    .catch((err) => {
      res.redirect("/products");
    });
};

exports.updateProduct = (req, res) => {
  let id = req.params.id;
  let new_image = "";

  if (req.file) {
    new_image = req.file.filename;
    try {
      fs.unlinkSync("/uploads/" + req.body.old_image);
    } catch (err) {
      console.log(err);
    }
  } else {
    new_image = req.body.old_image;
  }

  Product.findByIdAndUpdate(id, {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    image: new_image,
  })
    .then(() => {
      req.session.message = {
        type: "success",
        message: "Product updated successfully!",
      };
      res.redirect("/products");
    })
    .catch((err) => {
      res.json({ message: err.message, type: "danger" });
    });
};

exports.deleteProduct = (req, res) => {
  let id = req.params.id;
  Product.findByIdAndRemove(id)
    .then((result) => {
      console.log(result);
      if (result.image != "") {
        try {
          fs.unlinkSync("./uploads/" + result.image);
        } catch (err) {
          console.log(err);
        }
      }
      req.session.message = {
        type: "info",
        message: "Product deleted successfully!",
      };
      res.redirect("/products");
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: err.message, type: "danger" });
    });
};
