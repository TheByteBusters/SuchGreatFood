import bcrypt from "bcryptjs";
import db from "../db/dbConnection.js"; // Asegúrate de que esta ruta sea correcta

export const registerUser = async (req, res) => {
  console.log("Datos recibidos:", req.body); // Ver datos recibidos
  const { nombre_usuario, password, nombre, email, telefono } = req.body;

  try {
    // Verificar si el usuario ya existe por el nombre de usuario
    const [existingUser] = await db.query(  // Cambiado aquí
      "SELECT * FROM usuarios WHERE nombre_usuario = ?",
      [nombre_usuario]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertar el nuevo usuario en la base de datos
    const [result] = await db.query(  // Cambiado aquí
      "INSERT INTO usuarios (nombre_usuario, password, nombre, email, telefono) VALUES (?, ?, ?, ?, ?)",
      [nombre_usuario, hashedPassword, nombre, email, telefono]
    );

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar el usuario:", error); // Log del error para depuración
    res.status(500).json({ message: "Error al registrar el usuario", error: error.message });
  }
};
