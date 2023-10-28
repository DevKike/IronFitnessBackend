const routerCart = require("express").Router();
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
    const userFound = await UserModel.findOne({ where: { id: userId } });
    if (!userFound) {
      throw {
        status: 404,
        message: "User not found"
      };
    }
    console.log(userFound.dataValues);
    let cartFound = await CartModel.findOne({ where: { user_id: userId, active: false }, include: "products" });
    console.log("🚀  ~ file: cart.router.js:19 ~ routerCart.post ~ cartFound:", cartFound);
    if (!cartFound) {
      cartFound = await CartModel.create({ user_id: userId });
    }

    const productFound = await ProductModel.findOne({ where: { id: req.body.product_id } });
    if(!productFound) {
      throw {
        status: 404,
        message: "Product not found"
      };
    }
    const productFind = cartFound.toJSON().products.find(product => product.id === req.body.product_id);
    console.log(productFind);
    if(!productFind){
      await cartFound.addProduct({...productFound, ammount: req.body.ammount});
    }else{
      await CartProduct.update({ammount: productFind.ammount + req.body.ammount},{id: cartFound.dataValues.id});
    }
    console.log(cartFound);


    //OTHER BONUS. Validar si el usuario existe.
    //1. Validar que exista el carrito y que esté activo.
    //2. Si no existe, entonces, crear un carrito y obtener el Id del carrito.
    //3. Agregar el producto al carrito con el Id del paso 2.
    //4. Devolver al usuario el mensaje de "Agregado con éxito".
    //BONUS. Validar que el producto exista.
    //BONUS. Si el producto ya existe, aumentar la cantidad.
    res.status(201).json({
      message: "Producto agregado con éxito!",
      status: 201,
      data: { userId },
    });
  } catch (error) {
    console.log(error.message);
    res.status(error?.status || 422).send({ error: error?.message || "Error al crear producto" });
  }
});
module.exports = routerCart;