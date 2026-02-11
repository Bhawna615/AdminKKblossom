import React from "react";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const location = useLocation();

  const isDashboardHome = location.pathname === "/dashboard";

  const data = {
    students: 120,
    passedOut: 30,
    teachers: 15,
    classes: 10,
    employees: 8,
    activeRoutes: 5,
    absentStudents: 4,
    employeeAbsent: 2,
    examsToday: 3,
    birthdaysToday: 1,
    feePending: 18,
    leaveRequests: 6,
  };

  const Card = ({ link, bgColor, icon, title, count }) => (
    <a href={link} className="card-link">
      <div className="cardview">
        <div className="card-icon" style={{ background: bgColor }}>
          <i className={`las ${icon}`}></i>
        </div>
        <div className="card-content">
          <p className="card-title">{title}</p>
          <p className="card-count">{count}</p>
        </div>
      </div>
    </a>
  );

  return (
    <>
      <Header />

      {/* ===== BODY ROW ===== */}
      <div className="row main-layout">
        {/* ===== SIDEBAR ===== */}
        <div className="col-3">
          <Sidebar />
        </div>

        {/* ===== CONTENT ===== */}
        <div className="col-7 content-area">
          <div className="col-11 dashboard">

            {/* DASHBOARD CARDS (default view) */}
            {isDashboardHome && (
              <>
                <Card link="/student/viewMany" bgColor="#FFAE10" icon="la-graduation-cap" title="STUDENTS" count={data.students} />
                <Card link="/student/passedout" bgColor="#FFAE10" icon="la-graduation-cap" title="PASSED OUT STUDENTS" count={data.passedOut} />
                <Card link="/teacher/view" bgColor="#2C56BB" icon="la-chalkboard-teacher" title="TEACHERS" count={data.teachers} />
                <Card link="/class/classes" bgColor="#797979" icon="la-users" title="CLASSES" count={data.classes} />
                <Card link="/employee/view" bgColor="#FFAE10" icon="la-user-tie" title="EMPLOYEES" count={data.employees} />
                <Card link="/route/activeroutes" bgColor="#2C56BB" icon="la-bus-alt" title="ROUTES ACTIVE" count={data.activeRoutes} />
                <Card link="/sms/absenttemplate" bgColor="#797979" icon="la-exclamation-triangle" title="STUDENTS ABSENT" count={data.absentStudents} />
                <Card link="/employee/viewattendance" bgColor="#FFAE10" icon="la-exclamation-triangle" title="EMPLOYEES ABSENT" count={data.employeeAbsent} />
                <Card link="/exam/selectClass" bgColor="#2C56BB" icon="la-tachometer-alt" title="EXAMS TODAY" count={data.examsToday} />
                <Card link="/sms/birthdaytemplate" bgColor="#797979" icon="la-gift" title="BIRTHDAYS TODAY" count={data.birthdaysToday} />
                <Card link="/fee/selectPendingPaymentsPeriod" bgColor="#FFAE10" icon="la-rupee-sign" title="FEE PENDING" count={data.feePending} />
                <Card link="/student/viewLeaveRequests" bgColor="#2995bf" icon="la-exclamation-triangle" title="LEAVE REQUESTS" count={data.leaveRequests} />
              </>
            )}

            
          </div>
          {/* NESTED ROUTES (Student Admission etc.) */}
            {!isDashboardHome && <Outlet />}

        </div>
      </div>
    </>
  );
};

export default Dashboard;
