import type { Request, Response } from "express";
import Stripe from "stripe";
import { handleStripeEvent } from "../services/webhook.service.js";

const stripe = new Stripe(process.env.STRIPE_API_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function stripeWebhookController(req: Request, res: Response) {
  console.log("Received webhook event!");
  const signature = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
  } catch (err: any) {
    console.error("Webhook verification failed.", err.message);
    return res.status(400).send("Webhook Error.");
  }

  try {
    await handleStripeEvent(event);

    res.status(200).json({ received: true });
  } catch (err: any) {
    console.error("Webhook handling failed.", err.message);
    return res.status(500).json({ message: "Webhook processing failed." });
  }
}
