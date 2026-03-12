import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import "./StudentSports.css";


const StudentSports = () => {
    const navigate = useNavigate();
    const BASE_URL =
        "http://localhost/kkblossom/api.php/Adminapi/AdminStudentSports";

    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/index`)
            .then(res => setEvents(res.data))
            .catch(err => console.log(err));
    }, []);

    const deleteEvent = (id) => {
        if (window.confirm("Are you sure ?")) {
            axios.delete(`${BASE_URL}/delete/${id}`)
                .then(() => {
                    setEvents(events.filter(e => e.id !== id));
                });
        }
    };

    const columns = [
        { name: "Id", selector: row => row.id, sortable: true },
        {
            name: "Name",
            cell: row => (
                <span
                    onClick={() => navigate(`/dashboard/StudentComponent/SportsParticipant/${row.id}`)}
                    style={{ color: "#007bff", textDecoration: "none", cursor: "pointer" }}
                >
                    {row.name}
                </span>
            )
        },
        {
            name: "Date",
            selector: row =>
                new Date(row.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                })
        },
        { name: "First", selector: row => row.first },
        { name: "Second", selector: row => row.second },
        { name: "Third", selector: row => row.third },
        {
            name: "Actions",
            cell: row => (
                <>
                    <i
                        className="las la-edit btn-icon"
                        title="Edit"
                        onClick={() => navigate(`/dashboard/StudentComponent/SportsEdit/${row.id}`)}
                    ></i>
                    <i
                        className="las la-trash btn-icon"
                        title="Delete"
                        onClick={() => deleteEvent(row.id)}
                    ></i>
                </>
            )
        }
    ];

    return (
        <div className="innerview">
            <div className="side-btn-bar">
                <div></div>
                <button
                    className="side-btn"
                    onClick={() => navigate("/dashboard/StudentComponent/SportsAdd")}
                >
                    <i className="material-icons btn-icon">add</i>
                    Add Sport Event
                </button>
            </div>

            <DataTable
                columns={columns}
                data={events}
                pagination
                responsive
            />
        </div>
    );
};

export default StudentSports;
