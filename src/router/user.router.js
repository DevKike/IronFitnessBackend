const routerUser = require("express").Router();
const objectValidator = require("../middleware/objectValidator");
const userSchema = require("../schemas/userSchema");
const UserModel = require("../model/user.model");

routerUser.post("/", objectValidator(userSchema), async (req, res) =>{
    try {
        const newUser = await UserModel.create(req.body);
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