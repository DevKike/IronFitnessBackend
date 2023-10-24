const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const ProductModel = sequelize.define("Products", {
    product_id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    product_name: DataTypes.STRING,
    product_price: DataTypes.TINYINT,
    product_brand: DataTypes.STRING
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

module.exports = ProductModel;