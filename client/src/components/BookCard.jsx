import { Link } from "react-router-dom";
import API from "../services/api";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function BookCard({ book, fetchBooks }) {
  const deleteBook = async () => {
    const result = await Swal.fire({
      title: "Delete Book?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await API.delete(`/books/${book._id}`);

      toast.success("🗑 Book Deleted Successfully");

      fetchBooks();
    } catch (error) {
      console.log(error);
      toast.error("❌ Failed to Delete Book");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "25px",
        background: "#ffffff",
        borderRadius: "20px",
        padding: "22px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
        transition: "0.3s",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow =
          "0 18px 35px rgba(0,0,0,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 10px 30px rgba(0,0,0,0.12)";
      }}
    >
      {/* Book Image */}

        <Link to={`/book/${book._id}`}>
        <img
          src={
            book.image ||
            "https://via.placeholder.com/170x240?text=No+Image"
          }
          alt={book.title}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/170x240?text=No+Image";
          }}
          style={{
            width: "170px",
            height: "240px",
            objectFit: "cover",
            borderRadius: "12px",
            boxShadow: "0 8px 18px rgba(0,0,0,0.25)",
            flexShrink: 0,
            cursor: "pointer",
          }}
        />
        </Link>

      {/* Book Details */}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Link
          to={`/book/${book._id}`}
          style={{
            textDecoration: "none",
          }}
        >
      <h2
        style={{
          fontSize: "34px",
          color: "#1e293b",
          marginBottom: "12px",
          cursor: "pointer",
        }}
      >
        {book.title}
      </h2>
    </Link>
          <p
            style={{
              fontSize: "18px",
              marginBottom: "12px",
            }}
          >
            <strong>Author:</strong> {book.author}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "18px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                background: "#2563eb",
                color: "#fff",
                padding: "6px 15px",
                borderRadius: "30px",
                fontSize: "14px",
              }}
            >
              {book.category}
            </span>

            <span
              style={{
                background: "#dcfce7",
                color: "#15803d",
                padding: "6px 14px",
                borderRadius: "30px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              📦 In Stock
            </span>
          </div>

          <div
            style={{
              color: "#f59e0b",
              fontSize: "18px",
              marginBottom: "15px",
            }}
          >
            ⭐⭐⭐⭐⭐ <span style={{ color: "#666" }}>(4.9)</span>
          </div>

          <h2
            style={{
              color: "#16a34a",
              fontSize: "38px",
              margin: "15px 0",
            }}
          >
            ₹{book.price}
          </h2>

          <p
            style={{
              color: "#555",
              lineHeight: "1.8",
              fontSize: "17px",
              marginBottom: "25px",
            }}
          >
            {book.description}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
          }}
        >
          <Link to={`/edit/${book._id}`}>
            <button
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "12px 26px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 6px 15px rgba(37,99,235,.3)",
                transition: ".3s",
              }}
            >
              ✏ Edit
            </button>
          </Link>

          <button
            onClick={deleteBook}
              style={{
                background: "#ef4444",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "12px 26px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 6px 15px rgba(239,68,68,.3)",
                transition: ".3s",
              }}
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;