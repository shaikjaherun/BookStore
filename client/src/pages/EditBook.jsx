import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/EditBook.css";
import { toast } from "react-toastify";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please login first");
    navigate("/login");
    return;
  }

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

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const updateBook = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/books/${id}`, book);
      toast.success("📚 Book Updated Successfully!");
      navigate("/");  
    } catch (error) {
      console.log(error);
      toast.error("❌ Update Failed");
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-card">
        <h1>Edit Book</h1>

        <form onSubmit={updateBook}>
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
            rows="5"
            placeholder="Description"
            value={book.description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={book.image}
            onChange={handleChange}
          />

          <button type="submit">
            ✏ Update Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBook;