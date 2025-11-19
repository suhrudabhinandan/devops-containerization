const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')


const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },  
    mob: {
        type: DataTypes.BIGINT,
        allowNull: true,
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

module.exports = User;