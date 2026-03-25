import {
  createStudent,
  getStudents,
  getStudentById,
} from "../controllers/studentController.js";
import express from "express";

const router = express.Router();

router.post("/students", createStudent);

router.get("/students", getStudents);

router.get("/students/:id", getStudentById);

export default router;
