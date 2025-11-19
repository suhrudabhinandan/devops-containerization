// routes/attendanceRoutes.js
const express = require("express");
const router = express.Router();
const tokenVerify = require("../Middleware/token-verification");
const isTeacher = require("../Middleware/isTeacher");
const attendanceController = require("../controller/attendanceController");


router.use(tokenVerify);



router.post("/markAttendance", isTeacher, attendanceController.markAttendance);


router.get("/student/:id", attendanceController.getStudentAttendanceById);


router.get("/all", isTeacher, attendanceController.getAllAttendance);

module.exports = router;
