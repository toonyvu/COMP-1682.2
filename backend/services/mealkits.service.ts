import { pool } from "../database.js";

export async function getAllRecipes(page: number, limit: number) {
  const offset = (page - 1) * limit;
  const result = await pool.query("SELECT * FROM recipes LIMIT $1 OFFSET $2", [
    limit,
    offset,
  ]);

  const countResult = await pool.query("SELECT COUNT(*) FROM recipes");
  return {
    mealkits: result.rows,
    total: Number(countResult.rows[0].count),
    page,
    limit,
  };
}
