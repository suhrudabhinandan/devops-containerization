const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Staff = sequelize.define("Staff", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, // ✅ only one primary key
    },
    institute_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Institutes',
            key: 'id'
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.ENUM('Administrator', 'Support Staff', 'Trainer', 'Other'),
        allowNull: false,
        defaultValue: 'Other',
        // removed primaryKey: true
    },
    contactNumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true, // ✅ keep only one unique index per column
    }
}, {
    tableName: "Staffs", // optional, explicitly set table name
    timestamps: true,    // optional, add createdAt/updatedAt
});

module.exports = Staff;
