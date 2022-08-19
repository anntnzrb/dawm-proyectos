var DataTypes = require("sequelize").DataTypes;
var _Actor = require("./Actor");
var _Movie = require("./Movie");

function initModels(sequelize) {
  var Actor = _Actor(sequelize, DataTypes);
  var Movie = _Movie(sequelize, DataTypes);


  return {
    Actor,
    Movie,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
