import mongoose from "mongoose";

const healthRecordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["Scan Report", "Prescription", "Lab Result", "Discharge Summary", "Vaccination", "Other"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String, // "YYYY-MM-DD"
      required: true,
    },
    doctor: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
    fileUrl: {
      type: String,
      default: "",   // relative path like "uploads/records/<filename>"
    },
    fileName: {
      type: String,
      default: "",
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const HealthRecord = mongoose.model("HealthRecord", healthRecordSchema);
export default HealthRecord;
