import express, { Router } from "express";
import {
  addPrescription,
  deletePrescriptionById,
  getAllPrescription,
  getPrecrptionById,
} from "../controllers/prescription.controller.js";
import doctorMiddleware from "../middleware/isDoc.js";

const router = express.Router();

router.route("/").get(getAllPrescription);
router.route("/:patientId").get(getPrecrptionById);
router.route("/add/:patientId").post(doctorMiddleware, addPrescription);
router.route("/delete/:id").delete(doctorMiddleware, deletePrescriptionById);

export default router;
