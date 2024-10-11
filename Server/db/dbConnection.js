import mysql from "mysql2";

// Crear conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin", // Acá van los datos de la Base de DAtos
  database: "usuarios"
});

db.connect((err) => { // feedback de la conexión
  if (err) {
    console.error("Error conectando a MySQL:", err);
  } else {
    console.log("Conectado a la base de datos MySQL");
  }
});

// Exportar la conexión
export default db;
