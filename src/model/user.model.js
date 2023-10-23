const { DataTypes } = require("sequelize");
const sequelize = require("../db/db")

const UserModel = sequelize.define("Users", {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

module.exports = UserModel;