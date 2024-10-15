import express from "express";
import cors from "cors";
import mysql from "mysql2";
import bcrypt from "bcrypt"; // bcrypt
import dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST || '192.168.0.107',
    user: process.env.DB_USER || 'Brian', // usuario de MySQL
    password: process.env.DB_PASSWORD || 'Brian12345', // contraseña de MySQL
    database: process.env.DB_NAME || 'basededatos1', // base de datos
});

// Conectar a MySQL
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

app.get("/", (req, res) => {
    res.send("SERVER ACTIVADO");
});

// Ruta para agregar un producto
app.post("/productos", (req, res) => {
    const { nombre_producto, precio_producto, detalles_producto } = req.body;

    const query = `INSERT INTO productos (nombre_producto, precio_producto, detalles_producto) VALUES (?, ?, ?)`;
    db.query(query, [nombre_producto, precio_producto, detalles_producto], (err, results) => {
        if (err) {
            console.error('Error al insertar el producto:', err);
            return res.status(500).json({ error: 'Error al insertar el producto' });
        }
        res.status(201).json({ id: results.insertId, mensaje: 'Producto agregado exitosamente' });
    });
});

// Ruta para registrar un nuevo usuario
app.post("/usuarios", async (req, res) => {
    const { id, nombre_usuario, contraseña, telefono } = req.body; // Asegúrate de incluir 'telefono'

    // Hash de la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const query = `INSERT INTO usuarios (id, nombre_usuario, contraseña, telefono) VALUES (?, ?, ?, ?)`;
    db.query(query, [id, nombre_usuario, hashedPassword, telefono], (err, results) => {
        if (err) {
            console.error('Error al insertar el usuario:', err);
            return res.status(500).json({ error: 'Error al insertar el usuario' });
        }
        res.status(201).json({ id: results.insertId, mensaje: 'Usuario registrado exitosamente' });
    });
});

// Ruta para obtener todos los usuarios
app.get("/usuarios", (req, res) => {
    const query = 'SELECT * FROM usuarios';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los usuarios:', err);
            return res.status(500).json({ error: 'Error al obtener los usuarios' });
        }
        res.json(results);
    });
});

// Ruta para obtener un usuario por ID
app.get("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM usuarios WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener el usuario:', err);
            return res.status(500).json({ error: 'Error al obtener el usuario' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(results[0]);
    });
});

app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto ${port}`);
});