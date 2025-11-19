const {DataTypes} = require('sequelize');
const sequelize = require('../db/db');

const Institute = sequelize.define("Institute", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    contactNumber: {
        type: DataTypes.BIGINT, 
        allowNull: false,
        unique: false,
    },
     createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Institute;