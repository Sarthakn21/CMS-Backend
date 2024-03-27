import express from "express";
import {
  createAppointment,
  getAllAppointment,
} from "../controllers/appointment.controller.js";

const router = express.Router();


router.route("/").post(createAppointment);
router.route("/").get(getAllAppointment);

export default router;
