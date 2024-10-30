import express from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { verifyToken } from "../authMiddleware.js"; 
const router = express.Router();

router.get('/products', getProducts); // Obtener todos los productos
router.get('/products/:id', getProductById); // Obtener producto por ID
router.post('/products', verifyToken, createProduct); // Crear producto (solo para usuarios autenticados)
router.put('/products/:id', verifyToken, updateProduct); // Actualizar producto
router.delete('/products/:id', verifyToken, deleteProduct); // Eliminar producto


export default router;
