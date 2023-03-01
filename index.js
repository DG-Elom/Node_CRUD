// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.DB_URI;

// database connection
const promise = mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
promise.then(() => {
  console.log("Connected on the database!");
});

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
  })
);
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});
app.use(express.static("uploads"));

// set template engine
app.set("view engine", "ejs");
//app.set("views", "./views");
app.set("views", [
  __dirname + "/views/users",
  __dirname + "/views/products",
  __dirname + "/views",
]);
// route prefix
app.use("/", require("./routes/route"));
app.use("/users", require("./routes/users_routes"));
app.use("/products", require("./routes/products_routes"));

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
