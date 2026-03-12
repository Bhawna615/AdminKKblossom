import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import "./StudentMetrics.css";

const MetricsAdd = () => {

  const BASE_URL =
    "http://localhost/kkblossom/api.php/Adminapi/AdminStudentMetrics";

  const { studentId } = useParams();

  const [student, setStudent] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [marks, setMarks] = useState({});
  const [message, setMessage] = useState("");

  // ===== LOAD DATA =====
  useEffect(() => {
    axios.get(`${BASE_URL}/addData/${studentId}`)
      .then(res => {
        setStudent(res.data.student);
        setMetrics(res.data.metrics);

        const m = {};
        res.data.metrics.forEach(item => {
          m[item.metric_id] = item.mark ?? "";
        });
        setMarks(m);
      })
      .catch(err => console.log(err));
  }, [studentId]);

  // ===== CHANGE MARK =====
  const handleChange = (id, value) => {
    setMarks(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // ===== SUBMIT =====
  const submit = () => {

    const payload = Object.keys(marks).map(id => ({
      metric_id: id,
      mark: marks[id]
    }));

    axios.post(`${BASE_URL}/mark`, {
      studentId: studentId,
      metrics: payload
    })
    .then(() => setMessage("Metrics saved successfully"))
    .catch(() => setMessage("Failed to save metrics"));
  };

  const columns = [
    { name: "ID", selector: row => row.metric_id },
    { name: "METRIC", selector: row => row.metric_name },
    { name: "ABILITY", selector: row => row.ability },
    {
      name: "MARK",
      cell: row => (
        <input
          type="text"
          value={marks[row.metric_id] || ""}
          onChange={e => handleChange(row.metric_id, e.target.value)}
        />
      )
    }
  ];

  return (
    <div className="innerview">

      {message && <div className="success-bar">{message}</div>}

      {student && (
        <>
          <p><b>Name:</b> {student.Name}</p>
          <p><b>Class:</b> {student.Class}</p>
          <p><b>Roll No:</b> {student.Rollno}</p>
        </>
      )}

      <DataTable
        columns={columns}
        data={metrics}
        pagination
      />

      <button className="form-submit" onClick={submit}>
        Submit
      </button>
    </div>
  );
};

export default MetricsAdd;
