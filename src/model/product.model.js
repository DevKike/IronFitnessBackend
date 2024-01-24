const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const CartModel = require("./cart.model");

const ProductModel = sequelize.define("Products", {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.TEXT
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

// ProductModel.belongsToMany(CartModel, { through: "cart_product", as: "products" });

module.exports = ProductModel;