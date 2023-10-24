const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const ProductModel = sequelize.define("Products", {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    price: DataTypes.TINYINT,
    brand: DataTypes.STRING
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

module.exports = ProductModel;