const Joi = require("joi");

const product_id = Joi.number();
const ammount = Joi.number();

const addItemProductSchema = Joi.object({
    product_id: product_id.required(),
    ammount: ammount.required()
});

module.exports = addItemProductSchema;