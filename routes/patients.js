import express from 'express';
import { createNewPatient, deleteById, getAllPatient, getPatientById, updateById } from '../controllers/patient.controller.js';
import doctorMiddleware from '../middleware/isDoc.js';

const router = express.Router();

router.route('/register').post(createNewPatient);
router.route('/').get(doctorMiddleware,getAllPatient);
router.route('/:id').get(getPatientById);
router.route('/update/:id').put(updateById);
router.route('/delete/:id').delete(deleteById);

export default router;
