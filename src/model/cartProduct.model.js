const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const CartProduct = sequelize.define("cart_product", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "carts",
            key: "id"
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Products",
            key: "id"
        }
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    underscored: true
});

module.exports = CartProduct;