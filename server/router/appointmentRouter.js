import express from "express";
import {
  bookAppointment,
  getMyAppointments,
  getAllAppointments,
  cancelAppointment,
  updateAppointmentStatus,
  getBookedSlots,
} from "../controller/appointmentController.js";

const router = express.Router();

router.post("/",                      bookAppointment);         // POST /api/appointments
router.get("/my/:patientId",          getMyAppointments);       // GET  /api/appointments/my/:patientId
router.get("/",                       getAllAppointments);       // GET  /api/appointments  (admin)
router.get("/booked-slots",           getBookedSlots);          // GET  /api/appointments/booked-slots?doctorId=&date=
router.patch("/:id/cancel",           cancelAppointment);       // PATCH /api/appointments/:id/cancel
router.patch("/:id/status",           updateAppointmentStatus); // PATCH /api/appointments/:id/status (admin)

export default router;
