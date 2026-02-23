import express from "express";


import { registerUser, getAllUsers, getUserId, updateUser, deleteUser, loginUser } from "../controller/userController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserId);
router.put("/update/users/:id", updateUser);
router.delete("/delete/users/:id", deleteUser);
export default router;