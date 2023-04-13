'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('order_tags', {
      fields: ['order_id'], //Campo(s) da tabela de origem
      type: 'foreign key',
      name: 'order_tags_orders_fk', //nome da chave estrangeira(deve ser unico do BD)
      references: {
        table: 'orders',    //Tabela estrangeira
        field: 'id'         //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT', //Não deixa apagar estando em uso
      onUpdate: 'CASCADE' //Atualiza 
    })

    await queryInterface.addConstraint('order_tags', {
      fields: ['tag_id'], //Campo(s) da tabela de origem
      type: 'foreign key',
      name: 'order_tags_tags_fk', //nome da chave estrangeira(deve ser unico do BD)
      references: {
        table: 'tags',    //Tabela estrangeira
        field: 'id'         //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT', //Não deixa apagar estando em uso 
      onUpdate: 'CASCADE' //Atualiza 
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('order_tags', 'order_tags_orders_fk')
    await queryInterface.removeConstraint('order_tags', 'order_tags_tags_fk')
  }
};

