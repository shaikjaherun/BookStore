import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import BookCard from "../components/BookCard";
import "../styles/Home.css";

function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const categories = [
    "All",
    ...new Set(books.map((book) => book.category)),
  ];

  const filteredBooks = books.filter((book) => {
    const searchMatch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const categoryMatch =
      selectedCategory === "All" ||
      book.category === selectedCategory;

    return searchMatch && categoryMatch;
  });

  const totalBooks = books.length;

  const totalCategories = new Set(
    books.map((book) => book.category)
  ).size;

  const averagePrice =
    books.length > 0
      ? Math.round(
          books.reduce(
            (sum, book) => sum + Number(book.price),
            0
          ) / books.length
        )
      : 0;

  return (
    <div className="home">

      {/* HERO */}

      <section className="hero">

        <div className="hero-left">

          <h1>📚 BookStore</h1>

          <h2>Discover Amazing Books</h2>

          <p>
            Explore, organize and manage your favourite books
            with our modern MERN BookStore application.
          </p>

          <div className="hero-buttons">

            <a href="#books">
              <button className="browse-btn">
              📚 Explore Collection
              </button>
            </a>

            {JSON.parse(localStorage.getItem("user"))?.role === "admin" && (
              <Link to="/add">
                <button className="add-btn">
                ✨ Add New Book
                </button>
              </Link>
            )}

          </div>

        </div>

        <div className="hero-right">

          <img
            src="https://cdn-icons-png.flaticon.com/512/2436/2436636.png"
            alt="Books"
          />

        </div>

      </section>

      {/* SEARCH */}

      <div className="search-wrapper">

        <input
          className="searchBox"
          placeholder="🔍 Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* DASHBOARD */}

      <div className="dashboard">

        <div className="dashCard">
          <h3>📚</h3>
          <h2>{totalBooks}</h2>
          <p>Total Books</p>
        </div>

        <div className="dashCard">
          <h3>📂</h3>
          <h2>{totalCategories}</h2>
          <p>Categories</p>
        </div>

        <div className="dashCard">
          <h3>💰</h3>
          <h2>₹{averagePrice}</h2>
          <p>Average Price</p>
        </div>

      </div>

      <h2
        id="books"
        className="section-title"
      >
        📖 Featured Books
      </h2>

      <div className="categoryBar">
        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category
                ? "categoryBtn activeCategory"
                : "categoryBtn"
            }
            onClick={() =>
              setSelectedCategory(category)
            }
          >
            {category}
          </button>
        ))}
      </div>

      {filteredBooks.length === 0 ? (
        <div className="empty-state">
          <h2>📚 No Books Found</h2>
          <p>Add a new book to start your collection.</p>
        </div>
      ) : (
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              fetchBooks={fetchBooks}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default Home;