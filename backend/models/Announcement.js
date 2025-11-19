const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const Teacher = require("./Teacher");
const Institute = require("./institute");

const Announcement = sequelize.define(
  "Announcement",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    // Optional: link to a teacher who posted it
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "teachers",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },

    // Institute to which this announcement belongs
    institute_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "institutes",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    // Optional: start/end date
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    // Optional: status (active, inactive)
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      defaultValue: "Active",
    },
  },
  {
    timestamps: true,
    tableName: "announcements",
  }
);

// Associations
Teacher.hasMany(Announcement, { foreignKey: "teacher_id" });
Announcement.belongsTo(Teacher, { foreignKey: "teacher_id" });

Institute.hasMany(Announcement, { foreignKey: "institute_id" });
Announcement.belongsTo(Institute, { foreignKey: "institute_id" });

module.exports = Announcement;
