import Appointment from "../model/appointmentModel.js";
import Doctor from "../model/doctorModel.js";


export const bookAppointment = async (req, res) => {
  try {
    const { patient, patientName, patientPhone, patientEmail, age, gender, doctor, date, slot, reason, appointmentType } = req.body;

    const doctorDoc = await Doctor.findById(doctor);
    if (!doctorDoc) return res.status(404).json({ success: false, message: "Doctor not found" });

    // Enforce video-call restriction
    if (appointmentType === "video-call" && !doctorDoc.allowsVideoCall) {
      return res.status(400).json({ success: false, message: "This doctor does not offer video consultations." });
    }

    // Determine max patients per slot for the given slot's day
    const dayName = new Date(date + "T12:00:00").toLocaleDateString("en-US", { weekday: "long" });
    const dayAvailability = doctorDoc.availability?.find(a => a.day === dayName);
    const maxPerSlot = dayAvailability?.maxPatientsPerSlot ?? 1;

    // Count existing (non-cancelled) bookings for this doctor/date/slot
    const existingCount = await Appointment.countDocuments({ doctor, date, slot, status: { $ne: "Cancelled" } });
    if (existingCount >= maxPerSlot) {
      return res.status(409).json({ success: false, message: `This slot is fully booked (${maxPerSlot} patient${maxPerSlot > 1 ? 's' : ''} max). Please choose another.` });
    }

    const appointment = new Appointment({
      patient,
      patientName,
      patientPhone,
      patientEmail,
      age,
      gender,
      doctor,
      speciality: doctorDoc.speciality,
      date,
      slot,
      reason,
      appointmentType: appointmentType || "in-person",
    });

    await appointment.save();
    await appointment.populate("doctor", "name speciality hospital location");

    res.status(201).json({ success: true, message: "Appointment booked successfully!", appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.patientId })
      .populate("doctor", "name speciality hospital location photo")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email phone")
      .populate("doctor", "name speciality hospital")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


export const cancelAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ success: false, message: "Appointment not found" });
    if (appt.status === "Cancelled") return res.status(400).json({ success: false, message: "Already cancelled" });

    appt.status = "Cancelled";
    await appt.save();
    res.status(200).json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};



export const getBookedSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.query;
    if (!doctorId || !date) {
      return res.status(400).json({ success: false, message: "doctorId and date are required" });
    }

    const appointments = await Appointment.find({
      doctor: doctorId,
      date,
      status: { $ne: "Cancelled" },
    }).select("slot");

    // Count bookings per slot
    const slotCounts = {};
    appointments.forEach(a => {
      slotCounts[a.slot] = (slotCounts[a.slot] || 0) + 1;
    });

    const bookedSlots = appointments.map(a => a.slot);
    res.status(200).json({ success: true, bookedSlots, slotCounts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
