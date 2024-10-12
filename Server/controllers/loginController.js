import bcrypt from "bcryptjs"; // Encripta contraseñas
import jwt from "jsonwebtoken"; // Impide que puedan ingresar directamente sin haber pasado por el login
import db from "../db/dbConnection.js"; // Conexión de base de datos

const JWT_SECRET = "calve_token";

export const loginUser = async (req, res) => {
    const { nombre_usuario, password } = req.body; // Solo necesitamos usuario y password
    console.log(`Intento de inicio de sesión para el usuario: ${nombre_usuario}`); // Depuración

    try {
        // Verificar si el usuario existe
        const [user] = await db.query("SELECT * FROM usuarios WHERE nombre_usuario = ?", [nombre_usuario]);
        console.log(`Usuario encontrado: ${JSON.stringify(user)}`); // Depuración

        if (user.length === 0) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        // Verificar la contraseña
        const validPassword = await bcrypt.compare(password, user[0].password); // desencripta
        if (!validPassword) {
            console.log('Contraseña incorrecta'); // Depuración
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Generar un token JWT
        const token = jwt.sign({ id: user[0].id }, JWT_SECRET, { expiresIn: "1h" });
        console.log('Inicio de sesión exitoso, token generado:', token); // Depuración

        res.json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error); // Depuración
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
};
