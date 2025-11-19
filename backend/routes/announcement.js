const express = require('express');
const router = express.Router();
const announcementController = require('../controller/announcementController');
const tokenVerify = require("../Middleware/token-verification");
const isTeacher = require("../Middleware/isTeacher");
const bothTeacherStudent = require("../Middleware/isTeacherorStudent"); // ✅ fixed import


router.post(
  '/announcement',
  tokenVerify,
  isTeacher,
  announcementController.createAnnouncement
);


router.get(
  '/allAnnouncement',
  tokenVerify,
  bothTeacherStudent,
  
  announcementController.getAnnouncements
);

module.exports = router;
