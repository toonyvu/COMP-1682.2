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
    `SELECT * FROM order_items WHERE order_id = $1`,
    [order.id],
  );

  return {
    order,
    items: itemsResult.rows,
  };
}
