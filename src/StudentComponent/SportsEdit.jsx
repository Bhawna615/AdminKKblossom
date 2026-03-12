import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./StudentSports.css";

const SportsEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const BASE_URL = "http://localhost/kkblossom/api.php/Adminapi/AdminStudentSports";

    const [form, setForm] = useState({
        name: "",
        date: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ===== Load existing event =====
    useEffect(() => {
        axios.get(`${BASE_URL}/one/${id}`)
            .then(res => {
                if (res.data) {
                    setForm({
                        name: res.data.name || "",
                        date: res.data.date || ""
                    });
                } else {
                    setError("Event not found");
                }
            })
            .catch(() => setError("Failed to load event"));
    }, [id]);

    // ===== Handle Input Change =====
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // ===== Submit Update =====
    const submit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        axios.post(`${BASE_URL}/update`, { id, ...form })
            .then(res => {
                if (res.data.status) {
                    setSuccess("Event Updated Successfully");
                    setTimeout(() => navigate("/dashboard/StudentComponent/StudentSports"), 1000);
                } else {
                    setError(res.data.message || "Failed to update event");
                }
            })
            .catch(() => setError("Failed to update event"));
    };

    return (
        <div className="col-md-12 innerview">
            {error && (
                <div className="col-md-12 error-bar">
                    <i className="las la-exclamation-triangle"></i> {error}
                </div>
            )}

            {success && (
                <div className="col-md-12 success-bar">
                    <i className="las la-check-square"></i> {success}
                </div>
            )}

            <form onSubmit={submit}>
                <div className="gap">
                    <div className="col-md-4">
                        <p className="details">Name</p>
                        <input
                            type="text"
                            className="form-input"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-4">
                        <p className="details">Date</p>
                        <input
                            type="date"
                            className="form-input"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="col-md-12">
                    <button type="submit" className="form-submit">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SportsEdit;
