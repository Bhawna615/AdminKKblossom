import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import logo from "../images/image.png";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.password.trim()) {
      setMessage("Username and password required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost/kkblossom/api.php/Adminapi/AdminAuth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username.trim(),
            password: formData.password.trim(),
          }),
        }
      );

      const text = await response.text();

      // Avoid JSON parsing errors
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid JSON returned from server: " + text);
      }

      console.log("📡 API Response:", data);

      if (data.status === "success") {
        localStorage.setItem("admin", JSON.stringify(data.data));
        navigate("/dashboard");
      } else {
        setMessage(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <img src={logo} alt="Logo" className="logo" onClick={() => navigate("/")} />
      <div className="login-card">
        <p className="login-title">Admin Login</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {message && <div className="invalid-bar">{message}</div>}
          <button type="submit" disabled={loading} className="LogIn-btn">
            {loading ? "Signing In..." : "Log In"}
          </button>
        </form>
      </div>
      <p className="terms">
        By Signing in you agree to our{" "}
        <span style={{ color: "#2995bf", cursor: "pointer" }} onClick={() => navigate("/terms")}>
          Terms and Conditions
        </span>
      </p>
      <p className="footer">© MacMer Web Solutions {new Date().getFullYear()}</p>
    </div>
  );
};

export default AdminLogin;
