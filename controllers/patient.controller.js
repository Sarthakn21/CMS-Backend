import Patient from "../models/patient.js";

//fnctiont to create new appointment
//method : Post
//api-url:http://localhost:5000/api/patients/register
const createNewPatient = async (req, res) => {
  try {
    const { patientId, name, contactNumber, age, weight, gender, Dob } =
      req.body;

    const patient = await Patient.create({
      patientId,
      name,
      contactNumber,
      age,
      weight,
      gender,
      Dob,
    });

    res.status(201).json({ message: "Patient created successfully", patient });
  } catch (error) {
    if (error.name == "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ message: "Validation error", errors });
    } else {
      res
        .status(500)
        .json({ message: "Failed to create patient", error: error.message });
    }
  }
};

//Function to get all patients
//method : Get
//api-url: http://localhost:5000/api/patients
const getAllPatient = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({ total: patients.length, patients: patients });
    console.log(patients[0]._id.toString());
    // res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve patients", error });
  }
};

//Function to get patient by id
//method : Get
//api-url: http://localhost:5000/api/patients/:id
const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);
    // const patient = await Patient.findOne({ patientId: id });

    if (!patient) {
      return res.status(404).json({ message: "Patient Not Found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to Retrieve Patient", error: error.message });
  }
};

//Function to update patients by id
//method : put
//api-url: http://localhost:5000/api/patients/update/:id
const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { patientId, name, contactNumber, age, weight, gender, Dob } =
      req.body;
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient Not Found" });
    }

    patient.patientId = patientId;
    patient.name = name;
    patient.contactNumber = contactNumber;
    patient.age = age;
    patient.weight = weight;
    patient.gender = gender;
    patient.Dob = Dob;

    await patient.save();

    return res.status(200).json({
      message: "Patient Updated Successfully",
      updatedPatient: patient,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to Update Patient Details",
      error: error.message,
    });
  }
};

//Function to delete patient by id
//method : Delete
//api-url: http://localhost:5000/api/patients/delete/:id
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient Not Found" });
    }

    await patient.deleteOne();
    return res
      .status(200)
      .json({ message: "Patient Record Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Cannot Delete Patient Details", error: error.message });
  }
};
export {
  createNewPatient,
  getAllPatient,
  getPatientById,
  updateById,
  deleteById,
};
