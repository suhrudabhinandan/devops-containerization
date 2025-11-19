const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
require('./db/db');
const sequelize = require('./db/db');
const InstistueRouter = require('./routes/institutes');
const StaffRouter = require('./routes/staff');
const studentLogin = require('./routes/userLogin');  
const studentRouter = require('./routes/student');
const StudentAttendanceRouter = require('./routes/studentAttendance');
const TeacherRouter = require('./routes/teacher');
const AnnouncementRouter = require("./routes/announcement");

const cors = require('cors');

app.use(cors({
  origin: "*", 
  credentials: true,
}));



app.use(express.json());
// app.use("/api", studentLogin)
app.use("/api/Institute", InstistueRouter);
app.use("/api/Staff", StaffRouter);
app.use("/api/Student", studentRouter);
app.use("/api/User", studentLogin);
app.use("/api/Teacher", TeacherRouter);
app.use("/api/Attendance", StudentAttendanceRouter);
app.use("/api/Announcement", AnnouncementRouter);
app.use("/api/Result", require("./routes/result"));

sequelize.sync({ alter: true })
  .then(() => console.log('✅ Tables synced!'))
  .catch(err => console.error(err));


app.listen(PORT, () =>{
    console.log(`app is ruuning on port http://localhost:${PORT}`);
    
})