import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#eef4ff",
        padding: "20px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          background: "#fff",
          padding: "50px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,.1)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "90px",
            color: "#2563eb",
            marginBottom: "10px",
          }}
        >
          404
        </h1>

        <h2>Page Not Found</h2>

        <p style={{ color: "#666", margin: "20px 0" }}>
          Sorry, the page you are looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="btn btn-primary"
          style={{
            padding: "10px 25px",
            borderRadius: "10px",
          }}
        >
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;