import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StudentMetrics.css";

const MetricCreate = () => {
  const navigate = useNavigate();

  const BASE_URL =
    "http://localhost/kkblossom/api.php/Adminapi/AdminStudentMetrics";

  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    ability: "",
    class: ""
  });

  // 🔹 GET CLASSES
  useEffect(() => {
    axios.get(`${BASE_URL}/getClasses`)
      .then(res => setClasses(res.data));
  }, []);

  // 🔹 SUBMIT
  const submit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("ability", form.ability);
    fd.append("class", form.class);

    axios.post(`${BASE_URL}/insert`, fd)
      .then(res => {
        if (res.data.status) {
          navigate(
            "/dashboard/StudentComponent/MetricsView",
            { state: { success: "Metric created successfully" } }
          );
        } else {
          alert("Failed to create");
        }
      });
  };

  return (
    <div className="innerview">
      <form onSubmit={submit}>
        <div className="col-md-4">

          <p className="details">Metric</p>
          <input
            type="text"
            className="form-input"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />

          <p className="details">Ability</p>
          <textarea
            className="message-input-box"
            value={form.ability}
            onChange={e => setForm({ ...form, ability: e.target.value })}
            required
          />

          <p className="details">Class</p>
          <select
            className="form-select"
            value={form.class}
            onChange={e => setForm({ ...form, class: e.target.value })}
            required
          >
            <option value="">Select Class</option>
            {classes.map((c, i) => (
              <option key={i} value={c.Classname}>
                {c.Classname}
              </option>
            ))}
          </select>

          <button className="form-submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default MetricCreate;
