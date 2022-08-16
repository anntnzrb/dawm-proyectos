var express = require('express');
var router = express.Router();

const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

/* GET home page. */
router.get('/', function (_req, res) {
  res.render('index');
});

/* ****************************************************************************
 * Movies
 * ************************************************************************* */
router.get('/movies', (_req, res) => {
  models.Movie.findAll()
    .then(mov => res.json(mov))
    .catch(error => res.status(400).send(error))
});

router.get('/movies/:id', (req, res) => {
  const id = req.params.id;
  models.Movie.findOne({ where: { movie_id: id } })
    .then(mov => res.json(mov))
    .catch(error => res.status(400).send(error))
});

/* ****************************************************************************
 * Actor
 * ************************************************************************* */
router.get('/actors', (_req, res) => {
  models.Actor.findAll()
    .then(actor => res.json(actor))
    .catch(error => res.status(400).send(error))
});

router.get('/actor/:id', (req, res) => {
  const id = req.params.id;
  models.Actor.findOne({ where: { actor_id: id } })
    .then(actor => res.json(actor))
    .catch(error => res.status(400).send(error))
});

module.exports = router;
