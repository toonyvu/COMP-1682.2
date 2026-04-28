// Don't embed any keys in production code. This is an example.
// See https://docs.stripe.com/keys-best-practices.
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY);

stripe.products
  .create({
    name: "Starter Subscription",
    description: "$12/Month subscription",
  })
  .then((product) => {
    stripe.prices
      .create({
        unit_amount: 1200,
        currency: "usd",
        recurring: {
          interval: "month",
        },
        product: product.id,
      })
      .then((price) => {
        console.log(
          "Success! Here is your starter subscription product id: " +
            product.id,
        );
        console.log(
          "Success! Here is your starter subscription price id: " + price.id,
        );
      });
  });
