const express = require('express');
router = express.Router();
const TeacherController = require('../controller/Teacher-controller');

router.post('/teacherSignup', TeacherController.teacherSignUp);
router.post('/teacherLogin', TeacherController.teacherLogin);

module.exports = router;
