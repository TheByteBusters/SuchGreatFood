import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"; // Importar las rutas de autenticación
import db from "./db/dbConnection.js"; // Importar la conexión a la base de datos

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use("/auth", authRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
