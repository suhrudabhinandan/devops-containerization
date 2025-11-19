const Student = require("../models/Student");
const bcrypt = require("bcrypt");
const { sequelize } = require("../models/Student");

// ✅ Add a new student
exports.addStudents = async (req, res) => {
  try {
    const { name, password, institute_id, contactNumber, course } = req.body;

    if (!password) {
      return res.status(400).json({ msg: "Password is required" });
    }

    const existingStudent = await Student.findOne({ where: { name } });
    if (existingStudent) {
      return res.status(400).json({
        msg: "Student already exists",
        existingStudent,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

 
    const count = await Student.count();
    if (count === 0) {
      await sequelize.query(
        `ALTER TABLE ${Student.getTableName()} AUTO_INCREMENT = 1;`
      );
      console.log(`AUTO_INCREMENT reset for ${Student.getTableName()}`);
    }

    const newStudent = await Student.create({
      name,
      password: hashedPassword,
      institute_id,
      contactNumber,
      course,
    });

    res.status(201).json({
      msg: "Student created successfully ✅",
      newStudent,
    });
  } catch (error) {
    console.error("❌ Student Creation Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.getAllStudents = async (req, res) => {
  try {
    const { instituteId } = req.query; 

    const filter = instituteId ? { where: { institute_id: instituteId } } : {};

    const students = await Student.findAll(filter);

    res.status(200).json(students);
  } catch (error) {
    console.error("❌ Error fetching students:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
