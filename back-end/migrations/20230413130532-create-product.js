'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING(100),
        allowNull: false //Campo não pode ser vazio
      },
      quantity: {
        type: Sequelize.DECIMAL(18,2),
        allowNull: false //Campo não pode ser vazio
      },
      unit: {
        type: Sequelize.ENUM("un", "kg"),
        allowNull: false //Campo não pode ser vazio
      },
      supplier_id: {
        type: Sequelize.INTEGER,
        allowNull: false //Campo não pode ser vazio
        
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};