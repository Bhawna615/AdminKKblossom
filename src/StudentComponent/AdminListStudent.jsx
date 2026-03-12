import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminListStudent.css";
import { useNavigate } from "react-router-dom";

const AdminListStudent = () => {
    const [classes, setClasses] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [fields, setFields] = useState({});
    const [selectAll, setSelectAll] = useState(false);
    const [admnoStart, setAdmnoStart] = useState("");
    const [admnoEnd, setAdmnoEnd] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost/kkblossom/api.php/Adminapi/AdminStudent/classes")
            .then((res) => setClasses(res.data));
    }, []);

    const handleSelectAll = () => {
        if (!selectAll) {
            setSelectedClasses(classes.map((c) => c.Classname));
        } else {
            setSelectedClasses([]);
        }
        setSelectAll(!selectAll);
    };

    const handleClassChange = (classname) => {
        setSelectedClasses((prev) =>
            prev.includes(classname)
                ? prev.filter((c) => c !== classname)
                : [...prev, classname]
        );
    };

    const handleFieldChange = (e) => {
        setFields({ ...fields, [e.target.name]: e.target.checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            classes: selectedClasses,
            fields,
            admno_start: admnoStart,
            admno_end: admnoEnd,
        };

        axios
            .post(
                "http://localhost/kkblossom/api.php/Adminapi/AdminStudent/listCreate",
                payload
            )
            .then((res) => {
        navigate("/StudentListView", {
          state: res.data.data,
        });
      });
    };

    return (
        <div className="col-md-12 innerview">
            <form onSubmit={handleSubmit}>
                {/* Select Classes */}
                <div className="col-md-12 filter-bar">
                    <p className="details">Select Classes</p>

                    <p className="select-all">
                        <input type="checkbox" onChange={handleSelectAll} />
                        Select All
                    </p>
                    <div className="checkbox-row">
                        {classes.map((cls, index) => (
                            <label key={index} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={selectedClasses.includes(cls.Classname)}
                                    onChange={() => handleClassChange(cls.Classname)}
                                />
                                {cls.Classname}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Select Columns */}
                <div className="col-md-12 filter-bar">
                    <p className="details">Select Columns</p>
                    <p className="by-default">Name is by default</p>
                    <div className="checkbox-row">
                        {[
                            { name: "field_roll_no", label: "Roll No." },
                            { name: "field_fname", label: "Father's Name" },
                            { name: "field_mname", label: "Mother's Name" },
                            { name: "field_contact", label: "Contact" },
                            { name: "field_admno", label: "Admission Number" },
                            { name: "field_address", label: "Address" },
                            { name: "field_aadhar", label: "Aadhar Number" },
                            { name: "field_dob", label: "Date of Birth" },
                            { name: "field_qrcode", label: "Qr Code" },
                            { name: "field_admission_date", label: "Admission Date" },
                            { name: "field_gender", label: "Gender" },
                            { name: "field_image", label: "Image" },
                        ].map((field, i) => (
                            <label key={i} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    name={field.name}
                                    onChange={handleFieldChange}
                                />
                                {field.label}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Admission Range */}
                <div className="col-md-12 filter-bar">
                    <p className="details">Admission Number Range</p>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="From"
                        value={admnoStart}
                        onChange={(e) => setAdmnoStart(e.target.value)}
                    />
                    <input
                        type="text"
                        className="form-input"
                        placeholder="To"
                        value={admnoEnd}
                        onChange={(e) => setAdmnoEnd(e.target.value)}
                    />
                </div>

                <button type="submit" className="form-submit">
                    Create
                </button>
            </form>
        </div>
    );
};

export default AdminListStudent;
