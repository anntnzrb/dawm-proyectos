const { DataTypes } = require('sequelize');

const initMovie = (sequelize) => {

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
                    lenght: 209,
                    cast_members: "Matthew McConaughey;Anne Hathaway;Michael Caine"
                },
                {
                    title: "The Accountant",
                    synopsis: "As a math savant uncooks the books for a new client, the Treasury Department closes in on his activities, and the body count starts to rise.",
                    year: 2016,
                    lenght: 128,
                    cast_members: "Ben Affleck;Anna Kendrick;Jon Bernthal"
                },
                {
                    title: "Django Unchained",
                    synopsis: "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation-owner in Mississippi.",
                    year: 2012,
                    lenght: 205,
                    cast_members: "Jamie Foxx;Christoph Waltz;Leonardo DiCaprio"
                }]);
        })
        .then(() => console.log('Movie table was synced'))

    return movie;
}

module.exports = initMovie;