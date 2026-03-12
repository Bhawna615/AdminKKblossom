import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate, useLocation } from "react-router-dom";
import "./StudentMetrics.css";

const MetricsView = () => {
  const BASE_URL =
    "http://localhost/kkblossom/api.php/Adminapi/AdminStudentMetrics";

  const [metrics, setMetrics] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const loadMetrics = () => {
    axios.get(`${BASE_URL}/getMetrics`)
      .then(res => setMetrics(res.data));
  };

  useEffect(() => {
    loadMetrics();

    if (location.state?.success) {
      setMessage(location.state.success);

      // 🔹 message sirf ek baar
      window.history.replaceState({}, document.title);
    }
  }, []);

  const deleteMetric = (id) => {
    if (window.confirm("Are you sure?")) {
      axios.get(`${BASE_URL}/delete/${id}`)
        .then(() => {
          loadMetrics();
          setMessage("Metric deleted successfully");
        });
    }
  };

  const columns = [
    {
      name: <span className="dt-head">ID</span>,
      selector: row => row.metric_id,
      sortable: true
    },
    {
      name: <span className="dt-head">METRIC</span>,
      selector: row => row.metric_name
    },
    {
      name: <span className="dt-head">ABILITY</span>,
      selector: row => row.ability
    },
    {
      name: <span className="dt-head">CLASS</span>,
      selector: row => row.metric_class
    },
    {
      name: <span className="dt-head">ACTION</span>,
      cell: row => (
        <>
          <button
            className="dt-action-btn"
            onClick={() =>
              navigate(`/dashboard/StudentComponent/MetricEdit/${row.metric_id}`)
            }
          >
            <i className="las la-pen"></i>
          </button>
          <button
            className="dt-action-btn"
            onClick={() => deleteMetric(row.metric_id)}
          >
            <i className="las la-trash"></i>
          </button>
        </>
      )
    }
  ];

  return (
    <div className="innerview">

      {/* 🔹 SUCCESS MESSAGE */}
      {message && (
        <div className="success-bar">
          <i className="las la-check-square"></i> {message}
        </div>
      )}

      {/* 🔹 TOP BAR */}
      <div className="side-btn-bar">
        <button
          className="side-btn"
          onClick={() =>
            navigate("/dashboard/StudentComponent/MetricCreate")
          }
        >
          <p>
            <i className="las la-plus btn-icon"></i>
            Create
          </p>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={metrics}
        pagination
        striped
        highlightOnHover
      />
    </div>
  );
};

export default MetricsView;
