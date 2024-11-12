import { MercadoPagoConfig, Preference } from 'mercadopago';
import { config } from '../config.js';

const client = new MercadoPagoConfig({
    accessToken: config.mpToken,
});

export const cartController = async (req,res) => {
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
        };
        const preference = new Preference(client);
        const result = await preference.create({ body });
        res.json({ id: result.id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al crear la preferencia" });
    }
};