const express = require("express");
const morgan = require("morgan");
const routerUser = require("../router/user.router");
const routerProduct = require("../router/product.router");
const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.get("/", (req, res) => {
    res.send("This is Express")
});

app.use("/user", routerUser)
app.use("/product", routerProduct)

module.exports = app;