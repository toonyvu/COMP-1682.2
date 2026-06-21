import Stripe from "stripe";
import { pool } from "../database.js";
import { getFullCart } from "./cart.service.js";
const stripe = new Stripe(process.env.STRIPE_API_KEY!);

function generateRandomString(length = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function handleStripeEvent(event: Stripe.Event) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const address = session.collected_information?.shipping_details?.address;

      if (session.mode === "payment") {
        const userId = session.metadata?.userId;
        if (!userId) throw new Error("Missing userId in metadata");

        const paymentIntentId = session.payment_intent as string;
        const paymentIntent =
          await stripe.paymentIntents.retrieve(paymentIntentId);

        const paymentMethodId = (await paymentIntent).payment_method as string;
        const paymentMethod =
          await stripe.paymentMethods.retrieve(paymentMethodId);

        if (!address) throw new Error("Address information not found!");
        const line_1 = address.line1;
        const line_2 = address.line2;
        const city = address.city;
        const state = address.state;
        const postal_code = address.postal_code;
        const country = address.country;

        const existing = await pool.query(
          `SELECT id FROM orders WHERE stripe_session_id = $1`,
          [session.id],
        );

        if (existing.rows.length > 0) {
          console.log("Order already exists");
          return;
        }

        const client = await pool.connect();

        try {
          await client.query("BEGIN");
          let existing = true;
          let customerId = "";

          while (existing) {
            customerId = generateRandomString();
            const customerOrderResult = await client.query(
              "SELECT id FROM orders WHERE cus_order_id = $1",
              [customerId],
            );

            if (customerOrderResult.rows.length === 0) {
              existing = false;
            }
          }

          const orderResult = await client.query(
            `
          INSERT INTO orders (
            user_id,
            stripe_session_id,
            stripe_payment_intent_id,
            amount_total,
            currency,
            status,
            cus_order_id,
            payment_method,
            card_brand,
            line_1,
            line_2,
            city,
            state,
            postal_code,
            country
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
          RETURNING id
          `,
            [
              userId,
              session.id,
              session.payment_intent,
              session.amount_total,
              session.currency,
              "paid",
              `ORD-${customerId}`,
              paymentMethod.type,
              paymentMethod.card?.brand ?? null,
              line_1,
              line_2,
              city,
              state,
              postal_code,
              country,
            ],
          );

          const orderId = orderResult.rows[0].id;

          const cart = await getFullCart(Number(userId));

          for (const item of cart.items) {
            await client.query(
              `
            INSERT INTO order_items (order_id, mealkit_id, qty, price)
            VALUES ($1, $2, $3, $4)
            `,
              [orderId, item.mealkit_id, item.qty, item.price],
            );
          }

          await client.query(
            `
          DELETE FROM cart_items
          WHERE cart_id IN (
          SELECT id FROM cart WHERE user_id = $1);
          `,
            [userId],
          );

          await client.query("COMMIT");

          console.log(" Order + items saved:", orderId);
        } catch (err) {
          await client.query("ROLLBACK");
          throw err;
        } finally {
          client.release();
        }

        break;
      } else if (session.mode === "subscription") {
        const subscriptionId = session.subscription as string;
        const subscription =
          await stripe.subscriptions.retrieve(subscriptionId);
        const userId = session.metadata?.userId;
        const tier = session.metadata?.tier;

        if (!userId || !tier) {
          throw new Error("Missing user data or tier data in metadata.");
        }

        const existing = await pool.query(
          "SELECT id FROM subscriptions WHERE stripe_subscription_id = $1",
          [subscription.id],
        );

        if (existing.rows.length > 0) {
          console.log("Order already exists!");
          return;
        }

        const client = await pool.connect();

        try {
          await client.query("BEGIN");

          const subscriptionResult = await client.query(
            `
            INSERT INTO subscriptions (user_id, tier, status, stripe_customer_id, stripe_subscription_id, stripe_price_id, current_period_end, cancel_at_period_end, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
            `,
            [
              userId,
              tier,
              subscription.status,
              subscription.customer,
              subscription.id,
              subscription.items.data[0]?.plan.id,
              subscription.items.data[0]?.current_period_end,
              subscription.cancel_at_period_end,
              new Date(),
            ],
          );

          const subscriptionId = subscriptionResult.rows[0].id;

          await client.query("COMMIT");
          console.log("Subscription + items saved:", subscriptionId);
        } catch (err) {
          console.log(err);
          await client.query("ROLLBACK");
        } finally {
          client.release();
        }
      }
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
}
