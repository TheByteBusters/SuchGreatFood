import bcrypt from "bcryptjs"; // Encripta contraseñas
import jwt from "jsonwebtoken"; // Impide que puedan ingresar directamente sin haber pasado por el login
import db from "../db/dbConnection.js"; // Conexion de base de datos

const JWT_SECRET = "calve_token";

export const loginUser = async (req, res) => {
  const { nombre_usuario, password} = req.body; // Sólo necesitamos usuario y password

  try {
    // Verificar si el usuario existe
    const [user] = await db.promise().query("SELECT * FROM users WHERE nombre_usuario = ?", [nombre_usuario]);

    if (user.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // Verificar la contraseña
    const validPassword = await bcrypt.compare(password, user[0].password); // desencripta
    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user[0].id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
