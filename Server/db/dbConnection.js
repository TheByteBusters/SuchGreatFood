import mysql from "mysql2/promise";
import { config } from "../config.js";  // Asegúrate de que config.js esté exportando correctamente el objeto config

// Si falta alguna de las configuraciones, detener la ejecución
if (!config.db.host || !config.db.user || !config.db.password || !config.db.database) {
    process.exit(1);
} else {
    console.log('Configuraciones de la base de datos cargadas correctamente');
}

// Configuración de la conexión a MySQL (usando un pool de conexiones)
const pool = mysql.createPool({
    host: config.db.host || 'localhost', //
    user: config.db.user || 'root', // usuario de MySQL
    password: config.db.password || 'admin', // contraseña de MySQL
    database: config.db.database || 'sgf', // base de datos
    waitForConnections: true,
    connectionLimit: 10, // número máximo de conexiones en el pool
    queueLimit: 0,
    connectTimeout: 10000  // Aumenta el timeout si es necesario
});

// Probar la conexión a MySQL
pool.getConnection()

    .then(connection => {
        console.log('Conectado a la base de datos MySQL');
        connection.release(); // Liberar la conexión
    })
    .catch(err => {
        console.error('Error conectando a la base de datos:', err.stack);
    });

// Exportar el pool de conexiones
export default pool;
