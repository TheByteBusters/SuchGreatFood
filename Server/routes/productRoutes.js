import express from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { cartController } from "../controllers/cartController.js"
import { verifyToken, verifyTokenAdmin } from "../authMiddleware.js"; 
const router = express.Router();

router.get('/products', getProducts); // Obtener todos los productos
router.get('/products/:id', getProductById); // Obtener producto por ID
router.post('/products', verifyTokenAdmin, createProduct); // Crear producto (solo para usuarios autenticados)
router.put('/products/:id', verifyTokenAdmin, updateProduct); // Actualizar producto
router.delete('/products/:id', verifyTokenAdmin, deleteProduct); // Eliminar producto

router.post('/create_preference', cartController)



export default router;
