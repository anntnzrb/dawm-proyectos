const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Movie_Actor', {
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Movie',
        key: 'movie_id'
      }
    },
    actor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Actor',
        key: 'actor_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Movie_Actor',
    timestamps: false
  });
};
