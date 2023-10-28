const routerProduct = require("express").Router();
const objectValidator = require("../middleware/objectValidator");
const productSchema = require("../schemas/productSchema");
const ProductModel = require("../model/product.model");

routerProduct.get("/", (req, res) =>{
    res.send("I am a Router");
});

routerProduct.post("/", objectValidator(productSchema), async (req, res) =>{
    try {
        const newProduct = await ProductModel.create({
            name: req.body.product_name,
            price: req.body.price,
            brand: req.body.brand
        });
        const product = newProduct.toJSON();
        delete product.password;
        res.status(201).json({
            status: 201,
            data: product
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Error al crear producto" });
    }
});
module.exports = routerProduct;