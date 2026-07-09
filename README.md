# 📚 BookStore - Full Stack MERN Application

A complete Full Stack BookStore web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). The application allows users to browse books, register/login, manage carts, place orders, and allows administrators to manage books.

---

# 🚀 Live Demo

### Frontend (Vercel)

book-store-git-main-shaik-jaherun.vercel.app

### Backend API (Render)

https://bookstore-457u.onrender.com

---

# 📌 Features

## User Features

- User Registration
- User Login (JWT Authentication)
- Browse Books
- Search Books
- View Book Details
- Add Books to Cart
- Update Cart Quantity
- Remove Books from Cart
- Checkout
- Place Orders
- View Previous Orders

---

## Admin Features

- Admin Login
- Add New Books
- Edit Existing Books
- Delete Books
- Manage Book Inventory

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Bootstrap
- CSS
- Axios

## Backend

- Node.js
- Express.js
- JWT Authentication
- Bcrypt.js
- CORS

## Database

- MongoDB Atlas
- Mongoose

## Deployment

- Vercel (Frontend)  --->  book-store-git-main-shaik-jaherun.vercel.app
- Render (Backend)   --->  https://bookstore-457u.onrender.com

---

# 📁 Project Structure

```
BookStore/
│
├── client/
│   ├── public/
│   ├── src/
│   │
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── README.md
└── Project Documentation.pdf
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/shaikjaherun/BookStore.git
```

---

## Move into Project

```bash
cd BookStore
```

---

# Install Frontend

```bash
cd client

npm install
```

---

# Install Backend

```bash
cd ../server

npm install
```

---



# Start Backend

```bash
cd server

npm start
```

---

# Start Frontend

```bash
cd client

npm run dev
```

---

# API Endpoints

## Authentication

### Register User

POST

```
/api/auth/register
```

### Login User

POST

```
/api/auth/login
```

---

## Books

### Get All Books

GET

```
/api/books
```

### Get Book by ID

GET

```
/api/books/:id
```

### Add Book

POST

```
/api/books/add
```

### Update Book

PUT

```
/api/books/:id
```

### Delete Book

DELETE

```
/api/books/:id
```

---

## Cart

### Add to Cart

POST

```
/api/cart/add
```

### Get Cart

GET

```
/api/cart
```

### Remove Item

DELETE

```
/api/cart/:id
```

---

## Orders

### Checkout

POST

```
/api/orders/checkout
```

### User Orders

GET

```
/api/orders
```

---

# Authentication

- JWT Token Authentication
- Password Encryption using Bcrypt
- Protected Routes
- Authorization Middleware

---

# Database Collections

- Users
- Books
- Cart
- Orders

---

# Deployment

## Frontend

Hosted on Vercel

book-store-git-main-shaik-jaherun.vercel.app

---

## Backend

Hosted on Render

https://bookstore-457u.onrender.com

---



# Future Enhancements

- Online Payment Gateway
- Wishlist
- Ratings & Reviews
- Book Categories
- Admin Dashboard
- Sales Reports
- Dark Mode
- Email Notifications
- Order Tracking

---

# Author

**Shaik Jaherun**

GitHub:

https://github.com/shaikjaherun

---

# Demo Link

https://drive.google.com/file/d/1p9Y6rpYOKavatTgB66eMDlOvTMAiJjao/view?usp=sharing
