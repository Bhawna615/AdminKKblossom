import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { submitAttendance } from "../AttendanceComponent/attendanceApi";

export default function EditAttendance() {

  const { state } = useLocation();
  const navigate = useNavigate();

  const students = state?.students || [];
  const absentees = state?.absentees || [];

  // ✅ MARK STATE
  const [marks, setMarks] = useState(() =>
    students.map(s => {
      const found = absentees.find(a => a.Rollno === s.Rollno);

      if (!found) return "Present";
      if (found.onLeave == 1) return "Leave";
      return "Absent";
    })
  );

  // ✅ CHANGE MARK
  const changeMark = (index, value) => {
    const updated = [...marks];
    updated[index] = value;
    setMarks(updated);
  };

  // ✅ SUBMIT (PHP FORM SAME LOGIC)
  const handleSubmit = async () => {

    try {

      const payload = {
        class: state.className,
        date: state.date,
        students: students,
        marks: marks
      };

      await submitAttendance(payload);

      alert("Attendance Updated Successfully ✅");

      navigate("/dashboard/AttendanceComponent/ViewAttendance", {
        state: { success: "Attendance Updated Successfully" }
      });

    } catch (err) {
      console.log(err);
      alert("Error updating attendance");
    }
  };

  return (
    <div style={{ padding: 30 }}>

      <h3>Date: {state.date}</h3>
      <h3>Class: {state.className}</h3>

      <table className="table table-bordered">

        <thead className="dataTableHead">
          <tr>
            <th>Id</th>
            <th>Roll No</th>
            <th>Name</th>
            <th>Mark</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td>{s.id}</td>
              <td>{s.Rollno}</td>
              <td>{s.Name}</td>

              <td>
                <select
                  value={marks[i]}
                  onChange={(e) =>
                    changeMark(i, e.target.value)
                  }
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Leave">Leave</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      <button
        className="form-submit"
        onClick={handleSubmit}
      >
        Submit
      </button>

    </div>
  );
}