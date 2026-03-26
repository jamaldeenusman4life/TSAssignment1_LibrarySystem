import {
  createAttendant,
  getAttendants,
} from "../controllers/attendantController.js";
import express from "express";

const router = express.Router();

router.post("/", createAttendant);

router.get("/", getAttendants);

export default router;
