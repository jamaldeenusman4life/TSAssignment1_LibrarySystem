import express from "express";
import {
  createAttendant,
  getAttendants,
} from "../controllers/attendantController.js";

const router = express.Router();

router.post("/", createAttendant);

router.get("/", getAttendants);

export default router;
