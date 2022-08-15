const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

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
