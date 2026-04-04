// Import express to create routes
import express from "express";
// Import all the student functions from the controller
import {
  createStudent,
  getStudents,
  getStudentById,
} from "../controllers/studentController.js";

// Create a router - this helps organize which URLs do what
const router = express.Router();

// POST /students - Create a new student
router.post("/", createStudent);

// GET /students - Get all students
router.get("/", getStudents);

// GET /students/:id - Get a single student by ID
router.get("/:id", getStudentById);

// Export the router so the main server can use it
export default router;
