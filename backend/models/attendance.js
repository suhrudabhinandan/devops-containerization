// models/Attendance.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const Student = require("./Student");
const Institute = require("./institute");

const Attendance = sequelize.define(
  "Attendance",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    institute_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Institutes", // ✅ table name in DB
        key: "id", // ✅ matches Institute model primary key
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "students", // ✅ table name in DB
        key: "student_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    status: {
      type: DataTypes.ENUM("Present", "Absent", "Leave"),
      allowNull: false,
      defaultValue: "Absent",
    },
  },
  {
    timestamps: true,
    tableName: "attendance",
    indexes: [
      {
        unique: true,
        fields: ["student_id", "date"], // ✅ prevents duplicate attendance
      },
    ],
  }
);

// ✅ Associations
Student.hasMany(Attendance, { foreignKey: "student_id" });
Attendance.belongsTo(Student, { foreignKey: "student_id" });

Institute.hasMany(Attendance, { foreignKey: "institute_id" }); // ✅ fixed
Attendance.belongsTo(Institute, { foreignKey: "institute_id" });

module.exports = Attendance;
