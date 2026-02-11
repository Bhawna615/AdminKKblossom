import React, { useEffect, useState } from "react";
import axios from "axios";
import "./viewStudent.css";

const API_BASE = "http://192.168.1.6/kkblossom/api.php";

const ViewStudent = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [filterEnabled, setFilterEnabled] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  /* ===============================
     Load classes + students
  =============================== */
  useEffect(() => {
    fetchClasses();
    fetchStudents();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await axios.get(`${API_BASE}/AdminStudent/classes`);
      setClasses(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStudents = async () => {
  try {
    const res = await axios.get(`${API_BASE}/AdminStudent/viewMany`);

    if (res.data?.status && Array.isArray(res.data.data)) {
      const normalized = res.data.data.map(s => ({
        id: s.id,
        name: s.Name,
        className: s.Class,
        rollNo: s.Rollno,
        admissionNo: s.Admno,
        admissionDate: s.admission_date
      }));

      setStudents(normalized);
    } else {
      setStudents([]);
    }
  } catch (err) {
    setError("Failed to load students");
    setStudents([]);
  }
};


  const filterStudents = async (className) => {
  try {
    const res = await axios.get(
      `${API_BASE}/AdminStudent/filter/${className}`
    );

    if (res.data?.status && Array.isArray(res.data.data)) {
      const normalized = res.data.data.map(s => ({
        id: s.id,
        name: s.Name,
        className: s.Class,
        rollNo: s.Rollno,
        admissionNo: s.Admno,
        admissionDate: s.admission_date
      }));

      setStudents(normalized);
    } else {
      setStudents([]);
    }
  } catch (err) {
    setError("Filter failed");
    setStudents([]);
  }
};



  /* ===============================
     Handlers
  =============================== */
  const handleClassChange = (e) => {
    const value = e.target.value;
    setSelectedClass(value);

    if (filterEnabled) {
      filterStudents(value);
    }
  };

  const handleFilterToggle = (e) => {
    const checked = e.target.checked;
    setFilterEnabled(checked);

    if (checked && selectedClass) {
      filterStudents(selectedClass);
    } else {
      fetchStudents();
    }
  };

  /* ===============================
     JSX
  =============================== */
  return (
    <div className="col-12 innerview">
      {/* ================= Messages ================= */}
      <div className="message">
        {error && (
          <div className="col-12 error-bar">
            <i className="las la-exclamation-triangle"></i> {error}
          </div>
        )}

        {success && (
          <div className="col-md-12 success-bar">
            <i className="las la-check-square"></i> {success}
          </div>
        )}

        {password && (
          <div className="col-md-12 success-bar">
            <i className="las la-check-square"></i>
            {" Kindly note down the password: " + password}
          </div>
        )}
      </div>

      {/* ================= Filter ================= */}
      <div className="col-11 filter-bar">
        <p className="filter-enable">
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={filterEnabled}
            onChange={handleFilterToggle}
          />{" "}
          Enable Filter
        </p>

        <div className="col-4"style={{ paddingLeft: "20px" }}>
          <p className="filter-title"style={{ marginBottom: "10px" }}>
            <i className="las la-filter"></i> Class
             </p>
             <select
            className="filter"
            value={selectedClass}
            onChange={handleClassChange}
          >
            <option value="">Select Class</option>
            {classes.map((cls, index) => (
              <option key={index} value={cls.Classname}>
                {cls.Classname}
              </option>
            ))}
          </select>
         
         
        </div>
      </div>

      {/* ================= Table ================= */}
      <table className="table table-bordered table-responsive">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Roll No</th>
            <th>Name</th>
            <th>Class</th>
            
            <th>Admission No</th>
            <th>Admission Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 && (
            <tr>
              <td colSpan="11" style={{ textAlign: "center" }}>
                No records found
              </td>
            </tr>
          )}

        {students.map((s) => (
  <tr key={s.id}>
    <td>{s.id}</td>
    <td>{s.rollNo}</td>
    <td>{s.name}</td>
    <td>{s.className}</td>
    
    <td>{s.admissionNo}</td>
    <td>{s.admissionDate}</td>
    <td>
      <form
        method="POST"
        action={`${API_BASE}/student/openCharacterCertificate`}
      >
        <input type="hidden" name="id" value={s.id} />
        <button type="submit" className="dt-action-btn">
          <i className="las la-eye"></i>
        </button>
      </form>
    </td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
};

export default ViewStudent;
