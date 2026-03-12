import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "./StudentMetrics.css";
import { useNavigate } from "react-router-dom";

const StudentMetrics = () => {

    const BASE_URL = "http://localhost/kkblossom/api.php/Adminapi/AdminStudentMetrics";

    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [filterEnabled, setFilterEnabled] = useState(false);

    const navigate = useNavigate();

    // ===== LOAD CLASSES =====
    useEffect(() => {
        axios.get(`${BASE_URL}/getAllClasses`)
            .then(res => setClasses(res.data))
            .catch(() => setClasses([]));
    }, []);

    // ===== LOAD STUDENTS =====
    useEffect(() => {
        if (filterEnabled && selectedClass) {
            axios.get(`${BASE_URL}/filter/${selectedClass}`)
                .then(res => setStudents(res.data))
                .catch(() => setStudents([]));
        } else {
            axios.get(`${BASE_URL}/display`)
                .then(res => setStudents(res.data))
                .catch(() => setStudents([]));
        }
    }, [filterEnabled, selectedClass]);

    // ===== DATATABLE COLUMNS =====
    const columns = [
        {
            name: <span className="dt-head">ID</span>,
            selector: row => row.id,
            sortable: true,
        },
        {
            name: <span className="dt-head">NAME</span>,
            selector: row => row.Name,
            sortable: true,
        },
        {
            name: <span className="dt-head">CLASS</span>,
            selector: row => row.Class,
            sortable: true,
        },
        {
            name: <span className="dt-head">ROLL NO</span>,
            selector: row => row.Rollno,
            sortable: true,
        },
        {
            name: <span className="dt-head">METRICS</span>,
            cell: row => (
                <button
                    className="dt-action-btn"
                    onClick={() => 
                        navigate(`/dashboard/StudentComponent/MetricsAdd/${row.id}`)

                    }
                >
                    <i className="las la-pen btn-icon"></i>
                </button>
            ),
        },
    ];

    return (
        <div className="col-md-12 innerview">

            {/* ===== FILTER BAR ===== */}
            <div className="col-md-12 filter-bar">
                <p className="filter-enable">
                    <input
                        type="checkbox"
                        className="custom-checkbox"
                        checked={filterEnabled}
                        onChange={() => setFilterEnabled(!filterEnabled)}
                    /> Enable Filter
                </p>

                <div className="col-md-4">
                    <p className="filter-title">
                        <i className="las la-filter"></i> Class
                    </p>
                    <select
                        className="filter"
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                    >
                        <option value="">Select Class</option>
                        {classes.map((cls, i) => (
                            <option key={i} value={cls.Classname}>
                                {cls.Classname}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-12">
                    <button
                        className="form-submit"
                        style={{ float: "right" }}
                        onClick={() => navigate("/dashboard/StudentComponent/MetricsView")}
                    >
                        View Metrics
                    </button>
                </div>
            </div>

            {/* ===== DATATABLE ===== */}
            <DataTable
                columns={columns}
                data={students}
                pagination
                highlightOnHover
                responsive
                striped
            />

        </div>
    );
};

export default StudentMetrics;
