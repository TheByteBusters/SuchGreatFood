import express from "express";
import cors from "cors";


// SDK de Mercado Pago
//import { MercadoPagoConfig, Preference } from 'mercadopago';
// Agrega credenciales
//const client = new MercadoPagoConfig({ 
    //accessToken: 'APP_USR-6878027478125365-091209-3cafa42ecdee0c015066a0c6bcc16ef6-1986448269', 
//});


const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("SERVER ACTIVADO");
});

app.post("/create_preference", async (req, res) => {
    try {
        const body = {
            items: [
                {
                title: req.body.title,
                quantity: Number(req.body.quantity),
                unit_price: Number(req.body.price),
                currency_id: "ARS",
                },
            ],
            back_urls: {
                success: "https://campus.frsr.utn.edu.ar/moodle/mod/quiz/view.php?id=47895",
                failure: "https://campus.frsr.utn.edu.ar/moodle/mod/quiz/view.php?id=47895",
                pending: "https://campus.frsr.utn.edu.ar/moodle/mod/quiz/view.php?id=47895",
            },
            auto_return: "approved",
        };
        const preference = new Preference(client);
        const result = await preference.create({ body });
        res.json({
            id: result.id,
        });
    } catch {
        console.log(error);
        res.status(500).json ({
            error: "Error al crear la preferencia"
        });
    }
})

app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto ${port}`);
});