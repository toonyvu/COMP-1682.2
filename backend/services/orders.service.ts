import { pool } from "../database.js";

export async function getOrder(sessionId: string) {
  const orderResult = await pool.query(
    `SELECT * FROM orders WHERE stripe_session_id = $1`,
    [sessionId],
  );

  if (orderResult.rows.length === 0) {
    return null;
  }

  const order = orderResult.rows[0];

  const itemsResult = await pool.query(
    `SELECT t1.*, t2.price, t3.name, t3.avatar_url
    FROM order_items t1
    JOIN mealkits t2
    ON t1.mealkit_id = t2.id
    JOIN recipes t3
    ON t2.recipe_id = t3.id
    WHERE t1.order_id = $1`,
    [order.id],
  );

  return {
    order,
    items: itemsResult.rows,
  };
}
