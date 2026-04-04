// Import express to create routes
import express from "express";
// Import all the author functions from the controller
import {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorController.js";

// Create a router - this helps organize which URLs do what
const router = express.Router();

// POST /authors - Create a new author
router.post("/", createAuthor);

// GET /authors - Get all authors
router.get("/", getAuthors);

// GET /authors/:id - Get a single author by ID
router.get("/:id", getAuthorById);

// PUT /authors/:id - Update an author
router.put("/:id", updateAuthor);

// DELETE /authors/:id - Delete an author
router.delete("/:id", deleteAuthor);

// Export the router so the main server can use it
export default router;
