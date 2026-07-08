import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import "../styles/BookDetails.css";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const res = await API.get(`/books/${id}`);
      setBook(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      await API.post("/cart", {
        bookId: book._id,
      });

      toast.success("Book Added To Cart");

      await Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Book added to your cart.",
        confirmButtonColor: "#2563eb",
      });

      navigate("/cart");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add book");
    }
  };

  if (!book) {
    return <h2 style={{ padding: "40px" }}>Loading...</h2>;
  }

  return (
    <div className="details-page">
      <div className="details-card">

        <img
          src={
            book.image ||
            "https://via.placeholder.com/300x420?text=No+Image"
          }
          alt={book.title}
        />

        <div className="details-info">

          <span className="category">
            {book.category}
          </span>

          <h1>{book.title}</h1>

          <h3>Author : {book.author}</h3>

          <div className="rating">
            ⭐⭐⭐⭐⭐
            <span style={{ color: "#666" }}> (4.9)</span>
          </div>

          <h2>₹{book.price}</h2>

          <p>{book.description}</p>

          <button
            className="cart-btn"
            onClick={addToCart}
          >
            🛒 Add To Cart
          </button>

        </div>

      </div>
    </div>
  );
}

export default BookDetails;