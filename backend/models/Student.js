// models/Student.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Student = sequelize.define(
  "Student",
  {
    student_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      field: "contact_number", // ensures DB column is contact_number
    },
    institute_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      defaultValue: "student",
    },
  },
  {
    tableName: "students",
    timestamps: true, // createdAt & updatedAt auto-handled
    underscored: true, // snake_case for columns (created_at, updated_at)
  }
);

module.exports = Student;
