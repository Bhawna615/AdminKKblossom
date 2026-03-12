import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./StudentSports.css";

const BASE_URL =
  "http://localhost/kkblossom/api.php/Adminapi/AdminSportParticipant";

const SportParticipantAdd = () => {
  const { sportEventId } = useParams();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [classes, setClasses] = useState([]);
  const [filterClass, setFilterClass] = useState("");
  const [filterEnabled, setFilterEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Load classes
  useEffect(() => {
    axios.get(`${BASE_URL}/getClasses`)
      .then(res => setClasses(res.data));
  }, []);

  // 🔹 Fetch students
  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line
  }, [filterEnabled, filterClass, sportEventId]);

  const fetchStudents = () => {
    if (!sportEventId) return;

    setLoading(true);

    let url = `${BASE_URL}/views/${sportEventId}`;
    if (filterEnabled && filterClass) {
      url = `${BASE_URL}/filterStudent/${filterClass}/${sportEventId}`;
    }

    axios.get(url)
      .then(res => {
        const list = res.data.students || [];
        setStudents(list);
        setSelectedIds(list.map(s => s.id)); // default checked
      })
      .finally(() => setLoading(false));
  };

  const handleCheckbox = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!sportEventId || selectedIds.length === 0) return;

    axios.post(`${BASE_URL}/insert`, {
      ids: selectedIds,
      sport_id: sportEventId,
    })
    .then((res) => {
      navigate(
        `/dashboard/StudentComponent/SportsParticipant/${sportEventId}`,
        {
          state: {
            success: res.data.message || "Participants added successfully",
          },
        }
      );
    })
    .catch(() => {
      navigate(
        `/dashboard/StudentComponent/SportsParticipant/${sportEventId}`,
        {
          state: {
            error: "Failed to add participants. Please try again.",
          },
        }
      );
    });
  };

  return (
    <div className="col-md-12 innerview">

      {/* FILTER */}
      <div className="col-md-12 filter-bar">
        <p className="filter-enable">
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={filterEnabled}
            onChange={(e) => {
              setFilterEnabled(e.target.checked);
              if (!e.target.checked) setFilterClass("");
            }}
          /> Enable Filter
        </p>

        <div className="col-md-4">
          <p className="filter-title">
            <i className="las la-filter"></i> Class
          </p>
          <select
            className="filter"
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
          >
            <option value="">Select Class</option>
            {classes.map(c => (
              <option key={c.Classname} value={c.Classname}>
                {c.Classname}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* TABLE */}
      <form onSubmit={handleSubmit}>
        <div className="col-md-12">
          <table className="table table-bordered dataTableFull">
            <thead className="dataTableHead">
              <tr>
                <th></th>
                <th>Roll No.</th>
                <th>Name</th>
                <th>Class</th>
              </tr>
            </thead>

            <tbody className="dataTableBody">
              {students.map(s => (
                <tr key={s.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(s.id)}
                      onChange={() => handleCheckbox(s.id)}
                    />
                  </td>
                  <td>{s.Rollno}</td>
                  <td>{s.Name}</td>
                  <td>{s.Class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="float" type="submit">
          <i className="material-icons">send</i>
        </button>
      </form>
    </div>
  );
};

export default SportParticipantAdd;