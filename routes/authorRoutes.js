import {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorController.js";

import express from "express";

const router = express.Router();

router.post("/authors", createAuthor);

router.get("/authors", getAuthors);

router.get("/authors/:id", getAuthorById);

router.put("/authors/:id", updateAuthor);

router.delete("/authors/:id", deleteAuthor);

export default router;
