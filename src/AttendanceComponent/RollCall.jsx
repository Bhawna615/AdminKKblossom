import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { submitAttendance } from "../AttendanceComponent/attendanceApi";

export default function RollCall() {

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ SAFE DATA
  const students = location.state?.students || [];
  const className = location.state?.className || "";
  const date = location.state?.date || "";

  const [marks, setMarks] = useState(
    students.map(() => "Present")
  );

  const changeMark = (index, value) => {
    const updated = [...marks];
    updated[index] = value;
    setMarks(updated);
  };

  // ================= SUBMIT =================
  const submit = async () => {

    try {

      await submitAttendance({
        students,
        marks,
        class: className,
        date
      });

      // ✅ NAVIGATE WITH MESSAGE
      navigate("/dashboard/AttendanceComponent/ViewAttendance", {
        state: {
          message: "Attendance Marked Successfully ✅"
        }
      });

    } catch (err) {
      console.log(err);
      alert("Error while submitting");
    }
  };

  return (
    <div className="col-md-12" style={{ padding: 30 }}>

      <p className="headings">Date: {date}</p>
      <p className="headings">Class: {className}</p>

      <table className="table table-bordered">

        <thead className="dataTableHead">
          <tr>
            <th>Id</th>
            <th>Roll</th>
            <th>Name</th>
            <th>Mark</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s, i) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.Rollno}</td>
              <td>{s.Name}</td>

              <td>
                <select
                  className="form-select"
                  value={marks[i]}
                  onChange={(e) =>
                    changeMark(i, e.target.value)
                  }
                >
                  <option>Present</option>
                  <option>Absent</option>
                  <option>Leave</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      <button className="form-submit" onClick={submit}>
        Submit
      </button>

    </div>
  );
}