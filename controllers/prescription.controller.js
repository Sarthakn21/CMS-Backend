import Patient from "../models/patient.js";
import Prescription from "../models/Prescription.js";

//function to get all prescription
//method : Get
//api-url: http://localhost:5000/api/prescription/
const getAllPrescription = async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.status(200).json({ total: prescriptions.length, prescriptions });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve prescription", error });
  }
};

//function to get all prescription by id
//method : Get
//api-url: http://localhost:5000/api/prescription/:id
const getPrecrptionById = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await Patient.findById(patientId);
    //check if patient exist
    if (!patient) {
      return res.status(404).json({ message: "No such patient" });
    }
    const prescriptions = await Prescription.find({ patientId: patientId });
    res
      .status(200)
      .json({ total: prescriptions.length, name: patient.name, prescriptions });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve prescription", error });
  }
};

//function to add prescription to particular patient
//method : Post
//api-url: http://localhost:5000/api/prescription/add/:id
const addPrescription = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { medications } = req.body;
    const { symptoms } = req.body;

    // Check if the patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the prescription
    const prescription = await Prescription.create({
      patientId,
      symptoms,
      medications,
    });

    res
      .status(201)
      .json({ message: "Prescription added successfully", prescription });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation error", errors });
    } else {
      return res
        .status(500)
        .json({ message: "Failed to add prescription", error: error.message });
    }
  }
};

//function to delete particular prescription by id
//method : Delete
//api-url:http://localhost:5000/api/prescription/delete/:id
const deletePrescriptionById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the prescription exists
    const prescription = await Prescription.findById(id);
    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    await prescription.deleteOne();
    return res
      .status(200)
      .json({ message: "Prescription deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete prescription", error: error.message });
  }
};
export {
  getAllPrescription,
  getPrecrptionById,
  addPrescription,
  deletePrescriptionById,
};