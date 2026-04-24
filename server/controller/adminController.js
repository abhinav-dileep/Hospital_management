import User from "../model/userModel.js";
import Appointment from "../model/appointmentModel.js";
import Doctor from "../model/doctorModel.js";
import HealthRecord from "../model/healthRecordModel.js";
import fs from "fs";


export const createAdmin = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    const admin = new User({ name, email, phone, password, role: "admin" });
    await admin.save();
    res.status(201).json({ success: true, message: "Admin created", user: admin });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalDoctors, totalAppointments, activeDoctors, pendingAppts, confirmedAppts, completedAppts, cancelledAppts] = await Promise.all([
      User.countDocuments({ role: "patient" }),
      Doctor.countDocuments(),
      Appointment.countDocuments(),
      Doctor.countDocuments({ isActive: true }),
      Appointment.countDocuments({ status: "Pending" }),
      Appointment.countDocuments({ status: "Confirmed" }),
      Appointment.countDocuments({ status: "Completed" }),
      Appointment.countDocuments({ status: "Cancelled" }),
    ]);


    const today = new Date().toISOString().split("T")[0];
    const todayAppts = await Appointment.countDocuments({ date: today });


    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);

    const monthlyStats = await Appointment.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);


    const specialityStats = await Appointment.aggregate([
      { $group: { _id: "$speciality", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalDoctors,
        activeDoctors,
        totalAppointments,
        todayAppts,
        pendingAppts,
        confirmedAppts,
        completedAppts,
        cancelledAppts,
        monthlyStats,
        specialityStats,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getAllPatients = async (req, res) => {
  try {
    const users = await User.find({ role: "patient" }).select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const deletePatient = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const adminUpdateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appt = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true })
      .populate("patient", "name email phone")
      .populate("doctor", "name speciality hospital");
    if (!appt) return res.status(404).json({ success: false, message: "Appointment not found" });
    res.status(200).json({ success: true, message: "Status updated", appointment: appt });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const adminGetAllAppointments = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};
    if (status && status !== "All") filter.status = status;

    let appointments = await Appointment.find(filter)
      .populate("patient", "name email phone")
      .populate("doctor", "name speciality hospital location")
      .sort({ createdAt: -1 });

    if (search) {
      const s = search.toLowerCase();
      appointments = appointments.filter(
        (a) =>
          a.patientName?.toLowerCase().includes(s) ||
          a.doctor?.name?.toLowerCase().includes(s) ||
          a.speciality?.toLowerCase().includes(s)
      );
    }

    res.status(200).json({ success: true, count: appointments.length, appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


/* ── Health Records ── */

export const addHealthRecord = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await User.findById(patientId);
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });

    const data = { ...req.body, patient: patientId };

    /* If a PDF was uploaded, attach its path */
    if (req.file) {
      data.fileUrl  = req.file.path.replace(/\\/g, "/"); // normalize Windows separators
      data.fileName = req.file.originalname;
    }

    const record = new HealthRecord(data);
    await record.save();
    res.status(201).json({ success: true, record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getPatientHealthRecords = async (req, res) => {
  try {
    const records = await HealthRecord.find({ patient: req.params.patientId })
      .sort({ date: -1, createdAt: -1 });
    res.status(200).json({ success: true, records });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteHealthRecord = async (req, res) => {
  try {
    const record = await HealthRecord.findByIdAndDelete(req.params.recordId);
    if (!record) return res.status(404).json({ success: false, message: "Record not found" });

    /* Delete the associated PDF file if it exists */
    if (record.fileUrl && fs.existsSync(record.fileUrl)) {
      fs.unlinkSync(record.fileUrl);
    }

    res.status(200).json({ success: true, message: "Record deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* Admin: get all appointments for a specific patient */
export const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.patientId })
      .populate("doctor", "name speciality hospital location photo")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* Patient-facing: get own health records */
export const getMyHealthRecords = async (req, res) => {
  try {
    const records = await HealthRecord.find({ patient: req.params.patientId })
      .sort({ date: -1, createdAt: -1 });
    res.status(200).json({ success: true, records });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
