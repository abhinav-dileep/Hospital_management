import express from "express";
import {
  getAllDoctors,
  getSpecialities,
  getDoctorById,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controller/doctorController.js";

const router = express.Router();

/* ── IMPORTANT: specific routes BEFORE /:id param ── */

/* Public routes */
router.get("/",             getAllDoctors);   // GET  /api/doctors
router.get("/specialities", getSpecialities); // GET  /api/doctors/specialities


/* Admin routes */
router.post("/",            addDoctor);       // POST /api/doctors

/* Parameterised routes last */
router.get("/:id",          getDoctorById);   // GET  /api/doctors/:id
router.put("/:id",          updateDoctor);    // PUT  /api/doctors/:id
router.delete("/:id",       deleteDoctor);    // DELETE /api/doctors/:id

export default router;
