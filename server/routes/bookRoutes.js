import express from "express";
import {
  addBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, addBook);

router.put("/:id", protect, adminOnly, updateBook);

router.delete("/:id", protect, adminOnly, deleteBook);

router.get("/", getBooks);

router.get("/:id", getBook);

export default router;