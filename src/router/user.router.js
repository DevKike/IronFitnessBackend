const routerUser = require("express").Router();
const objectValidator = require("../middleware/objectValidator");
const userSchema = require("../schemas/userSchema");
const UserModel = require("../model/user.model");

const fs = require("fs");
const { sendMail } = require("../helper/sendMail");

routerUser.get("/", (req, res) =>{
    res.send("I am a Router");
});

routerUser.post("/", objectValidator(userSchema), async (req, res) => {
    try {
        const newUser = await UserModel.create(req.body);
        const user = newUser.toJSON();
        delete user.password;

        const textMail = fs.readFileSync("./src/static/welcomeEmail.html", "utf-8");

        const html = textMail.replace("%name%", user.name).replace("%last_name%", user.last_name);

        const emailInfo = {
            from: "ironfitness.enterprise@hotmail.com",
            to: req.body.email,
            subject: "Bienvenido a Iron Fitness",
            html
        };

        await sendMail(emailInfo);

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