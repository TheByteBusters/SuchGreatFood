import express from "express";
import { registerUser } from "../controllers/registerController.js";
import { loginUser } from "../controllers/loginController.js";

const router = express.Router();

// Ruta para el registro
router.post("/register", registerUser);

// Ruta para el login
router.post("/login", loginUser);

export default router;
