import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetStudentsQuery } from "../../Slice/attendanceSlice";
import { useCreateResultMutation } from "../../Slice/resultSlice";
import "./Result.css";

const Result = () => {
  const teacher = useSelector((state) => state.auth.user);
  const instituteId = teacher?.instituteId;

  const { data: students = [], isLoading, isError } = useGetStudentsQuery(
    instituteId,
    {
      skip: !instituteId,
    }
  );

  const [createResult, { isLoading: isCreating }] = useCreateResultMutation();

  const [formData, setFormData] = useState({
    studentId: "",
    examName: "",
    totalMarks: "",
    subject1: "",
    subject2: "",
    subject3: "",
    subject4: "",
    subject5: "",
    subject6: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.studentId || !formData.examName || !formData.totalMarks) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      // Pass the data object directly to createResult
      const resultData = {
        studentId: Number(formData.studentId),
        examName: formData.examName,
        totalMarks: Number(formData.totalMarks),
        subject1: Number(formData.subject1) || 0,
        subject2: Number(formData.subject2) || 0,
        subject3: Number(formData.subject3) || 0,
        subject4: Number(formData.subject4) || 0,
        subject5: Number(formData.subject5) || 0,
        subject6: Number(formData.subject6) || 0,
      };

      await createResult(resultData).unwrap();

      alert("Result Created Successfully!");

      // Reset form
      setFormData({
        studentId: "",
        examName: "",
        totalMarks: "",
        subject1: "",
        subject2: "",
        subject3: "",
        subject4: "",
        subject5: "",
        subject6: "",
      });
    } catch (error) {
      console.error("Error creating result:", error);
      alert(error?.data?.error || "Failed to create result!");
    }
  };

  return (
    <div className="result-container">
      <h2>Add Student Result</h2>

      {isLoading && <p>Loading students...</p>}
      {isError && <p className="error-msg">Failed to load students.</p>}

      {!isLoading && !isError && (
        <form onSubmit={handleSubmit} className="result-form">
          {/* Student Dropdown */}
          <div className="form-group">
            <label htmlFor="studentId">Select Student *</label>
            <select
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Student --</option>
              {students.map((s) => (
                <option key={s.student_id} value={s.student_id}>
                  {s.student_id} - {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Exam Name */}
          <div className="form-group">
            <label htmlFor="examName">Exam Name *</label>
            <input
              type="text"
              id="examName"
              name="examName"
              placeholder="Enter Exam Name"
              value={formData.examName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Total Marks */}
          <div className="form-group">
            <label htmlFor="totalMarks">Total Marks *</label>
            <input
              type="number"
              id="totalMarks"
              name="totalMarks"
              placeholder="Enter Total Marks"
              value={formData.totalMarks}
              onChange={handleChange}
              required
            />
          </div>

          <h4>Subject Marks</h4>

          <div className="subjects-grid">
            {["subject1", "subject2", "subject3", "subject4", "subject5", "subject6"].map(
              (sub, index) => (
                <div className="form-group" key={sub}>
                  <label htmlFor={sub}>Subject {index + 1}</label>
                  <input
                    type="number"
                    id={sub}
                    name={sub}
                    placeholder="Marks"
                    value={formData[sub]}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
              )
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={isCreating}>
            {isCreating ? "Submitting..." : "Submit Result"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Result;