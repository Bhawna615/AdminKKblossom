import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLogin from "./component/AdminLogin";
import Dashboard from "./component/Dashboard";
import TermsAndConditions from "./component/TermsAndConditions";
import StudentAdmission from "./StudentComponent/StudentAdmission";
import ViewStudent from "./StudentComponent/viewStudent";
import Report from "./StudentComponent/Report";
import SpecialReport from "./StudentComponent/SpecialReport";
import CustomReport from "./StudentComponent/CustomReport";
import ReportRouter from "./StudentComponent/ReportRouter";
import ReportCard from "./StudentComponent/ReportCard";
import ReportCardRouter from "./StudentComponent/ReportCardRouter"; 
import AttendanceDetails from "./StudentComponent/AttendanceDetails";
import GenerateTC from "./StudentComponent/GenerateTC";
import TransferCertificate from "./StudentComponent/TransferCertificate";
import EditTC from "./StudentComponent/EditTC";
import ViewTC from "./StudentComponent/ViewTC";
import CharacterCertificate from "./StudentComponent/CharacterCertificate"; 
import ViewCharacterCertificates from "./StudentComponent/ViewCharacterCertificates";
import OpenCharacterCertificate from "./StudentComponent/OpenCharacterCertificate";
import StudentTransportDetails from "./StudentComponent/StudentTransportDetails";
import StudentExamDetails from "./StudentComponent/StudentExamDetails";
import StudentFeeDetails from "./StudentComponent/StudentFeeDetails";
import StudentMessages from "./StudentComponent/StudentMessages"; 
import CreateCredentials from "./StudentComponent/CreateCredentials";
import ViewStudentProfile from "./StudentComponent/ViewStudentProfile";
import EditStudent from "./StudentComponent/EditStudent"; 
import CreateStudentPayment from "./StudentComponent/CreateStudentPayment";
import ViewPayment from "./StudentComponent/ViewPayments";
import UpdateStudentFee from "./StudentComponent/UpdateStudentFee";
import AcceptStudentFee from "./StudentComponent/AcceptStudentFee";
import ViewTransferredStudents from "./StudentComponent/ViewTransferredStudents";
import DisplayCharacterCertificates from "./StudentComponent/DisplayCharacterCertificates";
import DisplayLeaveRequests from "./StudentComponent/DisplayLeaveRequests";
import AddTeacher from "./TeacherComponent/AddTeacher";
import ViewTeachers from "./TeacherComponent/ViewTeachers";
import AddTeacherToFormer from "./TeacherComponent/AddTeacherToFormer";
import FormerTeachers from "./TeacherComponent/FormerTeachers";
import GenerateExperienceCertificate from "./TeacherComponent/GenerateExperienceCertificate";
import ExperienceCertificates from "./TeacherComponent/ExperienceCertificates";
import ExperienceCertificateView from "./TeacherComponent/ExperienceCertificateView";
function App() {
  return (
    <Router>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/terms" element={<TermsAndConditions />} />

        {/* Report Route */}
        <Route path="/StudentComponent/ReportCard/:id" element={<ReportCard />} />
         
        <Route path="/StudentComponent/report/:id" element={<Report />} />
  <Route path="/StudentComponent/SpecialReport/:id" element={<SpecialReport />} />
        <Route path="/StudentComponent/CustomReport/:id" element={<CustomReport />} />
<Route path="/StudentComponent/ReportRouter/:id" element={<ReportRouter />} />
<Route path="/StudentComponent/ReportCardRouter/:id" element={<ReportCardRouter />} />
<Route path="/StudentComponent/ViewTC/:id" element={<ViewTC />} />
 <Route path="/character-certificate/:id" element={<OpenCharacterCertificate />} />
 <Route path="/StudentComponent/View-Payments/:id" element={<ViewPayment />} />
 <Route path="/TeachrComponent/ExperienceCertificateView/:id" element={<ExperienceCertificateView/>}/>

        {/* Dashboard with nested routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="StudentComponent/StudentAdmission" element={<StudentAdmission />} />
          <Route path="StudentComponent/viewStudent" element={<ViewStudent />} />
          <Route path="StudentComponent/AttendenceDetails/:id" element={<AttendanceDetails/>}/>
          <Route path="StudentComponent/GenerateTC/:id" element={<GenerateTC />} />
          <Route path="StudentComponent/TransferCertificate" element={<TransferCertificate />} />
          <Route path="StudentComponent/EditTC/:id" element={<EditTC />} />
          <Route path="StudentComponent/CharacterCertificate/:id" element={<CharacterCertificate />} />
          <Route path="StudentComponent/ViewCharacterCertificates" element={<ViewCharacterCertificates />} />
          <Route path="StudentComponent/StudentTransportDetails/:id" element={<StudentTransportDetails />} />
        <Route path="StudentComponent/StudentExamDetails/:id" element={<StudentExamDetails />} />
        <Route path="StudentComponent/StudentFeeDetails/:id" element={<StudentFeeDetails />} />
        <Route path="StudentComponent/StudentMessages/:id" element={<StudentMessages />} />
        <Route path="StudentComponent/CreateCredentials/:id" element={<CreateCredentials />} />
        <Route path="StudentComponent/ViewStudentProfile/:studentId" element={<ViewStudentProfile />} />
        <Route path="StudentComponent/CreateStudentPayment/:studentId" element={<CreateStudentPayment />} />
        <Route path="StudentComponent/EditStudent/:studentId"element={<EditStudent />}/>
        <Route path="StudentComponent/UpdateStudentFee/:feeId" element={<UpdateStudentFee />} />
        <Route path="StudentComponent/AcceptStudentFee/:feeId" element={<AcceptStudentFee />} />
        <Route path="StudentComponent/ViewTransferredStudents"element={<ViewTransferredStudents />}/>
<Route path="StudentComponent/DisplayCharacterCertificates"element={<DisplayCharacterCertificates />}/>
<Route path="StudentComponent/DisplayLeaveRequests" element={<DisplayLeaveRequests />} />

<Route path="TeacherComponent/AddTeachers"element={<AddTeacher/>}/>
<Route path="TeacherComponent/ViewTeachers" element={<ViewTeachers/>}/>
<Route  path="TeacherComponent/AddTeacherToFormer/:id" element={<AddTeacherToFormer />} />
<Route path="TeacherComponent/FormerTeachers" element={<FormerTeachers/>}/>
<Route path="TeacherComponent/GenerateExperienceCertificate/:id" element={<GenerateExperienceCertificate/>}/>
<Route path="TeacherComponent/ExperienceCertificate"element={<ExperienceCertificates/>}/>
<Route path="TeacherComponent/create-credentials/:id" element={<CreateCredentials />} />
        </Route>
        

      </Routes>
    </Router>
  );
}

export default App;
