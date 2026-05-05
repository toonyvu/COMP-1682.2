import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY!);

export async function createSubscriptionSession(
  userId: number,
  prodId: string,
) {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: prodId,
        quantity: 1,
      },
    ],
    success_url:
      "http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/checkout/cancel",
    metadata: {
      userId: userId.toString(),
    },
  });

  return session.url;
}
