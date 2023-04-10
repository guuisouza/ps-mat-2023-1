'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.City, { //Nome do campo na tabela de ORIGEM
        foreignKey: 'city_id',    //Nome do campo na tabela de DESTINO
        targetKey: 'id',          //Nome do atributo para exibição
        as: 'city'
      })

      // this.hasMany(models.CustomerTag, {
      //   foreignKey: 'customer_id',
      //   sourceKey: 'id',
      //   as: 'tags' 
      // })

      this.belongsToMany(models.Tag, {
        through: 'customer_tags',    // Tabela intermediária
        foreignKey: 'customer_id',   // Chave estrangeira da tabela intermediária
        otherKey: 'tag_id',          // Outra chave da tabela intermediária
        as: 'tags'                   // Nome do campo de associação (plural)
      })

    }
  }
  Customer.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    is_whatsapp: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Customer',
    tableName: 'customers'
  });
  return Customer;
};