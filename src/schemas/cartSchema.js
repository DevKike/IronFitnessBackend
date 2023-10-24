const Joi = require('joi');

const productSchema = Joi.object({
    cart_id: Joi.number().min(1).required(),
    product_id: Joi.number().min(1).required(),
    ammount: Joi.number().min(1).required(),
});

module.exports = productSchema;