import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    patientId: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true,
    },
    Dob:{
        type:Date,
        required:true,
    },
    age: {
        type: Number,
        required: true
    },
    address:{
        type:String,
    },
    weight: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    profileCreatedAt: {
        type: Date,
        default: Date.now
    },
    profileUpdatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update profileUpdatedAt field when document is modified
patientSchema.pre('save', async function() {
    if (this.isModified()) {
        this.profileUpdatedAt = new Date();
    }
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
