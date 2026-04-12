import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patientName:  { type: String, required: true },
    patientPhone: { type: String, required: true },
    patientEmail: { type: String, default: "" },
    age:          { type: Number },
    gender:       { type: String, enum: ["Male", "Female", "Other"] },


    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    speciality: { type: String, required: true },


    date:   { type: String, required: true },
    slot:   { type: String, required: true },
    reason: { type: String, default: "" },

    appointmentType: {
      type: String,
      enum: ["in-person", "video-call"],
      default: "in-person",
    },


    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
