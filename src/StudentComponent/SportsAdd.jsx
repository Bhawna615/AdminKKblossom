import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SportsAdd.css";

const SportsAdd = () => {
    const navigate = useNavigate();
    const BASE_URL =
        "http://localhost/kkblossom/api.php/Adminapi/AdminStudentSports";

    const [form, setForm] = useState({
        name: "",
        date: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const submit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        axios.post(`${BASE_URL}/insert`, form)
            .then(res => {
                if (res.data.status) {
                    setSuccess("Event Added Successfully");
                    setTimeout(() => navigate("/dashboard/StudentComponent/StudentSports"), 1000);
                } else {
                    setError(res.data.message);
                }
            })
            .catch(() => setError("Failed to add event"));
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
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SportsAdd;
