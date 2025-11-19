import React, { useState } from "react";
import { useGetAttendanceByStudentIdQuery } from "../../Slice/Api-Slice/attendanceApiSlice";
import { jwtDecode } from "jwt-decode";
import "./Attendance.css";

const Attendance = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const token = localStorage.getItem("studentToken");
  let studentId = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      studentId = decoded.id || decoded.student_id;
  
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }


  const {
    data: attendanceData = [],
    isLoading,
    isError,
  } = useGetAttendanceByStudentIdQuery(studentId, {
    skip: !studentId,
  });

  const changeMonth = (e) => {
    const newMonth = Number(e.target.value) - 1;
    const newDate = new Date(currentDate);
    newDate.setMonth(newMonth);
    setCurrentDate(newDate);
  };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const getStatus = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const record = attendanceData.find((a) => a.date.startsWith(dateStr));
    if (!record) return "None";
    return record.status?.toLowerCase() === "present" ? "Present" : "Absent";
  };

  return (
    <div className="attendance-container">
      <h2>
        Student Attendance - {monthName} {year}
      </h2>

      
      <label htmlFor="monthSelect" className="month-label">
        Select Month:
      </label>
      <select
        id="monthSelect"
        name="monthSelect"
        value={month + 1}
        onChange={changeMonth}
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
          <option key={m} value={m}>
            {new Date(0, m - 1).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>

     
      {isLoading ? (
        <p>Loading attendance...</p>
      ) : isError ? (
        <p style={{ color: "red" }}>Error loading attendance.</p>
      ) : (
        <div className="calendar-grid">
          
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="weekday-label">
              {day}
            </div>
          ))}
          {[...Array(firstDayIndex)].map((_, i) => (
            <div key={`empty-${i}`} className="calendar-day empty"></div>
          ))}

          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const status = getStatus(day);
            return (
              <div
                key={day}
                className={`calendar-day ${
                  status === "Present"
                    ? "present"
                    : status === "Absent"
                    ? "absent"
                    : "none"
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
      )}

      <div className="legend">
        <div>
          <span className="legend-box present"></span> Present
        </div>
        <div>
          <span className="legend-box absent"></span> Absent
        </div>
        <div>
          <span className="legend-box none"></span> No Record
        </div>
      </div>
    </div>
  );
};

export default Attendance;
