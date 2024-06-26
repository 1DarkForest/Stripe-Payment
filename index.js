const express = require("express");
const stripe = require("stripe")("sk_test_51PUk2O0941M35VzsBOSMLab8iX36mgCzMoQBrvAYYxu5GhWYyjxeSglukHHnfHR7UDXfdl4pncyQqA72mKJ8EwmW00Ucrj4Iwv");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post("/create-payment-intent", async (req, res) => {
  const { amount, currency, paymentMethodId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirmation_method: "manual",
      confirm: true,
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server is running on port 3000"));
