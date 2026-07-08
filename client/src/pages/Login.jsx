import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import {
  FaBookOpen,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import "../styles/Login.css";
import loginImage from "../assets/login.png";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", user);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Successful");

      await Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "Login Successful",
        confirmButtonColor: "#2563eb",
      });

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-left">

          <img src={loginImage} alt="Login" />

          <h2>
            <FaBookOpen /> BookStore
          </h2>

          <p>
            Discover thousands of books with a modern
            MERN BookStore experience.
          </p>

        </div>

        <div className="login-right">

          <h1>Welcome Back 👋</h1>

          <p>Please login to continue</p>

          <form onSubmit={loginUser}>

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
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </span>

            </div>

            <button className="login-btn">
              Login
            </button>

          </form>

          <p className="register-link">
            Don't have an account?

            <Link to="/register">
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;