const Joi = require("joi");

const product_id = Joi.number();

const addItemProductSchema = Joi.object({
    product_id: product_id.required(),
});

module.exports = addItemProductSchema;