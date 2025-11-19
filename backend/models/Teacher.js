const {DataTypes} = require('sequelize')
const sequelize = require('../db/db')

const Teacher = sequelize.define("Teacher", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    instituteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Institutes',
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contactNumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
    },
    position: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "teacher" ,
    primaryKey: true
  }
});


module.exports = Teacher;