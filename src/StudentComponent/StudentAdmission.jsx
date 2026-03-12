import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./StudentAdmission.css";

const StudentAdmission = () => {
  const [classes, setClasses] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    class: "",
    fname: "",
    mname: "",
    gname: "",
    contact: "",
    admno: "",
    smsno: "",
    rollno: "",
    gender: "m",
    height: "",
    weight: "",
    aadharno: "",
    dob: null,
    lastschool: "",
    email: "",
    address: "",
    date_of_admission: null,
    blood_group: "",
    image: null,
  });

  /* ===============================
     FETCH CLASSES (CI BACKEND)
  =============================== */
  useEffect(() => {
    axios
      .get("http://localhost/kkblossom/api.php/Adminapi/AdminStudent/classes")
      .then((res) => {
        setClasses(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error(err));
  }, []);

  /* ===============================
     HANDLE INPUT CHANGE
  =============================== */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  /* ===============================
     HANDLE SUBMIT (CI API)
  =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(
        key,
        form[key] instanceof Date
          ? form[key].toISOString().split("T")[0]
          : form[key]
      );
    });

    try {
      const res = await axios.post(
        "http://localhost/kkblossom/api.php/Adminapi/AdminStudent/enroll",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data?.status) {
        setSuccess(res.data.message);
      } else {
        setErrors(res.data?.errors || {});
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="innerview"style={{ margin: "0 10px" }}>
      {success && (
        <div className="col-12 success-bar">
          <i className="las la-check-square"></i> {success}
        </div>
      )}

      <div className="col-12 form-box">
        <div className="col-12 title-bar">
          <p style={{ padding: 10, margin: 0 }}>Student Admission</p>
        </div>

        <div className="col-11" style={{ padding: "30px" }}>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* COLUMN 1 */}
            <div className="col-md-4">
              <p className="details">Name</p>
              <input name="name" className="form-input" onChange={handleChange} />
              {errors.name && <div className="invalid-bar">{errors.name}</div>}

              <p className="details">Class</p>
              <select name="class" className="form-select" onChange={handleChange}>
                <option value="">Select Class</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.Classname}>
                    Class {c.Classname}
                  </option>
                ))}
              </select>

              <p className="details">Father's Name</p>
              <input name="fname" className="form-input" onChange={handleChange} />

              <p className="details">Mother's Name</p>
              <input name="mname" className="form-input" onChange={handleChange} />

              <p className="details">Student Image</p>
              <input type="file" name="image" className="form-input" onChange={handleChange} />

              <p className="details">Height</p>
              <input name="height" className="form-input" onChange={handleChange} />
            </div>

            {/* COLUMN 2 */}
            <div className="col-md-4">
              <p className="details">Guardian's Name</p>
              <input name="gname" className="form-input" onChange={handleChange} />

              <p className="details">Contact No.</p>
              <input name="contact" className="form-input" onChange={handleChange} />

              <p className="details">Admission No.</p>
              <input name="admno" className="form-input" onChange={handleChange} />

              <p className="details">SMS No.</p>
              <input name="smsno" className="form-input" onChange={handleChange} />

              <p className="details">Roll No</p>
              <input name="rollno" className="form-input" onChange={handleChange} />

              <p className="details">Gender</p>
              <select name="gender" className="form-select" onChange={handleChange}>
                <option value="m">Male</option>
                <option value="f">Female</option>
              </select>

              <p className="details">Weight</p>
              <input name="weight" className="form-input" onChange={handleChange} />
            </div>

            {/* COLUMN 3 */}
            <div className="col-md-4">
              <p className="details">Aadhar No.</p>
              <input name="aadharno" className="form-input" onChange={handleChange} />

              <p className="details">Date of Birth</p>
              <DatePicker
                className="form-input"
                dateFormat="dd-MM-yyyy"
                selected={form.dob}
                onChange={(date) => setForm((p) => ({ ...p, dob: date }))}
              />

              <p className="details">Last School</p>
              <input name="lastschool" className="form-input" onChange={handleChange} />

              <p className="details">Email</p>
              <input name="email" className="form-input" onChange={handleChange} />

              <p className="details">Address</p>
              <input name="address" className="form-input" onChange={handleChange} />

              <p className="details">Date of Admission</p>
              <DatePicker
                className="form-input"
                dateFormat="dd-MM-yyyy"
                selected={form.date_of_admission}
                onChange={(date) =>
                  setForm((p) => ({ ...p, date_of_admission: date }))
                }
              />

              <p className="details">Blood Group</p>
              <input name="blood_group" className="form-input" onChange={handleChange} />
            </div>

            <div className="col-md-12" align="center" style={{ margin: 20 }}>
              <input type="submit" value="Admit" className="form-submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentAdmission;
