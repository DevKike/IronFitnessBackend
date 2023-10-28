const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const ProductModel = require("./product.model");

const CartModel = sequelize.define("Carts", {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id"
    }
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  payed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  underscored: true
});

CartModel.hasMany(ProductModel);

module.exports = CartModel;