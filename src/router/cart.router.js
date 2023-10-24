const routerCart = require("express").Router();
const objectValidator = require("../middleware/objectValidator");
// const productSchema = require("../schemas/productSchema");
// const ProductModel = require("../model/product.model");

routerCart.post("/:userId", async (req, res) => {
  try {
    //TODO: Implementar lógica de carrito de compras.
    //OTHER BONUS. Validar si el usuario existe.
    //1. Validar que exista el carrito y que esté activo.
    //2. Si no existe, entonces, crear un carrito y obtener el Id del carrito.
    //3. Agregar el producto al carrito con el Id del paso 2.
    //4. Devolver al usuario el mensaje de "Agregado con éxito".
    //BONUS. Validar que el producto exista.
    //BONUS. Si el producto ya existe, aumentar la cantidad.
    const { userId } = req.params;
    res.status(201).json({
      status: 201,
      data: { userId },
    });
  } catch (error) {
    console.log(error.message);
    res.status(422).send({ error: "Error al crear producto" });
  }
});
module.exports = routerCart;
