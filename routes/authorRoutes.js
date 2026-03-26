import {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorController.js";

import express from "express";

const router = express.Router();

router.post("/", createAuthor);

router.get("/", getAuthors);

router.get("/:id", getAuthorById);

router.put("/:id", updateAuthor);

router.delete("/:id", deleteAuthor);

export default router;
