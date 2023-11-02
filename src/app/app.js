const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routerUser = require("../router/user.router");
const routerProduct = require("../router/product.router");
const routerCart = require("../router/cart.router");
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use("/user", routerUser);
app.use("/product", routerProduct);
app.use("/cart", routerCart);

module.exports = app;