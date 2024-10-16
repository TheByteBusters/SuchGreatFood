import mysql from "mysql2/promise";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL (usando un pool de conexiones)
const pool = mysql.createPool({
    host: process.env.DB_HOST || '192.168.0.107', // ip
    user: process.env.DB_USER || 'Brian', // usuario de MySQL
    password: process.env.DB_PASSWORD || 'Brian12345', // contraseña de MySQL
    database: process.env.DB_NAME || 'basededatos1', // base de datos
    waitForConnections: true,
    connectionLimit: 10, // número máximo de conexiones en el pool
    queueLimit: 0
});

// Probar la conexión a MySQL
pool.getConnection()
    .then(connection => {
        console.log('Conectado a la base de datos MySQL');
        connection.release(); // Liberar la conexión
    })
    .catch(err => {
        console.error('Error conectando a la base de datos:', err.stack);
    });

app.get("/", (req, res) => {
    res.send("SERVER ACTIVADO");
});

app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto ${port}`);
});

// Exportar el pool de conexiones
export default pool;
