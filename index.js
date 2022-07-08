const express = require("express");

const dotenv = require("dotenv");
const PORT = process.env.PORT || 3001;

const bodyParser = require("body-parser");
const cors = require("cors");

const env = dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;


  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
