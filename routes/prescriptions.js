import express, { Router } from "express";
import {
  addPrescription,
  deletePrescriptionById,
  getAllPrescription,
  getPrecrptionById,
} from "../controllers/prescription.controller.js";

const router = express.Router();

router.route("/").get(getAllPrescription);
router.route("/:patientId").get(getPrecrptionById);
router.route("/add/:patientId").post(addPrescription);
router.route("/delete/:id").delete(deletePrescriptionById);

export default router;
