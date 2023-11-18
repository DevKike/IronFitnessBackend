const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    brand: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.object({
        fileType: Joi.string().required(),
        image: Joi.string().required()
    }).required()
});

module.exports = productSchema;