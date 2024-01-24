const routerProduct = require("express").Router();
const objectValidator = require("../middleware/objectValidator");
const productSchema = require("../schemas/productSchema");
const ProductModel = require("../model/product.model");
const authMiddleware = require("../middleware/authMiddleware");
const { roleMiddleware } = require("../middleware/roleMiddleware");
const { roles } = require("../config/variables");
const uploadImage = require("./../utils/uploadImage");

routerProduct.post("/", authMiddleware(), roleMiddleware(roles.ADMIN) ,objectValidator(productSchema), objectValidator(productSchema), async (req, res) =>{
    try {
        const image = await uploadImage(req.body.image);
        const newProduct = await ProductModel.create({
            name: req.body.name,
            price: req.body.price,
            brand: req.body.brand,
            description: req.body.description,
            image
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