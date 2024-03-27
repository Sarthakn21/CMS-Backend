import Appointment from "../models/appointment.js";

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

    // Create an appointment using extracted fields
    const appointment = new Appointment({
      patientName: patientName,
      patientMobileNumber: patientMobileNumber,
      patientAge: patientAge,
      patientGender: patientGender,
      reason: reason,
    });
    await appointment.save();
    return res.status(201).json({
      message: "Appointment Created Successfully",
      appointment: {
        _id: appointment._id,
        patientName: appointment.patientName,
        patientMobileNumber: appointment.patientMobileNumber,
        patientAge: appointment.patientAge,
        patientGender: appointment.patientGender,
        date: appointment.date,
        reason: appointment.reason,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create appointment", error: error.message });
  }
};

//fnctiont to get all appointments
//method : Get
//api-url:http://localhost:5000/api/appointments/
const getAllAppointment = async (req, res) => {
  try {
    const appointments = await Appointment.find();

    return res.status(200).json({
      message: "Appointments Fetched Successfully",
      total: appointments.length,
      appointments: appointments,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch appointments", error: error.message });
  }
};

export { createAppointment, getAllAppointment };
