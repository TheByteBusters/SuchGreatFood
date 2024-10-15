import mysql from "mysql2/promise";

// pool de conexiones
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin", // Acá van los datos de la Base de Datos
  database: "usuarios"
});

// Exportar el pool de conexiones
export default pool;
