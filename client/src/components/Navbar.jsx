import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBookOpen, FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const logout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Logout",
    });

    if (!result.isConfirmed) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out Successfully");

    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: "linear-gradient(90deg,#4f46e5,#2563eb)",
        padding: "15px 0",
        boxShadow: "0 5px 20px rgba(0,0,0,.2)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="container">

        <Link
          className="navbar-brand fw-bold fs-3 d-flex align-items-center"
          to="/"
        >
          <FaBookOpen className="me-2" />
          BookStore
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center">

            {/* Home */}
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/"
                    ? "fw-bold text-warning"
                    : ""
                }`}
                to="/"
              >
                Home
              </Link>
            </li>

            {!token ? (
              <>
                {/* Login */}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/login"
                        ? "fw-bold text-warning"
                        : ""
                    }`}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>

                {/* Register */}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/register"
                        ? "fw-bold text-warning"
                        : ""
                    }`}
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* Add Book */}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/add"
                        ? "fw-bold text-warning"
                        : ""
                    }`}
                    to="/add"
                  >
                    Add Book
                  </Link>
                </li>

                {/* Cart */}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/cart"
                        ? "fw-bold text-warning"
                        : ""
                    }`}
                    to="/cart"
                  >
                    <FaShoppingCart className="me-1" />
                    Cart
                  </Link>
                </li>

                {/* My Orders */}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/orders"
                        ? "fw-bold text-warning"
                        : ""
                    }`}
                    to="/orders"
                  >
                    📦 My Orders
                  </Link>
                </li>

                {/* User Name */}
                <li className="nav-item me-3 text-white fw-bold">
                  👋 {user?.name}
                </li>

                {/* Logout */}
                <li className="nav-item">
                  <button
                    onClick={logout}
                    className="btn btn-danger btn-sm"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;