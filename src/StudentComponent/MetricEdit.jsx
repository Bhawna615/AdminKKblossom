import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./StudentMetrics.css";

const MetricEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const BASE_URL =
    "http://localhost/kkblossom/api.php/Adminapi/AdminStudentMetrics";

  const [metric, setMetric] = useState({
    metric_name: "",
    ability: ""
  });

  // 🔹 GET DATA BY ID
  useEffect(() => {
    axios
      .get(`${BASE_URL}/getById/${id}`)
      .then(res => {
        setMetric({
          metric_name: res.data.metric_name,
          ability: res.data.ability
        });
      })
      .catch(err => console.log(err));
  }, [id]);

  // 🔹 UPDATE DATA
  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("metric_id", id);
    formData.append("metric_name", metric.metric_name);
    formData.append("ability", metric.ability);

    axios
      .post(`${BASE_URL}/update`, formData)
      .then(res => {
        if (res.data.status === true) {
          navigate("/dashboard/StudentComponent/MetricsView");
        } else {
          alert("Update failed");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="innerview">
      <form onSubmit={submit}>
        <p>Metric</p>
        <input
          type="text"
          value={metric.metric_name}
          onChange={(e) =>
            setMetric({ ...metric, metric_name: e.target.value })
          }
          required
        />

        <p>Ability</p>
        <input
          type="text"
          value={metric.ability}
          onChange={(e) =>
            setMetric({ ...metric, ability: e.target.value })
          }
          required
        />

        <button type="submit" className="form-submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default MetricEdit;
