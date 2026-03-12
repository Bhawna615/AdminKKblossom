import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./StudentListView.css";
import schoolLogo from "../images/school-logo.png"; // ✅ local react image

const StudentListView = () => {
    const location = useLocation();
    const state = location.state || {};
    const students = state.students || {};
    const fields = state.fields || {};

    // 👇 school details ab yahin se ayengi
    const school = {
        name: "KK Blossoms School",
        address: "Rabaun, Solan (H.P)",
    };

       useEffect(() => {
    if (state.students) {
        setTimeout(() => {
            window.print();
        }, 500);
    }
}, [state.students]);

    if (!state.students) return null;

 


    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toLocaleDateString("en-GB");
    };

    const exportCSV = () => {
        let csv = [];
        const rows = document.querySelectorAll("table tr");

        rows.forEach((row) => {
            const cols = row.querySelectorAll("td, th");
            let rowData = [];
            cols.forEach((col) => rowData.push(col.innerText));
            csv.push(rowData.join(","));
        });

        const blob = new Blob([csv.join("\n")], { type: "text/csv" });
        const link = document.createElement("a");
        link.download = "students.csv";
        link.href = window.URL.createObjectURL(blob);
        link.click();
    };

    return (
        <div className="print-container">
            {/* SCHOOL HEADER */}
            <div className="school-name-container">
                <img
                    src={schoolLogo}          // ✅ react local image
                    className="school-logo"
                    alt="School Logo"
                />
                <p className="school-name">{school.name}</p>
                <p className="school-address">{school.address}</p>
            </div>

            {Object.keys(students).map((cls, index) => (
                <div key={index} className="class-block">
                    <p className="class-title">{cls}</p>

                    <table className="student-table">
                        <thead>
                            <tr>
                                {fields.field_roll_no && <th>Roll No.</th>}
                                {fields.field_admission_date && <th>Admission Date</th>}
                                {fields.field_admno && <th>Admission No.</th>}
                                {fields.field_address && <th>Address</th>}
                                {fields.field_dob && <th>Date of Birth</th>}
                                <th>Name</th>
                                {fields.field_fname && <th>Father's Name</th>}
                                {fields.field_mname && <th>Mother's Name</th>}
                                {fields.field_gender && <th>M/F</th>}
                                {fields.field_contact && <th>Contact</th>}
                                {fields.field_aadhar && <th>Aadhar No.</th>}
                                {fields.field_qrcode && <th>QR Code</th>}
                                {fields.field_image && <th>Image</th>}
                            </tr>
                        </thead>

                        <tbody>
                            {students[cls].map((stu, i) => (
                                <tr key={i}>
                                    {fields.field_roll_no && <td>{stu.Rollno}</td>}
                                    {fields.field_admission_date && (
                                        <td>{formatDate(stu.admission_date)}</td>
                                    )}
                                    {fields.field_admno && <td>{stu.Admno}</td>}
                                    {fields.field_address && <td>{stu.Address}</td>}
                                    {fields.field_dob && <td>{formatDate(stu.Dob)}</td>}
                                    <td>{stu.Name}</td>
                                    {fields.field_fname && <td>{stu.Fname}</td>}
                                    {fields.field_mname && <td>{stu.Mname}</td>}
                                    {fields.field_gender && <td>{stu.gender}</td>}
                                    {fields.field_contact && <td>{stu.Contact}</td>}
                                    {fields.field_aadhar && <td>{stu.Aadharno}</td>}
                                    {fields.field_qrcode && (
                                        <td>
                                            <img
                                                src={`http://localhost/kkblossom/assets/images/students/qrcode/${stu.qrcode}.png`}
                                                className="icon"
                                                alt="qr"
                                            />
                                        </td>
                                    )}
                                    {fields.field_image && (
                                        <td>
                                            <img
                                                src={`http://localhost/kkblossom/assets/images/students/${stu.image}`}
                                                className="icon"
                                                alt="student"
                                            />
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}

            <button className="export-btn" onClick={exportCSV}>
                Export to CSV
            </button>
        </div>
    );
};

export default StudentListView;
