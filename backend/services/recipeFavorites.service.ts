import { pool } from "../database.js";
export async function addRecipeFavorite(id: number, userId: number) {
  await pool.query(
    "INSERT INTO recipe_favorites (recipe_id, user_id) VALUES ($1, $2)",
    [id, userId],
  );
}

export async function removeRecipeFavorite(id: number, userId: number) {
  const res = await pool.query(
    "DELETE FROM recipe_favorites WHERE recipe_id = $1 AND user_id = $2",
    [id, userId],
  );

  return res.rowCount;
}
