import React, { useState } from "react";
import { useGetResultsByStudentQuery } from "../../Slice/Api-Slice/resultApiSlice";
import "./Result.css";

const StudentResults = () => {
  const [studentId, setStudentId] = useState("");
  const [searchId, setSearchId] = useState(null);

  const {
    data: results = [],
    isLoading,
    isError,
    error,
  } = useGetResultsByStudentQuery(searchId, {
    skip: !searchId, // Don't fetch until we have a searchId
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (studentId.trim()) {
      setSearchId(studentId.trim());
    }
  };

  const handleReset = () => {
    setStudentId("");
    setSearchId(null);
  };

  const calculatePercentage = (result) => {
    const totalObtained =
      (result.subject1 || 0) +
      (result.subject2 || 0) +
      (result.subject3 || 0) +
      (result.subject4 || 0) +
      (result.subject5 || 0) +
      (result.subject6 || 0);

    return result.totalMarks > 0
      ? ((totalObtained / result.totalMarks) * 100).toFixed(2)
      : 0;
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: "A+", color: "#10b981" };
    if (percentage >= 80) return { grade: "A", color: "#3b82f6" };
    if (percentage >= 70) return { grade: "B+", color: "#8b5cf6" };
    if (percentage >= 60) return { grade: "B", color: "#f59e0b" };
    if (percentage >= 50) return { grade: "C", color: "#f97316" };
    if (percentage >= 40) return { grade: "D", color: "#ef4444" };
    return { grade: "F", color: "#dc2626" };
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Student Results</h2>
        <p className="subtitle">Search for student results by ID</p>
      </div>

      {/* Search Form */}
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <input
              type="text"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <span>Search</span>
            </button>
          </div>
        </form>

        {searchId && (
          <button onClick={handleReset} className="reset-btn">
            Clear Search
          </button>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading results for Student ID: {searchId}...</p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <p className="error-msg">
            {error?.data?.error || "Failed to load results. Please try again."}
          </p>
        </div>
      )}

      {/* No Results State */}
      {!isLoading && !isError && searchId && results.length === 0 && (
        <div className="no-results-state">
          <div className="no-results-icon">📋</div>
          <h3>No Results Found</h3>
          <p>No results available for Student ID: {searchId}</p>
        </div>
      )}

      {/* Results Display */}
      {!isLoading && !isError && results.length > 0 && (
        <div className="results-content">
          <div className="student-info">
            <h3>Results for Student ID: {searchId}</h3>
            <span className="results-count">{results.length} Exam(s) Found</span>
          </div>

          <div className="results-grid">
            {results.map((result) => {
              const percentage = calculatePercentage(result);
              const { grade, color } = getGrade(percentage);
              const totalObtained =
                (result.subject1 || 0) +
                (result.subject2 || 0) +
                (result.subject3 || 0) +
                (result.subject4 || 0) +
                (result.subject5 || 0) +
                (result.subject6 || 0);

              return (
                <div key={result.id} className="result-card">
                  <div className="result-header">
                    <div className="exam-info">
                      <h3>{result.examName}</h3>
                      <span className="exam-date">
                        {result.createdAt
                          ? new Date(result.createdAt).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                    <div
                      className="grade-badge"
                      style={{ background: color }}
                    >
                      {grade}
                    </div>
                  </div>

                  <div className="result-summary">
                    <div className="summary-item">
                      <span className="label">Total Obtained</span>
                      <span className="value">
                        {totalObtained} / {result.totalMarks}
                      </span>
                    </div>
                    <div className="summary-item">
                      <span className="label">Percentage</span>
                      <span className="value percentage">{percentage}%</span>
                    </div>
                  </div>

                  <div className="subjects-breakdown">
                    <h4>Subject-wise Performance</h4>
                    <div className="subjects-list">
                      {[1, 2, 3, 4, 5, 6].map((num) => {
                        const subjectKey = `subject${num}`;
                        const marks = result[subjectKey];
                        if (marks !== null && marks !== undefined && marks > 0) {
                          return (
                            <div key={num} className="subject-item">
                              <span className="subject-name">Subject {num}</span>
                              <div className="subject-score">
                                <span className="subject-marks">{marks}</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Initial State - No search yet */}
      {!searchId && (
        <div className="initial-state">
          <div className="initial-icon">🔍</div>
          <h3>Search for Student Results</h3>
          <p>Enter a student ID above to view their academic results</p>
        </div>
      )}
    </div>
  );
};

export default StudentResults;