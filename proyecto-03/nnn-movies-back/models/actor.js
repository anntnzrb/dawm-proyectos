const { DataTypes } = require('sequelize');

const initActor = (sequelize) => {
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
                    first_name: "Anna",
                    last_name: "Kendrick",
                    year: 1985,
                    num_mov: 61
                },
                {
                    first_name: "Cillian",
                    last_name: "Murphy",
                    year: 1976,
                    num_mov: 59
                }]);
        })
        .then(() => console.log('Actor table was synced'))
}

module.exports = initActor;