import express from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

import { borrowBook } from "../controllers/borrowBookController.js";
import { returnBook } from "../controllers/returnBookController.js";

const router = express.Router();

router.post("/", createBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

router.post("/:id/borrow", borrowBook);
router.post("/:id/return", returnBook);

export default router;
