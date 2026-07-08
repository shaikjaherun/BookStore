import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-left">
          <h2>📚 BookStore</h2>
          <p>
            Discover, manage and organize your favourite books
            with a modern bookstore application.
          </p>
        </div>

        <div className="footer-center">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/add">Add Book</a>
        </div>

        <div className="footer-right">
          <h3>Contact</h3>

          <p>📧 bookstore@gmail.com</p>
          <p>📱 +91 9876543210</p>
        </div>

      </div>

      <div className="copyright">
        © 2026 BookStore | MERN Stack Project
      </div>

    </footer>
  );
}

export default Footer;