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

router.post("/", createBook);

router.get("/", getBooks);

router.get("/:id", getBookById);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

router.post("/:id/borrow", borrowBook);

router.post("/:id/return", returnBook);

export default router;
