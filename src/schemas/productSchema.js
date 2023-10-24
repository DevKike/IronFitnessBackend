const Joi = require('joi');
// const customMessages = {
//     "string.email": "El correo no cumple el formato esperado!"
// };

const productSchema = Joi.object({
    product_name: Joi.string().required(),
    price: Joi.string().required(),
    brand: Joi.string().required(),
});

module.exports = productSchema;