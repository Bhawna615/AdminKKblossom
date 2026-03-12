import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./StudentSports.css";

const SportsParticipants = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sportEventId } = useParams();

  const BASE_URL =
    "http://localhost/kkblossom/api.php/Adminapi/AdminSportParticipant";

  const [participants, setParticipants] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ READ SUCCESS / ERROR MESSAGE FROM NAVIGATE STATE
  useEffect(() => {
    if (location.state?.success) {
      setSuccessMsg(location.state.success);
      setErrorMsg("");
    }

    if (location.state?.error) {
      setErrorMsg(location.state.error);
      setSuccessMsg("");
    }

    if (location.state?.success || location.state?.error) {
      setTimeout(() => {
        setSuccessMsg("");
        setErrorMsg("");
        navigate(location.pathname, { replace: true });
      }, 3000);
    }
  }, [location, navigate]);

  // 🔹 FETCH PARTICIPANTS
  useEffect(() => {
    if (!sportEventId) return;

    axios
      .get(`${BASE_URL}/view/${sportEventId}`)
      .then((res) => setParticipants(res.data || []))
      .catch(() => {
        setErrorMsg("Failed to load participants");
      });
  }, [sportEventId]);

  // 🔹 DELETE PARTICIPANT
  const deleteParticipant = (id) => {
    if (!window.confirm("Are you sure ?")) return;

    axios
      .delete(`${BASE_URL}/delete/${id}/${sportEventId}`)
      .then(() => {
        setParticipants((prev) => prev.filter((p) => p.id !== id));
        setSuccessMsg("Participant deleted successfully");
      })
      .catch(() => {
        setErrorMsg("Failed to delete participant");
      });
  };

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    {
      name: "Name",
      cell: (row) => (
        <span
          style={{
            color: "#007bff",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() =>
            navigate(
              `/dashboard/StudentComponent/StudentView/${row.student_id}`
            )
          }
        >
          {row.name}
        </span>
      ),
    },
    { name: "Class", selector: (row) => row.class },
    { name: "Roll No", selector: (row) => row.rollno },
    { name: "Created At", selector: (row) => row.created_at },
    {
      name: "Actions",
      cell: (row) => (
        <i
          className="las la-trash btn-icon"
          title="Delete"
          style={{ cursor: "pointer", color: "red" }}
          onClick={() => deleteParticipant(row.id)}
        ></i>
      ),
    },
  ];

  return (
    <div className="innerview">

      {/* ✅ SUCCESS MESSAGE */}
      {successMsg && (
        <div className="msg-box success-msg">
          <i className="las la-check-circle"></i>
          <span>{successMsg}</span>
        </div>
      )}

      {/* ❌ ERROR MESSAGE */}
      {errorMsg && (
        <div className="msg-box error-msg">
          <i className="las la-times-circle"></i>
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="side-btn-bar">
        <div></div>
        <button
          className="side-btn"
          onClick={() =>
            navigate(
              `/dashboard/StudentComponent/SportParticipantAdd/${sportEventId}`
            )
          }
        >
          <i className="material-icons btn-icon">add</i>
          Add Participants
        </button>
      </div>

      <DataTable
        columns={columns}
        data={participants}
        pagination
        responsive
        noDataComponent="No participants found"
      />
    </div>
  );
};

export default SportsParticipants;