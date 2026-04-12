import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    speciality: {
      type: String,
      required: true,
      enum: [
        "Cardiology",
        "Neurology",
        "Orthopedics",
        "Pediatrics",
        "Dermatology",
        "ENT",
        "Gynecology",
        "Ophthalmology",
        "Psychiatry",
        "General Physician",
        "Endocrinology",
        "Gastroenterology",
        "Urology",
        "Oncology",
        "Pulmonology",
      ],
    },

    qualification: { type: String, required: true },   // e.g. "MBBS, MD"
    experience:    { type: Number, required: true },    // years
    hospital:      { type: String, default: "" },
    location:      { type: String, required: true },    // city / area
    photo:         { type: String, default: "" },       // URL or filename
    bio:           { type: String, default: "" },

    /* Consultation fee */
    fee: { type: Number, required: true, default: 500 },

    /* Availability – array of time slots per day */
    availability: [
      {
        day: {
          type: String,
          enum: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        },
        slots: [{ type: String }], // e.g. ["09:00 AM","10:00 AM"]
        maxPatientsPerSlot: { type: Number, default: 1, min: 1 }, // how many bookings allowed per time-slot
      },
    ],

    /* Video call option */
    allowsVideoCall: { type: Boolean, default: false },

    rating:   { type: Number, default: 4.5, min: 1, max: 5 },
    reviews:  { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
