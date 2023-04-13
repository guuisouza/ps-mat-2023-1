'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('products', {
      fields: ['supplier_id'], //Campo(s) da tabela de origem
      type: 'foreign key',
      //nome da chave estrangeira(deve ser unico do BD)
      name: 'products_suppliers_fk', 
      references: {
          table: 'suppliers',    //Tabela estrangeira
          field: 'id'         //Campo da tabela estrangeira
      },
      onDelete: 'Restrict', //Não deixa apagar um supplier em uso no product
      onUpdate: 'CASCADE' //Atualiza supplier_id em product se id em supplier mudar
  })
  },

  async down (queryInterface, Sequelize) {
    //Reverte as alterações do up()
    await queryInterface.removeConstraint('products' , 'products_suppliers_fk')
  }
};
