import "./Header.css";
import skoolizerLogo from "../images/image.png";
import schoolLogo from "../images/school-logo.png";
import { useNavigate } from "react-router-dom";
const Header = () => {
const navigate = useNavigate();

  // Get admin info from localStorage
  const adminData = JSON.parse(localStorage.getItem("admin"));

  // Logout handler
  const handleLogout = async () => {
  try {
    const response = await fetch(
      "http://192.168.1.6/kkblossom/api.php/AdminAuth/signOut",
      {
        method: "GET",
        credentials: "include", // send PHP session cookies
        headers: {
          Accept: "application/json", // tell CI this is React
        },
      }
    );

    const data = await response.json();
    console.log("Logout response:", data);

    if (data.status === "success") {
      localStorage.removeItem("admin"); // clear React storage
      navigate("/"); // redirect to login
    }
  } catch (error) {
    console.error("Logout failed:", error);
  }
};


  return (
    <div className="layout">
      {/* ===== TOP HEADER ===== */}
      <div className="col-12 top-header">
        <div className="col-3 brand-logo top-left">
          <img src={skoolizerLogo} alt="Skoolizer" />
        </div>
<div className="col-9 header-right">
        <div className="top-center">
          <img src={schoolLogo} alt="School Logo" />
          <p className="school-name">KK BLOSSOMS SCHOOL</p>
        </div>

        <div className="top-right">
           <button
            className="icon-btn"
            onClick={handleLogout}
            title="Log Out"
            style={{ marginLeft: "10px", cursor: "pointer" }}
          >
            <i className="las la-door-open"></i>
          </button>
        </div>
      </div>
      </div>

      
    </div>
  );
};

export default Header;
