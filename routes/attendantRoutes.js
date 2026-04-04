// Import express to create routes
import express from "express";
// Import all the attendant functions from the controller
import {
  createAttendant,
  getAttendants,
} from "../controllers/attendantController.js";

// Create a router - this helps organize which URLs do what
const router = express.Router();

// POST /attendants - Create a new attendant
router.post("/", createAttendant);

// GET /attendants - Get all attendants
router.get("/", getAttendants);

// Export the router so the main server can use it
export default router;
