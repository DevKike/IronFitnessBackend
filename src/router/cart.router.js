const { v4 } = require("uuid");
const routerCart = require("express").Router();
const sequelize = require("../db/db");
const objectValidator = require("../middleware/objectValidator");
const CartModel = require("../model/cart.model");
const CartProduct = require("../model/cartProduct.model");
const ProductModel = require("../model/product.model");
const UserModel = require("../model/user.model");
const { addItemProductSchema, removeItemProductSchema } = require("../schemas/addItemProductSchema");
const { roles } = require("../config/variables");

const authMiddleware = require("../middleware/authMiddleware");
const { roleMiddleware } = require("../middleware/roleMiddleware");

const fs = require("fs");
const { sendMail } = require("../helper/sendMail");

routerCart.post("/", authMiddleware(), roleMiddleware(roles.USER), objectValidator(addItemProductSchema), async (req, res) => {
  try {
    const { id } = req.user;
    //TODO: Implementar lógica de carrito de compras.
    
    // Validar que el usuario existe.
    const userFound = await UserModel.findOne({ where: { id: id } });
    if (!userFound) {
      throw {
        status: 404,
        message: "User not found"
      };
    }
    console.log(userFound.dataValues);

    // Buscar un carrito existente o crear uno nuevo.
    let cartFound = await CartModel.findOne({ where: { user_id: id, active: true }, include: "products" });
    if (!cartFound) {
      cartFound = await CartModel.create({ user_id: id, active: true });
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
    // Respuesta al cliente.
    res.status(201).json({
      status: 201,
      data: { message: "Producto agregado con éxito!" },
    });
  } catch (error) {
    res.status(error?.status || 422).send({ error: error?.message || "Error al crear producto" });
  }
});

routerCart.post("/removeOne", authMiddleware(), roleMiddleware(roles.USER), objectValidator(removeItemProductSchema), async (req, res) => {
  try {
    const { id } = req.user;
    
    const userFound = await UserModel.findOne({ where: { id: id } });
    if (!userFound) {
      throw {
        status: 404,
        message: "User not found"
      };
    }

    let cartFound = await CartModel.findOne({ where: { user_id: id, active: true }, include: "products" });
    if (!cartFound) {
      cartFound = await CartModel.create({ user_id: id });
    }

    const productFound = await ProductModel.findOne({ where: { id: req.body.product_id } });
    if(!productFound) {
      throw {
        status: 404,
        message: "Product not found"
      };
    }

    const productFind = cartFound.toJSON()?.products?.find(product => product.id === req.body.product_id);
    
    if(productFind){
      const transaction = await sequelize.transaction();
      try {
        const query = `
          UPDATE cart_product
          SET ammount = ammount - 1
          WHERE cart_id = :cartId AND product_id = :productId`;
        await sequelize.query(query, {
          replacements: {
            cartId: cartFound.id,
            productId: productFound.id,
          },
          transaction,
        });

        const updatedValue = await sequelize.query(`
          SELECT ammount
          FROM cart_product
          WHERE cart_id = :cartId AND product_id = :productId
        `, {
          replacements: {
            cartId: cartFound.id,
            productId: productFound.id,
          },
          plain: true,
          transaction,
        });

        if (updatedValue.ammount < 0 || updatedValue.ammount === 0) {
          await sequelize.query(`
            DELETE FROM cart_product
            WHERE cart_id = :cartId AND product_id = :productId
          `, {
            replacements: {
              cartId: cartFound.id,
              productId: productFound.id,
            },
            transaction,
          });
        }
        await transaction.commit();
      } catch (error) {
        await transaction.rollback();
      }
    }
    // Respuesta al cliente.
    res.status(201).json({
      status: 201,
      data: { message: "Producto retirado con éxito!" },
    });
  } catch (error) {
    res.status(error?.status || 422).send({ error: error?.message || "Error al crear producto" });
  }
});

routerCart.delete("/:id", authMiddleware(), roleMiddleware(roles.USER), async(req, res) => {
  try {
    const userId = req.user.id;
    const userFound = await UserModel.findOne({ where: { id: userId } });
    if (!userFound) {
      throw {
        status: 404,
        message: "User not found"
      };
    }

    let cartFound = await CartModel.findOne({ where: { user_id: userId, active: true }, include: "products" });
      if (!cartFound) {
        return res.status(404).send({
          error: "Carrito no encontrado"
        });
      }

    const result = await CartProduct.destroy({
      where: {
        cart_id: cartFound.toJSON().id,
        product_id: req.params.id
      }
    });
    res.status(200).send({
      message: "Eliminado con exito"
    });
  } catch (error) {
    res.status(400).send({
      error: "Error al intentar eliminar item"
    });
  }
});

routerCart.post("/payment", authMiddleware(), roleMiddleware(roles.USER), async (req, res) => {
  try {
    const { id } = req.user;
    const userFound = await UserModel.findOne({ where: { id: id } });
    if (!userFound) {
      throw {
        status: 404,
        message: "User not found"
      };
    }

    let cartFound = await CartModel.findOne({ where: { user_id: id, active: true }, include: "products" });
    if (!cartFound) {
      throw {
        status: 404,
        message: "Cart not found"
      };
    }
    await CartModel.update({ active: false, payed: true }, { where: { user_id: id, id: cartFound.toJSON().id } });

    const textMail = fs.readFileSync("./src/static/paymentConfirmation.html", "utf-8");

    const queryTotal = `SELECT SUM(cp.ammount * p.price) AS total_amount
      FROM cart_product cp
      INNER JOIN products p ON cp.product_id = p.id
      WHERE cp.cart_id = :cartId;
    `;

    const { total_amount } = await sequelize.query(queryTotal, {
      replacements: {
        cartId: cartFound.id,
      },
      plain: true
    });
    console.log("🚀  ~ file: cart.router.js:234 ~ routerCart.post ~ total:", total_amount);

    const user = userFound.toJSON();
    const date = new Date().toISOString();
    const html = textMail.replace("%name%", user.name)
      .replace("%last_name%", user.last_name)
      .replace("%date%", date)
      .replace("%total%", total_amount)
      .replace("%transaction_id%", v4());

    const emailInfo = {
      from: "ironfitness.enterprise@hotmail.com",
      to: userFound.toJSON().email,
      subject: "Confirmacion de pago",
      html
    };

    await sendMail(emailInfo);
    res.status(200).send("Puto");
  } catch (error) {
    res.status(error.status || 500).send({ error: error.message });
  }
});

module.exports = routerCart;