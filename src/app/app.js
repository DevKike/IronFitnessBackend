const express = require("express")

const morgan = require("morgan")

const routerUser = require("../router/user.router")

const app = express()

app.use(morgan("dev"))
app.get("/", (req, res) => {
    res.send("This is Express")
});

app.use("/user", routerUser)

module.exports = app;