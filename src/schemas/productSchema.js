const Joi = require('joi');

const productSchema = Joi.object({
    product_name: Joi.string().required(),
    price: Joi.string().required(),
    brand: Joi.string().required(),
});

module.exports = productSchema;