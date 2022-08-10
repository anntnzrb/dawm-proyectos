var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/* ****************************************************************************
 * DB
 * ************************************************************************* */
const { Sequelize } = require('sequelize');
const initMovie = require('./models/movie');
const initActor = require('./models/actor');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './nnn_movies.sqlite'
});

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err))

const movies = initMovie(sequelize);
const actors = initActor(sequelize);

module.exports = app;