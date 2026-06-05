import { pool } from "../database.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY!);

export async function getOrder(sessionId: string) {
  const orderResult = await pool.query(
    `SELECT * FROM orders WHERE stripe_session_id = $1`,
    [sessionId],
  );

  if (orderResult.rows.length === 0) return null;

  const checkoutData = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent.payment_method"],
  });

  const order = orderResult.rows[0];

  const itemsResult = await pool.query(
    `SELECT t1.*, t2.price, t3.name, t3.avatar_url
     FROM order_items t1
     JOIN mealkits t2 ON t1.mealkit_id = t2.id
     JOIN recipes t3 ON t2.recipe_id = t3.id
     WHERE t1.order_id = $1`,
    [order.id],
  );

  const paymentIntent = checkoutData.payment_intent as Stripe.PaymentIntent;
  const paymentMethod = paymentIntent.payment_method as Stripe.PaymentMethod;

  return {
    order,
    items: itemsResult.rows,
    checkoutData,
    paymentType: paymentMethod.type,
    paymentBrand: paymentMethod.card?.brand ?? null,
    wallet: paymentMethod.card?.wallet?.type ?? null,
  };
}

export async function getAllOrders(userId: number) {
  const ordersResult = await pool.query(
    `SELECT
      o.*,
      COALESCE(
        json_agg(
          json_build_object(
            'mealkit_id', oi.mealkit_id,
            'qty', oi.qty,
            'price', oi.price,

            'week_number', m.week_number,
            'year', m.year,
            'max_servings', m.max_servings,

            'recipe', json_build_object(
              'id', r.id,
              'name', r.name,
              'description', r.description,
              'servings', r.servings,
              'difficulty', r.difficulty,
              'prep_time', r.prep_time,
              'cooking_time', r.cooking_time,
              'avatar_url', r.avatar_url
            )
          )
        ) FILTER (WHERE oi.id IS NOT NULL),
        '[]'::json
      ) AS items
    FROM orders o
    LEFT JOIN order_items oi
      ON o.id = oi.order_id
    LEFT JOIN mealkits m
      ON oi.mealkit_id = m.id
    LEFT JOIN recipes r
      ON m.recipe_id = r.id
    WHERE o.user_id = $1
    GROUP BY o.id;`,
    [userId],
  );

  const orders = ordersResult.rows.map((order) => ({
    ...order,
    amount_total: order.amount_total / 100,
  }));

  return orders;
}

export async function getOrderDetails(orderId: string, userId: number) {
  const result = await pool.query(
    `
    SELECT
      o.*,
      json_agg(
        json_build_object(
          'mealkit_id', oi.mealkit_id,
          'qty', oi.qty,
          'price', oi.price,
          'recipe', json_build_object(
            'id', r.id,
            'name', r.name,
            'avatar_url', r.avatar_url
          )
        )
      ) AS items
    FROM orders o
    JOIN order_items oi
      ON oi.order_id = o.id
    JOIN mealkits mk
      ON mk.id = oi.mealkit_id
    JOIN recipes r
      ON r.id = mk.recipe_id
    WHERE o.cus_order_id = $1
      AND o.user_id = $2
    GROUP BY o.id
    `,
    [orderId, userId],
  );

  return result.rows[0];
}
