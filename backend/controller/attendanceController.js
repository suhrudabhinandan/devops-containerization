const Attendance = require("../models/attendance");
const Student = require("../models/Student");
const sequelize = require("../db/db");


exports.markAttendance = async (req, res) => {
  try {
    const attendanceData = req.body; 
    const date = attendanceData.length > 0 ? attendanceData[0].date : req.query.date;

    if (!date) {
      return res.status(400).json({ error: "Date is required" });
    }

    
    const instituteId = req.user?.instituteId;
    if (!instituteId) {
      return res.status(400).json({ error: "Teacher's instituteId not found" });
    }

  
    const allStudents = await Student.findAll({
      where: { institute_id: instituteId }, 
      attributes: ["student_id"],
      order: [["student_id", "ASC"]],
    });

    // Map provided data for quick lookup
    const providedMap = new Map(
      attendanceData.map((item) => [item.student_id, item.status])
    );

   
    const formattedData = allStudents.map((student) => ({
      student_id: student.student_id,
      date,
      status: providedMap.get(student.student_id) || "Absent",
      institute_id: instituteId, 
    }));

    // console.log("Data to upsert in order:", formattedData);


    await Attendance.bulkCreate(formattedData, {
      updateOnDuplicate: ["status", "updatedAt"],
    });

    res.json({
      success: true,
      message: "Attendance recorded successfully for all students",
      count: formattedData.length,
    });
  } catch (err) {
    
    res.status(500).json({ error: err.message });
  }
};





// Get attendance for a student (with Student info)
exports.getStudentAttendanceById = async (req, res) => {
  try {
    const records = await Attendance.findAll({
      where: { student_id: req.params.id },
      include: [
        {
          model: Student,
          attributes: ["student_id", "name"],
          required: true,
        },
      ],
      order: [["date", "DESC"]],
    });

    const formatted = records.map((r) => ({
      studentId: r.student_id,
      studentName: r.Student.name,
      date: r.date,
      status: r.status,
      remarks: r.remarks || "",
    }));

    res.json(formatted);
  } catch (err) {  // ✅ Use err here
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// Get all attendance records (all students)
exports.getAllAttendance = async (req, res) => {
    try {
        const records = await Attendance.findAll({
            include: [
                {
                    model: Student,
                    attributes: ["student_id", "name"],
                },
            ],
            order: [["date", "DESC"]],
        });

        const formatted = records.map((r) => ({
            studentId: r.student_id,
            studentName: r.Student.name,
            date: r.date,
            status: r.status,
            remarks: r.remarks || "",
        }));

        res.json(formatted);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

