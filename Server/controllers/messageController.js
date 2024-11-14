import pool from '../db/dbConnection.js'; // Asegúrate de que esta ruta sea la correcta para tu conexión a la base de datos

export const message = async (req, res) => {
    const { name, email, message, userId } = req.body;

    if (!name || !email || !message || !userId) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios, incluyendo el ID de usuario.' });
    }

    try {
        const query = 'INSERT INTO mensajes (name, email, message, user_id) VALUES (?, ?, ?, ?)';
        await pool.execute(query, [name, email, message, userId]);
        res.status(200).json({ message: 'Mensaje guardado correctamente.' });
    } catch (error) {
        console.error('Error al guardar el mensaje:', error);
        res.status(500).json({ message: 'Error al guardar el mensaje.' });
    }
};

