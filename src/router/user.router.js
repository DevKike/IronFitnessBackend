const routerUser = require("express").Router();
const objectValidator = require("../middleware/objectValidator");
const { userSchema, loginSchema } = require("../schemas/userSchema");
const UserModel = require("../model/user.model");

const fs = require("fs");
const { sendMail } = require("../helper/sendMail");
const { signToken } = require("../utils/jwtVerify");
const { roles } = require("../config/variables");

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

routerUser.post("/login", objectValidator(loginSchema), async (req, res) => {
    const user = await UserModel.findOne({ where: {
        email: req.body.email,
        password: req.body.password
    }});

    if(!user) {
        return res.status(403).send({ message: 'Usuario o contraseña incorrecta'});
    }

    const token = signToken({
        id: user.toJSON().id,
        role: roles.USER
    });

    res.status(200).json({
        token
    });
});

routerUser.post("/login/admin", objectValidator(loginSchema), async (req, res) => {
    const user = await UserModel.findOne({ where: {
        email: req.body.email,
        password: req.body.password
    }});

    if(!user) {
        return res.status(403).send({ message: 'Usuario o contraseña incorrecta'});
    }

    const token = signToken({
        id: user.toJSON().id,
        role: roles.ADMIN
    });

    res.status(200).json({
        token
    });
});
module.exports = routerUser;