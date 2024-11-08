// ARCHIVO server
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url'; // Para resolver correctamente las rutas en ES6
import { registerUser } from "./controllers/registerController.js";
import { loginUser } from "./controllers/loginController.js";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "./controllers/productController.js";
import { verifyToken } from "./authMiddleware.js";
import pool from "./db/dbConnection.js";
import dotenv from "dotenv";


dotenv.config();
async function crearTablaUsuariosSiNoExiste() {
  const query = `
      CREATE TABLE IF NOT EXISTS usuarios (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nombre_usuario VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          nombre VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          telefono INT NOT NULL
      )
  `;
  try {
      const [result] = await pool.query(query);
      console.log('Tabla "usuarios" verificada/creada correctamente.');
  } catch (err) {
      console.error('Error al crear la tabla "usuarios":', err);
  }
}
async function crearTablaProductosSiNoExiste() {
  const query = `
      CREATE TABLE IF NOT EXISTS productos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          category VARCHAR(255) NOT NULL,
          productName VARCHAR(255) NOT NULL,
          price VARCHAR(255) NOT NULL,
          details VARCHAR(255) NOT NULL,
          ingredients VARCHAR(255) NOT NULL,
          img VARCHAR(255)
      )
  `;
  try {
      const [result] = await pool.query(query);
      console.log('Tabla "productos" verificada/creada correctamente.');
  } catch (err) {
      console.error('Error al crear la tabla "productos":', err);
  }
}

// Llamar la función para crear la tabla
crearTablaUsuariosSiNoExiste();
crearTablaProductosSiNoExiste();

const app = express();
const port = process.env.SERVERPORT || 8080;

// Obtener el directorio actual en ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta Client
app.use(express.static(path.join(__dirname, '../Client')));

// Ruta para servir el formulario de login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/index.html'));
});

app.get('/usuarios.html', verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/usuarios.html'));
});

// Ruta para acceder a usuarioLocal (requiere autenticación)
app.get('/usuarioLocal.html', verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/usuarioLocal.html'));
});


// Ruta para registrar un usuario
app.post('/register', registerUser);

// Ruta para manejar el inicio de sesión
app.post('/login', loginUser);

// Rutas para manejar productos en la API
app.get('/products', getProducts); // Listar productos

app.get('/products/:id', getProductById); // Buscar por id

app.post('/products', createProduct); // Crear producto

app.put('/products/:id', updateProduct); // Modificar producto

app.delete('/products/:id', deleteProduct); // Eliminar producto

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
  