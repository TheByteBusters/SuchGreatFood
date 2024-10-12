import express from 'express';
import path from 'path'; 
import { registerUser } from '../controllers/registerController.js'; // Asegúrate de que esta ruta sea correcta

const app = express();
const __dirname = process.cwd(); // Obtener el directorio de trabajo actual

// Middleware para parsear los cuerpos de las peticiones
app.use(express.json()); // Manejar datos JSON
app.use(express.urlencoded({ extended: true })); // Manejar datos URL-encoded

// Ruta para servir el formulario de registro
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../Client/testing/testRegister.html')); // Usa __dirname para rutas
});

// Ruta para registrar un usuario
app.post('/register', registerUser); // Conectar el controlador

// Iniciar el servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
