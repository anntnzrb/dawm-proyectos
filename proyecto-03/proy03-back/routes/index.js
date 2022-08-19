const express = require('express');
const router = express.Router();

const sequelize = require('../models/index.js').sequelize;
const initModels = require("../models/init-models");
const models = initModels(sequelize);

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

router.get('/movies/by-name/:main_actor', (req, res) => {
  const name = req.params.main_actor;

  models.Movie.findAll({ where: { main_actor: name } })
    .then(mov => res.json(mov))
    .catch(error => res.status(400).send(error))
});

router.get('/movies/by-year/:year', (req, res) => {
  const year = req.params.year;

  models.Movie.findAll({ where: { year: year } })
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

router.get('/actors/:id', (req, res) => {
  const id = req.params.id;
  models.Actor.findOne({ where: { actor_id: id } })
    .then(actor => res.json(actor))
    .catch(error => res.status(400).send(error))
});

module.exports = router;
