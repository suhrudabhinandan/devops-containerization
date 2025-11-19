const express = require('express');
const router = express.Router();
const studentsController = require('../controller/Student-login-controller');



router.post("/Login", studentsController.LoginController);
module.exports = router;