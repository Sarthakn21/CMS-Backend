import Appointment from "../models/appointment.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

//function to Create appointment
//method :Post
//api-url:http://localhost:5000/api/appointments/
const createAppointment = async (req, res) => {
  try {
    const {
      patientName,
      patientMobileNumber,
      patientAge,
      patientGender,
      reason,
    } = req.body;
    if (
      !patientName ||
      !patientMobileNumber ||
      !patientAge ||
      !patientGender ||
      !reason
    ) {
      throw new ApiError(400, "All fields are requird");
    }
    const appointment = await Appointment.create({
      patientName,
      patientMobileNumber,
      patientAge,
      patientGender,
      reason,
    });

    return res
      .status(201)
      .json(
        new ApiResponse(201, appointment, "appointment Created Successfully")
      );
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: "Failed to create appointment", error: error.message });
  }
};

//fnctiont to get all appointments
//method : Get
//api-url:http://localhost:5000/api/appointments/
const getAllAppointment = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    return res
      .status(200)
      .json(
        new ApiResponse(200, appointments, "Appointments fetched successfully")
      );
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: "Failed to fetch appointments", error: error.message });
  }
};

export { createAppointment, getAllAppointment };
