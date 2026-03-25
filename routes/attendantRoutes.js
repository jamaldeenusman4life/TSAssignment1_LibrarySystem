import {
  createAttendant,
  getAttendants,
  getAttendantById,
} from "../controllers/attendantController.js";
import express from "express";

const router = express.Router();

router.post("/attendants", createAttendant);

router.get("/attendants", getAttendants);

router.get("/attendants/:id", getAttendantById);

export default router;
