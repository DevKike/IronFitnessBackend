const routerUser = require("express").Router();

const UserModel = require("../model/user.model")

routerUser.get("/", (req, res) =>{
    res.send("I am a Router");
});

routerUser.post("/", async (req, res) =>{
    try {
        const newUser = await UserModel.create({
            name: "Alvaro", 
            last_name: "Narvaez",
            email: "alvarogmail.com", 
            password: "alvaro123",
            phone_number: "3233255528",
        });
        const user = newUser.toJSON();
        delete user.password;
        res.status(201).json({
            status: 201,
            data: user
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Error al crear usuario" });
    }
});
module.exports = routerUser;

