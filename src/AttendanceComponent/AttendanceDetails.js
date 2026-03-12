import React from "react";
import { useLocation } from "react-router-dom";

export default function AttendanceDetails() {

  const { state } = useLocation();
  const { students, details, className, date } = state;

  const getMark = (roll) => {

    let mark = "Present";

    details.forEach(d => {
      if (d.Rollno === roll) {
        mark = d.onLeave == 1 ? "On Leave" : "Absent";
      }
    });

    return mark;
  };

  // ===== CSV EXPORT =====
  const exportCSV = () => {

    let csv = "Rollno,Name,Mark\n";

    students.forEach(s => {
      csv += `${s.Rollno},${s.Name},${getMark(s.Rollno)}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance.csv";
    a.click();
  };

  return (
    <div className="col-md-12" style={{ padding: 30 }}>

      <h3>Class: {className}</h3>
      <h4>Date: {date}</h4>

      <table className="table table-bordered">

        <thead className="dataTableHead">
          <tr>
            <th>Rollno</th>
            <th>Name</th>
            <th>Mark</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td>{s.Rollno}</td>
              <td>{s.Name}</td>
              <td>{getMark(s.Rollno)}</td>
            </tr>
          ))}
        </tbody>

      </table>

      <button className="form-submit" onClick={exportCSV}>
        Export to CSV
      </button>

    </div>
  );
}