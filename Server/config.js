// config.js
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  port: process.env.PORT || 3000,
  serverPort: process.env.SERVERPORT || 5000,
  mpToken: process.env.MP_TOKEN,
};

export const config3 = {
  JWT_SECRET: "tu_mensaje_jwt",
  ID_RECEPTOR_ESPECIAL: 1 // ID del usuario especial que recibe los mensajes
  // Otros valores de configuración
};
