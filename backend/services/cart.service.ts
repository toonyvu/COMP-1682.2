import { pool } from "../database.js";

async function createCart(userId: number) {
  const createResult = await pool.query(
    "INSERT INTO cart(user_id) VALUES ($1) RETURNING *",
    [userId],
  );

  return createResult.rows[0];
}

export async function getOrCreateCart(userId: number) {
  const findResult = await pool.query("SELECT * FROM cart WHERE user_id = $1", [
    userId,
  ]);

  if (findResult.rowCount === 0) {
    const cart = await createCart(userId);
    return cart;
  } else {
    return findResult.rows[0];
  }
}

export async function addItem(userId: number, mealkitId: number) {
  const cart = await getOrCreateCart(userId);
  const cartId = cart.id;

  const existing = await pool.query(
    "SELECT id FROM cart_items WHERE cart_id = $1 AND mealkit_id = $2",
    [cartId, mealkitId],
  );

  if ((existing.rowCount ?? 0) > 0) {
    await pool.query(
      "UPDATE cart_items SET qty = qty + 1 WHERE mealkit_id = $1 AND cart_id = $2 RETURNING *",
      [mealkitId, cartId],
    );
  } else {
    await pool.query(
      "INSERT INTO cart_items(cart_id, mealkit_id, qty) VALUES ($1, $2, 1) RETURNING *",
      [cartId, mealkitId],
    );
  }
}

export async function removeItem(userId: number, mealkitId: number) {
  const cart = await getOrCreateCart(userId);
  const cartId = cart.id;

  const existing = await pool.query(
    "SELECT qty FROM cart_items WHERE cart_id = $1 AND mealkit_id = $2",
    [cartId, mealkitId],
  );

  if ((existing.rowCount ?? 0) === 0) return;

  const qty = existing.rows[0].qty;

  if (qty > 1) {
    await pool.query(
      "UPDATE cart_items SET qty = qty - 1 WHERE mealkit_id = $1 AND cart_id = $2 RETURNING *",
      [mealkitId, cartId],
    );
  } else {
    await deleteItem(userId, mealkitId);
  }
}

export async function updateQty(
  userId: number,
  mealkitId: number,
  qty: number,
) {
  const cart = await getOrCreateCart(userId);
  const cartId = cart.id;

  const checkItem = await pool.query(
    "SELECT id FROM cart_items WHERE cart_id = $1 AND mealkit_id = $2",
    [cartId, mealkitId],
  );

  if ((checkItem.rowCount ?? 0) === 0) {
    throw new Error("Item not found in cart.");
  }

  if (qty <= 0) {
    const removeResult = await deleteItem(userId, mealkitId);

    if ((removeResult ?? 0) <= 0) {
      throw new Error("Unable to delete item from cart.");
    } else {
      return null;
    }
  } else {
    await pool.query(
      "UPDATE cart_items SET qty = $1 WHERE mealkit_id = $2 AND cart_id = $3 RETURNING *",
      [qty, mealkitId, cartId],
    );
  }
}

export async function deleteItem(userId: number, mealkitId: number) {
  const cart = await getOrCreateCart(userId);
  const cartId = cart.id;

  const checkItem = await pool.query(
    "SELECT id FROM cart_items WHERE cart_id = $1 AND mealkit_id = $2",
    [cartId, mealkitId],
  );

  if ((checkItem.rowCount ?? 0) === 0) {
    throw new Error("Item not found in cart.");
  }

  const deleteResult = await pool.query(
    "DELETE FROM cart_items WHERE mealkit_id = $1 AND cart_id = $2",
    [mealkitId, cartId],
  );

  return deleteResult.rowCount;
}

export async function getFullCart(userId: number) {
  const cart = await getOrCreateCart(userId);
  const cartId = cart.id;

  const cartItems = await pool.query(
    `SELECT t1.id AS cart_item_id, t1.qty, t2.id 
    AS mealkit_id, t2.price, t2.week_number, t3.name, t3.avatar_url
    FROM cart_items t1 
    INNER JOIN mealkits t2 
    ON t1.mealkit_id = t2.id 
    INNER JOIN recipes t3 
    ON t2.recipe_id = t3.id 
    WHERE t1.cart_id = $1`,
    [cartId],
  );

  const items = cartItems.rows;

  const totalPrice = items.reduce((sum, item) => {
    return sum + Number(item.item_total);
  }, 0);

  return {
    items,
  };
}

export async function clearCart(userId: number) {
  const cart = await getOrCreateCart(userId);

  const cartId = cart.id;

  await pool.query("DELETE * FROM cart_items WHERE cartId = $1", [cartId]);
}
