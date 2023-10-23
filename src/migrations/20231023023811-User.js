'use strict';
const User = require("../model/user.model");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("User", User)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("User")
  }
};
