'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      product_price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      product_brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW")
      },
      updated_at:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW")
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Products")
  }
};