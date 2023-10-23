const routerUser = require("express").Router();

const Users = require("../model/user.model")

routerUser.get("/", (req, res) =>{
    res.send("I am a Router");
});

routerUser.post("/", async (req, res) =>{
    await Users.sync()
    const createUser = await Users.create({
        name: "Alvaro", 
        last_name: "Narvaez",
        email: "alvarogmail.com", 
        password: "alvaro123",
        phone_number: "3233255528",
    })
    res.status(201).json({
        ok : true,
        status: 201,
        message: "Usuario creado!"
    })
});
module.exports = routerUser;

