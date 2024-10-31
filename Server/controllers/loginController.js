// ARCHIVO loginController.js
import bcrypt from "bcryptjs"; // Encripta contraseñas
import jwt from "jsonwebtoken"; // Impide que puedan ingresar directamente sin haber pasado por el login
import db from "../db/dbConnection.js"; // Conexión de base de datos

const JWT_SECRET = "logueate_campeon";

export const loginUser = async (req, res) => {
    const { nombre_usuario, password } = req.body;

    try {
        const [user] = await db.query("SELECT * FROM usuarios WHERE nombre_usuario = ?", [nombre_usuario]);

        if (user.length === 0) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Generar un token JWT con tipo de usuario
        const token = jwt.sign({ id: user[0].id, type: user[0].tipo_usuario }, JWT_SECRET, { expiresIn: "60s" });

        res.json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
};

