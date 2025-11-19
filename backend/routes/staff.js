const express = require('express');
const router = express.Router();
const staffController = require('../controller/Staff-controller');
const tokenVerification = require('../Middleware/token-verification');
const isAdmin = require('../Middleware/isAdmin');



router.post('/staffLogin',staffController.staffLogin);


router.post('/addStaff', tokenVerification, isAdmin, staffController.addStaff);

module.exports = router;