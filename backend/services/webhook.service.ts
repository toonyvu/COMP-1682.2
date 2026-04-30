import Stripe from "stripe";
import { pool } from "../database.js";
import { getFullCart } from "./cart.service.js";

export async function handleStripeEvent(event: Stripe.Event) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.metadata?.userId;
      if (!userId) throw new Error("Missing userId in metadata");

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

        const orderResult = await client.query(
          `
          INSERT INTO orders (
            user_id,
            stripe_session_id,
            stripe_payment_intent_id,
            amount_total,
            currency,
            status
          )
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id
          `,
          [
            userId,
            session.id,
            session.payment_intent,
            session.amount_total,
            session.currency,
            "paid",
          ],
        );

        const orderId = orderResult.rows[0].id;

        const cart = await getFullCart(Number(userId));

        for (const item of cart.items) {
          await client.query(
            `
            INSERT INTO order_items (order_id, mealkit_id, quantity, price)
            VALUES ($1, $2, $3, $4)
            `,
            [orderId, item.mealkit_id, item.qty, item.price],
          );
        }

        await client.query(`DELETE FROM cart_items WHERE user_id = $1`, [
          userId,
        ]);

        await client.query("COMMIT");

        console.log(" Order + items saved:", orderId);
      } catch (err) {
        await client.query("ROLLBACK");
        throw err;
      } finally {
        client.release();
      }

      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
}
