import express from "express";
import {
  createAdmin,
  getDashboardStats,
  getAllPatients,
  deletePatient,
  adminUpdateAppointmentStatus,
  adminGetAllAppointments,
  addHealthRecord,
  getPatientHealthRecords,
  deleteHealthRecord,
  getMyHealthRecords,
  getPatientAppointments,
} from "../controller/adminController.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";
import { uploadPDF } from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* Dev utility – create first admin account (no auth required) */
router.post("/create-admin", createAdmin);

/* Patient-facing: get own health records (no admin required) */
router.get("/health-records/:patientId", getMyHealthRecords);

/* All routes below require admin role */
router.use(requireAdmin);

router.get("/stats",                                getDashboardStats);
router.get("/users",                                getAllPatients);
router.delete("/users/:id",                         deletePatient);
router.get("/appointments",                         adminGetAllAppointments);
router.patch("/appointments/:id/status",            adminUpdateAppointmentStatus);

/* Health Records – admin manages per-patient */
router.get("/users/:patientId/health-records",               getPatientHealthRecords);
router.post("/users/:patientId/health-records", uploadPDF,   addHealthRecord);
router.delete("/health-records/:recordId",                   deleteHealthRecord);

/* Patient Appointments – admin view */
router.get("/users/:patientId/appointments",                 getPatientAppointments);

export default router;
