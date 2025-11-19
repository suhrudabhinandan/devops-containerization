// index.js
const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors');

// Import sequelize instance from your db file (assuming it exports the sequelize object)
const sequelize = require('./db/db');

const InstistueRouter = require('./routes/institutes');
const StaffRouter = require('./routes/staff');
const studentLogin = require('./routes/userLogin');
const studentRouter = require('./routes/student');
const StudentAttendanceRouter = require('./routes/studentAttendance');
const TeacherRouter = require('./routes/teacher');
const AnnouncementRouter = require("./routes/announcement");

// Use PORT fallback for local development
const PORT = process.env.PORT || 3000;

// CORS - tighten in production by setting FRONTEND_URL environment variable
const corsOrigin = process.env.FRONTEND_URL || "*";
app.use(cors({
  origin: corsOrigin,
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/Institute", InstistueRouter);
app.use("/api/Staff", StaffRouter);
app.use("/api/Student", studentRouter);
app.use("/api/User", studentLogin);
app.use("/api/Teacher", TeacherRouter);
app.use("/api/Attendance", StudentAttendanceRouter);
app.use("/api/Announcement", AnnouncementRouter);
app.use("/api/Result", require("./routes/result"));

// Simple health check for Render / monitoring
app.get('/api/health', (req, res) => res.json({ ok: true, time: Date.now() }));

// Sync DB and start server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Tables synced!');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('DB sync failed:', err);
    process.exit(1); // fail fast so the host notices
  });
