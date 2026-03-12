import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentPromote.css";


const StudentPromote = () => {
  const BASE_URL = "http://localhost/kkblossom/api.php/Adminapi/AdminStudentPromote";

  const [classes, setClasses] = useState([]);
  const [fromClass, setFromClass] = useState("");
  const [toClass, setToClass] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [checkAll, setCheckAll] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  // 🔹 Load Classes
  useEffect(() => {
    axios.get(`${BASE_URL}/getAllClassesDetails`)
      .then(res => {
        setClasses(res.data);
        if (res.data.length > 0) {
          setFromClass(res.data[0].Classname);
          setToClass(res.data[0].Classname);
        }
      });
  }, []);

  // 🔹 Load Students by Class
  useEffect(() => {
    if (fromClass) {
      axios.get(`${BASE_URL}/getByClassJSON/${fromClass}`)
        .then(res => {
          setStudents(res.data);
          const ids = res.data.map(s => s.id);
          setSelectedIds(ids);
          setCheckAll(true);
        });
    }
  }, [fromClass]);

  // 🔹 Checkbox handlers
  const handleCheckAll = () => {
    if (checkAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(students.map(s => s.id));
    }
    setCheckAll(!checkAll);
  };

  const handleSingleCheck = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
      setCheckAll(false);
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // 🔹 Promote Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedIds.length === 0) {
      setMessage({ type: "error", text: "Please select at least one student" });
      return;
    }

    const formData = new FormData();
    formData.append("toClass", toClass);
    selectedIds.forEach(id => formData.append("ids[]", id));

    axios.post(`${BASE_URL}/updateClass`, formData)
      .then(res => {
        setMessage({ type: "success", text: "Promotion Successful" });
      })
      .catch(() => {
        setMessage({ type: "error", text: "Failed to Promote" });
      });
  };

  return (
    <div className="innerview">

      {/* 🔔 Messages */}
      <div className="col-md-12 message">
        {message.type === "error" && (
          <div className="col-md-12 error-bar">
            <i className="las la-exclamation-triangle"></i> {message.text}
          </div>
        )}
        {message.type === "success" && (
          <div className="col-md-12 success-bar">
            <i className="las la-check-square"></i> {message.text}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <p>Class</p>
            <select
              id="change-class"
              value={fromClass}
              onChange={(e) => setFromClass(e.target.value)}
            >
              {classes.map(cls => (
                <option key={cls.id} value={cls.Classname}>
                  {cls.Classname}
                </option>
              ))}
            </select>
          </label>

          <label>
            <p>To</p>
            <select value={toClass} onChange={(e) => setToClass(e.target.value)}>
              {classes.map(cls => (
                <option key={cls.id} value={cls.Classname}>
                  {cls.Classname}
                </option>
              ))}
              <option value="passed_out">Passed Out</option>
            </select>
          </label>
        </div>

        <table className="table table-responsive">
          <thead className="dataTableHead">
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={checkAll}
                  onChange={handleCheckAll}
                />
              </th>
              <th>Id</th>
              <th>Name</th>
              <th>Class</th>
              <th>Roll No</th>
              <th>Admission No.</th>
            </tr>
          </thead>

          <tbody className="dataTableBody">
            {students.map(stu => (
              <tr key={stu.id}>
                <td>
                  <input
                    type="checkbox"
                    className="check-id"
                    checked={selectedIds.includes(stu.id)}
                    onChange={() => handleSingleCheck(stu.id)}
                  />
                </td>
                <td>{stu.id}</td>
                <td>{stu.Name}</td>
                <td>{stu.Class}</td>
                <td>{stu.Rollno}</td>
                <td>{stu.Admno}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="col-md-12 side-btn-bar">
          <div className="col-md-8"></div>
          <div className="col-md-4" align="right">
            <button className="side-btn" type="submit">
              <p>
                <i className="las la-redo btn-icon"></i> Promote
              </p>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StudentPromote;
