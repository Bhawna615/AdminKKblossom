import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLogin from "./component/AdminLogin";
import Dashboard from "./component/Dashboard";
import TermsAndConditions from "./component/TermsAndConditions";
import StudentAdmission from "./StudentComponent/StudentAdmission";
import ViewStudent from "./StudentComponent/viewStudent";
function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/terms" element={<TermsAndConditions />} />

        {/* Dashboard with nested routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="students/admission" element={<StudentAdmission />} />
           <Route path="students/view-student" element={<ViewStudent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
