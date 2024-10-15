import db from "../db/dbConnection.js";

// Obtener todos los productos
export const getProducts = async (req, res) => {
    const query = 'SELECT * FROM productos';

    try {
        const [results] = await db.query(query); // Usar await para obtener resultados
        res.json(results);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

