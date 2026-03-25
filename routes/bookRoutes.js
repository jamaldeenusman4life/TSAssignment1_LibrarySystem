import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
} from "../controllers/bookController.js";
import express from "express";

const router = express.Router();

router.post("/books", createBook);

router.get("/books", getBooks);

router.get("/books/:id", getBookById);

router.put("/books/:id", updateBook);

router.delete("/books/:id", deleteBook);

router.post("/books/:id/borrow", borrowBook);

router.post("/books/:id/return", returnBook);

export default router;
