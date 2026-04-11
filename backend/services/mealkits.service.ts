import { pool } from "../database.js";

export async function getAllRecipes(page: number, limit: number, week: number) {
  const offset = (page - 1) * limit;
  const MealitResult = await pool.query(
    `SELECT t1.id AS recipe_id, 
    t1.name, t1.description, t1.avatar_url, t1.servings, t1.difficulty, t1.prep_time, t1.cooking_time,t1.created_at,
    t2.price, t2.id AS mealkit_id, t2.max_servings, t2.week_number 
    FROM recipes t1 
    INNER JOIN mealkits t2 
    ON t1.id = t2.recipe_id 
    WHERE t2.week_number = $1 
    ORDER BY t2.id 
    LIMIT $2 
    OFFSET $3`,
    [week, limit, offset],
  );

  const countResult = await pool.query(
    `SELECT COUNT(*) 
    FROM mealkits WHERE week_number = $1`,
    [week],
  );
  return {
    mealkits: MealitResult.rows,
    total: Number(countResult.rows[0].count),
    page,
    limit,
  };
}
