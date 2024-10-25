import express from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { verifyToken } from "../authMiddleware.js"; 
const router = express.Router();

router.get('/products', getProducts); // Obtener todos los productos
router.get('/products/:id', getProductById); // Obtener producto por ID
router.post('/products', authMiddleware, createProduct); // Crear producto (solo para usuarios autenticados)
router.put('/products/:id', authMiddleware, updateProduct); // Actualizar producto
router.delete('/products/:id', authMiddleware, deleteProduct); // Eliminar producto

export default router;
