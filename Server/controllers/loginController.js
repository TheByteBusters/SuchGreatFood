import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db/dbConnection.js";

const JWT_SECRET = "logueate_campeon";
const JWT_SECRET_ADMIN = "relogueate_maquina";

export const loginUser = async (req, res) => {
  const { nombre_usuario, password } = req.body;

  try {
    const [user] = await db.query(
      "SELECT * FROM usuarios WHERE nombre_usuario = ?",
      [nombre_usuario]
    );

    if (user.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Verificar el rol y usar JWT_SECRET_ADMIN si es administrador
    const isAdmin = user[0].rol === "admin";
    const secret = isAdmin ? JWT_SECRET_ADMIN : JWT_SECRET;

    // Generar el token JWT con el rol del usuario
    const token = jwt.sign({ id: user[0].id, rol: user[0].rol }, secret, {
      expiresIn: "1h",
    });

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      userId: user[0].id,
      rol: user[0].rol,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
