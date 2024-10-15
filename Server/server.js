import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url'; // Para resolver correctamente las rutas en ES6
import { registerUser } from "./controllers/registerController.js";
import { loginUser } from "./controllers/loginController.js";
import { getProducts } from "./controllers/productController.js";


const app = express();
const port = 8080;

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

// Ruta para registrar un usuario
app.post('/register', registerUser);

// Ruta para manejar el inicio de sesión
app.post('/login', loginUser);

// Manejar productos en la API
app.get('/products', getProducts); // Si tienes productos

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
