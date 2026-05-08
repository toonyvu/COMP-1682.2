import { pool } from "../database.js";

export async function getUserInfo(id: number) {
  console.log("User route hit!");
  const userResult = await pool.query(`SELECT * FROM users WHERE id = $1`, [
    id,
  ]);

  if (userResult.rows.length === 0) return null;

  return userResult.rows[0];
}
