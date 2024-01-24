const Joi = require('joi');
const customMessages = {
    "string.email": "El correo no cumple el formato esperado!"
};

const userSchema = Joi.object({
    name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().message(customMessages).required(),
    password: Joi.string().required(),
    phone_number: Joi.string().required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().message(customMessages).required(),
    password:  Joi.string().required()
});

module.exports = { userSchema, loginSchema };