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

// Obtener un producto por ID
export const getProductById = async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM productos WHERE id = ?';

    try {
        const [results] = await db.query(query, [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(results[0]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
    const { category, productName, price, details, ingredients, img  } = req.body;

    if (!category || !productName || !price) {
        return res.status(400).json({ error: 'El nombre y el precio son obligatorios' });
    }

    const query = 'INSERT INTO productos (category, productName, price, details, ingredients, img) VALUES (?, ?, ?, ?, ?, ?)';

    try {
        const [result] = await db.query(query, [category, productName, price, details, ingredients, img]);
        res.status(201).json({ message: 'Producto creado con éxito', productId: result.insertId });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al crear el producto' });
    }
};

// Actualizar un producto existente
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { category, productName, price, details, ingredients, img } = req.body;

    if (!productName || !price) {
        return res.status(400).json({ error: 'El nombre y el precio son obligatorios' });
    }

    const query = 'UPDATE productos SET category = ?, productName = ?, price = ?, details = ?, ingredients = ?, img = ? WHERE id = ?';

    try {
        const [result] = await db.query(query, [category, productName, price, details, ingredients, img, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto actualizado con éxito' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM productos WHERE id = ?';

    try {
        const [result] = await db.query(query, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado con éxito' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};