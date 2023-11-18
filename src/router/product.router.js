const routerProduct = require("express").Router();
const objectValidator = require("../middleware/objectValidator");
const productSchema = require("../schemas/productSchema");
const ProductModel = require("../model/product.model");
const authMiddleware = require("../middleware/authMiddleware");
const { roleMiddleware } = require("../middleware/roleMiddleware");
const { roles } = require("../config/variables");

routerProduct.post("/", authMiddleware(), roleMiddleware(roles.ADMIN) ,objectValidator(productSchema), async (req, res) =>{
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

routerProduct.get("/", async (req, res) => {
    try {
        console.log("get into")
        const products = await ProductModel.findAll();
        res.status(200).json({
            products
        })
    } catch (error) {
        res.status(404).send({
            error: "No se encontraron productos"
        });
    }
});
module.exports = routerProduct;