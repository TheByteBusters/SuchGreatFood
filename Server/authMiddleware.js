// authMiddleware.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = "logueate_campeon"; // Asegúrate de usar la misma clave secreta
const JWT_SECRET_ADMIN = "relogueate_maquina";

const verifyToken = (req, res, next) => {
    console.log("Verificando token"); // Verificación de ingreso al middleware
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        console.log("Token no proporcionado en el encabezado");
        return res.status(403).json({ error: "Token no proporcionado" });
    }

    // Obtener el token sin "Bearer"
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Error al verificar el token:", err.message); // Muestra el error específico
            return res.status(403).json({ error: "Token inválido o expirado" });
        }
        req.user = user; // Guardar datos de usuario en req
        console.log("Usuario autenticado:", user); // Confirmación de usuario decodificado
        next();
    });

    console.log(token)
};

const verifyTokenAdmin = (req, res, next) => {
    console.log("Verificando token"); // Verificación de ingreso al middleware
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        console.log("Token no proporcionado en el encabezado");
        return res.status(403).json({ error: "Token no proporcionado" });
    }

    // Obtener el token sin "Bearer"
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET_ADMIN, (err, user) => {
        if (err) {
            console.log("Error al verificar el token:", err.message); // Muestra el error específico
            return res.status(403).json({ error: "Token inválido o expirado" });
        }
        req.user = user; // Guardar datos de usuario en req
        console.log("Administrador autenticado:", user); // Confirmación de usuario decodificado
        next();
    });

    console.log(token)
};

export { verifyToken, verifyTokenAdmin };
