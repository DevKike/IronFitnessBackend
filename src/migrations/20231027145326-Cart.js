'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("Carts", {
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
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("Carts");
  }
};
