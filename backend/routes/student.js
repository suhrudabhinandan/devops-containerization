const express = require('express');
const router = express.Router();


const studentsController = require('../controller/student-controller');


//Addstudents
router.post("/addStudents", studentsController.addStudents);


//Get all students
router.get("/getAllStudents", studentsController.getAllStudents);





module.exports = router;