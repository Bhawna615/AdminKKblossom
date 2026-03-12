import React, { useEffect, useState } from "react";
import { getClasses, getRollCall } from "../AttendanceComponent/attendanceApi";
import { useNavigate } from "react-router-dom";

export default function MarkAttendance() {

    const [classes, setClasses] = useState([]);
    const [date, setDate] = useState("");
    const [className, setClassName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getClasses().then(res => {
            setClasses(res.data);

            if (res.data.length > 0) {
                setClassName(res.data[0].Classname);
            }
        });

        const today = new Date().toISOString().split("T")[0];
        setDate(today);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await getRollCall({
                class: className,
                date: date
            });

            console.log("API RESPONSE:", res.data);

            // ✅ STOP if backend sends error
            if (res.data.error) {
                alert(res.data.error);
                return;
            }

            navigate("/dashboard/AttendanceComponent/RollCall", {
                state: res.data
            });

        } catch (err) {
            console.log(err);
            alert("Server error");
        }
    };

    return (
        <div className="col-md-12 innerview">

            <form onSubmit={handleSubmit}>
                <div className="col-md-4">

                    <p className="headings">Select a Date</p>

                    <input
                        type="date"
                        className="form-input"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <p className="headings">Select a Class</p>

                    <select
                        className="form-select"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                    >
                        {classes.map((c, i) => (
                            <option key={i} value={c.Classname}>
                                Class {c.Classname}
                            </option>
                        ))}
                    </select>

                </div>

                <div className="col-md-12" style={{ marginTop: "40px" }}>
                    <button className="form-submit">Mark</button>
                </div>

            </form>
        </div>
    );
}