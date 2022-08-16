var DataTypes = require("sequelize").DataTypes;
var _Actor = require("./Actor");
var _Movie = require("./Movie");
var _Movie_Actor = require("./Movie_Actor");

function initModels(sequelize) {
  var Actor = _Actor(sequelize, DataTypes);
  var Movie = _Movie(sequelize, DataTypes);
  var Movie_Actor = _Movie_Actor(sequelize, DataTypes);

  Movie_Actor.belongsTo(Actor, { as: "actor", foreignKey: "actor_id"});
  Actor.hasMany(Movie_Actor, { as: "Movie_Actors", foreignKey: "actor_id"});
  Movie_Actor.belongsTo(Movie, { as: "movie", foreignKey: "movie_id"});
  Movie.hasMany(Movie_Actor, { as: "Movie_Actors", foreignKey: "movie_id"});

  return {
    Actor,
    Movie,
    Movie_Actor,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
