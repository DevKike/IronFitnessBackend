const routerCart = require("express").Router();
const sequelize = require("../db/db");
const objectValidator = require("../middleware/objectValidator");
const CartModel = require("../model/cart.model");
const CartProduct = require("../model/cartProduct.model");
const ProductModel = require("../model/product.model");
const UserModel = require("../model/user.model");
const addItemProductSchema = require("../schemas/addItemProductSchema");

routerCart.post("/:userId", objectValidator(addItemProductSchema), async (req, res) => {
  try {
    const { userId } = req.params;
    //TODO: Implementar lógica de carrito de compras.
    
    // Validar que el usuario existe.
    const userFound = await UserModel.findOne({ where: { id: userId } });
    if (!userFound) {
      throw {
        status: 404,
        message: "User not found"
      };
    }
    console.log(userFound.dataValues);

    // Buscar un carrito existente o crear uno nuevo.
    let cartFound = await CartModel.findOne({ where: { user_id: userId, active: false }, include: "products" });
    console.log("🚀  ~ file: cart.router.js:19 ~ routerCart.post ~ cartFound:", cartFound.products);
    if (!cartFound) {
      cartFound = await CartModel.create({ user_id: userId });
    }

    // Validar que el producto existe.
    const productFound = await ProductModel.findOne({ where: { id: req.body.product_id } });
    if(!productFound) {
      throw {
        status: 404,
        message: "Product not found"
      };
    }

    // Buscar si el producto ya existe en el carrito.
    const productFind = cartFound.toJSON()?.products?.find(product => product.id === req.body.product_id);
    console.log("🚀  ~ file: cart.router.js:42 ~ routerCart.post ~ productFind:", productFind);
    
    // Agregar el producto al carrito o aumentar la cantidad si ya existe.
    if(!productFind){
      const query = `INSERT INTO cart_product (cart_id, product_id, ammount) VALUES (:cartId, :productId, :ammount)`;
      await sequelize.query(query, {
        replacements: {
          cartId: cartFound.id,
          productId: productFound.id,
          ammount: req.body.ammount,
        },
        type: sequelize.QueryTypes.INSERT,
      });
    }else{
      const query = `
        UPDATE cart_product
        SET ammount = ammount + :additionalAmmount
        WHERE cart_id = :cartId AND product_id = :productId
      `;
      await sequelize.query(query, {
        replacements: {
          cartId: cartFound.id,
          productId: productFound.id,
          additionalAmmount: req.body.ammount,
        },
        type: sequelize.QueryTypes.UPDATE,
      })
    }
    console.log(cartFound);

    // Respuesta al cliente.
    res.status(201).json({
      status: 201,
      data: { message: "Producto agregado con éxito!" },
    });
  } catch (error) {
    console.log(error);
    res.status(error?.status || 422).send({ error: error?.message || "Error al crear producto" });
  }
});
module.exports = routerCart;