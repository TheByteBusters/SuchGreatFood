// authMiddleware.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = "logueate_campeon"; // Asegúrate de usar la misma clave secreta

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user; // Almacena los datos del usuario en la solicitud
        next();
    });
};

export { verifyToken };
