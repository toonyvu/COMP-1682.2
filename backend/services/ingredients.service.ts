import { pool } from "../database.js";

export async function getAllIngredientsService(page: number, limit: number) {
  console.log(limit);
  const offset = (page - 1) * limit;
  const result = await pool.query(
    `
        SELECT * FROM ingredients
        LIMIT $1
        OFFSET $2
    `,
    [limit, offset],
  );

  const countResult = await pool.query(`
    SELECT COUNT(*) AS count
    FROM ingredients
`);

  const total = Number(countResult.rows[0].count);

  return {
    ingredients: result.rows,
    total: total,
  };
}
