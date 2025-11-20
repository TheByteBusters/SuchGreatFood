import { MercadoPagoConfig, Preference } from "mercadopago";
import { config } from "../config.js";

const client = new MercadoPagoConfig({
  accessToken: config.mpToken, // Debe ser TEST-xxxx
});

export const cartController = async (req, res) => {
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

      // ✔️ Payer fijo para sandbox (tu PM no necesita loguearse)
      payer: {
        email: "TESTUSER3611127152848202335@testuser.com",
      },
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });

    console.log("======== PREFERENCE RESULT ========");
    console.log(result);
    console.log("===================================");

    res.json({ id: result.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear la preferencia" });
  }
};
