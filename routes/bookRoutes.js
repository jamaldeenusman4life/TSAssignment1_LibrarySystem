// Import express to create routes
import express from "express";
// Import all the book functions from the controller
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

// Import the borrow and return book functions
import { borrowBook } from "../controllers/borrowBookController.js";
import { returnBook } from "../controllers/returnBookController.js";

// Create a router - this helps organize which URLs do what
const router = express.Router();

// POST /books - Create a new book
router.post("/", createBook);
// GET /books - Get all books
router.get("/", getBooks);
// GET /books/:id - Get a single book by ID
router.get("/:id", getBookById);
// PUT /books/:id - Update a book
router.put("/:id", updateBook);
// DELETE /books/:id - Delete a book
router.delete("/:id", deleteBook);

// POST /books/:id/borrow - Handle borrowing a book (student checks out a book)
router.post("/:id/borrow", borrowBook);
// POST /books/:id/return - Handle returning a book (student returns a book)
router.post("/:id/return", returnBook);

// Export the router so the main server can use it
export default router;
