export const loginUser = (req, res) => {
  const { nombre_usuario, password } = req.body;
  console.log(`Intento de inicio de sesión para el usuario: ${nombre_usuario}`);

  db.query("SELECT * FROM users WHERE nombre_usuario = ?", [nombre_usuario], async (err, results) => {
    if (err) {
      console.error('Error en la base de datos:', err);
      return res.status(500).json({ message: "Error al iniciar sesión" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, results[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: results[0].id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Inicio de sesión exitoso", token });
  });
};
