import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

//const app = express();
//const port = process.env.PORT || 3000;

//app.use(cors());
//app.use(express.json());

if (!process.env.DB_HOST) {
    console.error("Error: falta la variable de entorno DB_HOST para la configuración de la base de datos.");
}

if (!process.env.DB_USER) {
    console.error("Error: falta la variable de entorno DB_USER para la configuración de la base de datos.");
}

if (!process.env.DB_PASSWORD) {
    console.error("Error: falta la variable de entorno DB_PASSWORD para la configuración de la base de datos.");
}

if (!process.env.DB_NAME) {
    console.error("Error: falta la variable de entorno DB_NAME para la configuración de la base de datos.");
}

// Si falta alguna de las variables de entorno, detener la ejecución
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    process.exit(1);
} else {
    console.log('Variables de entorno cargadas correctamente')
}



// Configuración de la conexión a MySQL (usando un pool de conexiones)
const pool = mysql.createPool({
    //host: process.env.DB_HOST || '192.168.0.107', // ip
    //user: process.env.DB_USER || 'Brian', // usuario de MySQL
    //password: process.env.DB_PASSWORD || 'Brian12345', // contraseña de MySQL
    //database: process.env.DB_NAME || 'basededatos1', // base de datos
    host: "localhost",
    user: "root",
    password: "admin", // Acá van los datos de la Base de Datos
    database: "usuarios",
    waitForConnections: true,
    connectionLimit: 10, // número máximo de conexiones en el pool
    queueLimit: 0
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

//app.get("/", (req, res) => {//
//    res.send("SERVER ACTIVADO");
//});

//app.listen(port, () => {
//    console.log(`El servidor está corriendo en el puerto ${port}`);
//});

// Exportar el pool de conexiones
export default pool;
