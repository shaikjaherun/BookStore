 import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/AddBook.css";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


function AddBook() {
  const navigate = useNavigate();
  
      useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        navigate("/login");
      }
    }, [navigate]);

  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const addBook = async (e) => {
    e.preventDefault();

    try {
      await API.post("/books", book);

toast.success("Book Added Successfully!");

await Swal.fire({
  icon: "success",
  title: "Success!",
  text: "Book added successfully.",
  confirmButtonColor: "#2563eb",
});

navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Add Book");

Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Failed to add book.",
  confirmButtonColor: "#ef4444",
});
    }
  };

  return (
    <div className="add-container">
      <div className="add-card">
        <h1>Add New Book</h1>

        <form onSubmit={addBook}>
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={book.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={book.author}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={book.price}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={book.category}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Book Description"
            value={book.description}
            onChange={handleChange}
            rows="5"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={book.image}
            onChange={handleChange}
          />

          <button type="submit">
            📚 Add Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;