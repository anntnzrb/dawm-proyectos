var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

/* ****************************************************************************
 * DB
 * ************************************************************************* */
const { Sequelize, DataTypes } = require('sequelize');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './nnn_movies.sqlite'
});

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err))

/* ****************************************************************************
 * Movies
 * ************************************************************************* */
const movie = sequelize.define('Movie', {
    movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    synopsis: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lenght: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cast_members: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

movie.sync({ force: true })
    .then(() => {
        return movie.bulkCreate([
            {
                title: "Interstellar",
                synopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
                year: 2014,
                lenght: 249,
                cast_members: "Matthew McConaughey;Anne Hathaway;Michael Caine"
            },
            {
                title: "Django Unchained",
                synopsis: "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation-owner in Mississippi.",
                year: 2012,
                lenght: 245,
                cast_members: "Jamie Foxx;Christoph Waltz;Leonardo DiCaprio"
            }]);
    })
    .then(() => console.log('Movie table was synced'))

/* ****************************************************************************
 * Actor
 * ************************************************************************* */
const actor = sequelize.define('Actor', {
    actor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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
    num_mov: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

actor.sync({ force: true })
    .then(() => {
        return actor.bulkCreate([
            {
                first_name: "Matthew",
                last_name: "McConaughey",
                year: 1968,
                num_mov: 75
            },
            {
                first_name: "Cillian",
                last_name: "Murphy",
                year: 1976,
                num_mov: 59
            }]);
    })
    .then(() => console.log('Actor table was synced'))


module.exports = app;