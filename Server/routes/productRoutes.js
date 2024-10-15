import express from "express";
import { getProducts } from "../controllers/productController.js";

const router = express.Router();

// Ruta para obtener productos
router.get('/', getProducts);

export default router;
