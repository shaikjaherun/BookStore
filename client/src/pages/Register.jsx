import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import {
  FaBookOpen,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import "../styles/Register.css";
import loginImage from "../assets/login.png";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        name: user.name,
        email: user.email,
        password: user.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Registration Successful");

      await Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Account Created Successfully",
        confirmButtonColor: "#2563eb",
      });

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <div className="register-left">

          <img src={loginImage} alt="Register" />

          <h2>
            <FaBookOpen /> BookStore
          </h2>

          <p>
            Join thousands of readers and discover your next
            favourite book.
          </p>

        </div>

        <div className="register-right">

          <h1>Create Account 🚀</h1>

          <p>Start your BookStore journey today.</p>

          <form onSubmit={registerUser}>

            <div className="input-box">
              <FaUser />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={user.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <FaEnvelope />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <FaLock />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
                required
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

            </div>

            <div className="input-box">

              <FaLock />

              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={user.confirmPassword}
                onChange={handleChange}
                required
              />

              <span
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>

            </div>

            <button className="register-btn">
              Create Account
            </button>

          </form>

          <p className="login-link">
            Already have an account?

            <Link to="/login">
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;