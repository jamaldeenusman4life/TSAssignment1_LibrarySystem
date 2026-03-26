import {
  createStudent,
  getStudents,
  getStudentById,
} from "../controllers/studentController.js";
import express from "express";

const router = express.Router();

router.post("/", createStudent);

router.get("/", getStudents);

router.get("/:id", getStudentById);

export default router;
