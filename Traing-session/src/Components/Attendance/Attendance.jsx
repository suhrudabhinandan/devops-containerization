import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetStudentsQuery,
  useAddAttendanceMutation,
} from "../../Slice/attendanceSlice";
import "./Attendance.css";

const Attendance = () => {
 
  const teacher = useSelector((state) => state.auth.user);
  
  
  const instituteId = teacher?.instituteId;
  console.log(instituteId);
  

 
  const {
    data: students = [],
    isLoading,
    isError,
  } = useGetStudentsQuery(instituteId, {
    skip: !instituteId, 
  });

  const [addAttendance, { isLoading: isSaving }] = useAddAttendanceMutation();

  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );


  const handleCheckboxChange = (student_id) => {
    setAttendance((prev) => ({
      ...prev,
      [student_id]: prev[student_id] === "Present" ? "Absent" : "Present",
    }));
  };

  const handleSubmit = async () => {
    if (!students.length) return alert("No students found for your institute.");
    try {
      const attendanceData = Object.entries(attendance).map(
        ([student_id, status]) => ({
          student_id: parseInt(student_id),
          status,
          date: selectedDate,
          remarks: "",
        })
      );

      await addAttendance(attendanceData).unwrap();
      alert("Attendance submitted successfully!");
      setAttendance({});
    } catch (err) {
      console.error("❌ Error submitting attendance:", err);
      alert("Failed to submit attendance. Please try again.");
    }
  };

  return (
    <div className="attendance-table-container">
      <h2>Attendance Records</h2>

      
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Select Date:{" "}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </label>
      </div>

     
      {isLoading && <p>Loading students...</p>}
      {isError && (
        <p style={{ color: "red" }}>
          Failed to load students. Please check your connection or token.
        </p>
      )}


      {!isLoading && !isError && (
        <>
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => {
                  const status = attendance[student.student_id] || "Absent";
                  return (
                    <tr key={student.student_id}>
                      <td>{student.student_id}</td>
                      <td>{student.name}</td>
                      <td>
                        <label>
                          <input
                            type="checkbox"
                            checked={status === "Present"}
                            onChange={() =>
                              handleCheckboxChange(student.student_id)
                            }
                          />
                          {status}
                        </label>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    No students found for your institute.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <button
            onClick={handleSubmit}
            disabled={isSaving || students.length === 0}
            className="submit-btn"
            style={{ marginTop: "1rem" }}
          >
            {isSaving ? "Submitting..." : "Submit Attendance"}
          </button>
        </>
      )}
    </div>
  );
};

export default Attendance;
