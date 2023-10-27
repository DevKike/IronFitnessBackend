const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const CartModel = sequelize.define("Carts", {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    podruct_id: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    payed: DataTypes.BOOLEAN,
    details_id: DataTypes.INTEGER,
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

module.exports = CartModel;