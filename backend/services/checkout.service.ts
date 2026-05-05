import Stripe from "stripe";
import { getFullCart } from "./cart.service.js";

const stripe = new Stripe(process.env.STRIPE_API_KEY!);

export async function createCheckoutSession(userId: number) {
  const cart = await getFullCart(userId);

  const line_items = cart.items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100),
    },

    quantity: item.qty,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    shipping_address_collection: {
      allowed_countries: ["VN", "US", "GB", "SG", "CN", "JP", "CA"],
    },
    success_url:
      "http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/checkout/cancel",
    metadata: {
      userId: userId.toString(),
    },
  });

  return session.url;
}
