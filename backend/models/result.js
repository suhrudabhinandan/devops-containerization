const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const Student = require('./Student');

const Result = sequelize.define("Result", {

  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  examName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // ⭐ Total marks of entire exam (example: 600)
  totalMarks: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  // ⭐ Six subjects (obtained marks only)
  subject1: { type: DataTypes.INTEGER, defaultValue: 0 },
  subject2: { type: DataTypes.INTEGER, defaultValue: 0 },
  subject3: { type: DataTypes.INTEGER, defaultValue: 0 },
  subject4: { type: DataTypes.INTEGER, defaultValue: 0 },
  subject5: { type: DataTypes.INTEGER, defaultValue: 0 },
  subject6: { type: DataTypes.INTEGER, defaultValue: 0 },

  totalObtained: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },


  percentage: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },

  status: {
    type: DataTypes.ENUM("PASS", "FAIL"),
    defaultValue: "PASS",
  },
},
{
  tableName: "results",
  timestamps: true,
});

// ⭐ Auto-calc hook
Result.beforeSave((result) => {

  // Sum of 6 subjects
  const obtained =
    (result.subject1 || 0) +
    (result.subject2 || 0) +
    (result.subject3 || 0) +
    (result.subject4 || 0) +
    (result.subject5 || 0) +
    (result.subject6 || 0);

  result.totalObtained = obtained;
 

  result.percentage =
    result.totalMarks > 0 ? (obtained / result.totalMarks) * 100 : 0;

  result.status = result.percentage >= 33 ? "PASS" : "FAIL";
});

// 🔗 Associations
Result.belongsTo(Student, {
  foreignKey: "studentId",
  targetKey: "student_id",
});

Student.hasMany(Result, {
  foreignKey: "studentId",
  sourceKey: "student_id",
  onDelete: "CASCADE",
});

module.exports = Result;
