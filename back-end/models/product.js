'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Supplier, { //Nome do campo na tabela de ORIGEM
        foreignKey: 'supplier_id',    //Nome do campo na tabela de DESTINO
        targetKey: 'id',          //Nome do atributo para exibição
        as: 'supplier'
      })
    }
  }
  Product.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false //Campo não pode ser vazio
    },
    quantity: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false //Campo não pode ser vazio
    },
    unit: {
      type: DataTypes.ENUM("un", "kg"),
      allowNull: false //Campo não pode ser vazio
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false //Campo não pode ser vazio
      
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products'
  });
  return Product;
};