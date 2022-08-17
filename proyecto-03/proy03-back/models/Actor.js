const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Actor', {
    actor_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    last_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    country: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Actor',
    timestamps: false
  });
};
