import { pool } from "../database.js";

export async function getRecipeDetails(id: number, userId: number) {
  const recipeResult = await pool.query("SELECT * FROM recipes WHERE id = $1", [
    id,
  ]);

  console.log(recipeResult.rows);
  console.log("Found recipe!");
  if (recipeResult.rows.length === 0) {
    throw { status: 404, message: `No recipes found.` };
  }

  console.log("Fetching continues..");
  const stepsResult = await pool.query(
    "SELECT * FROM recipe_steps WHERE recipe_id = $1 ORDER BY step_number ASC",
    [id],
  );

  console.log(stepsResult.rows);
  console.log("Found steps!");

  const ingredientsResult = await pool.query(
    `SELECT 
     ri.ingredient_id,
     ri.qty,
     ri.unit,
     i.name,
     i.category,
     i.unit_type,
     i.calories_per_100g,
     i.is_vegetarian,
     i.is_vegan
   FROM recipe_ingredients ri
   INNER JOIN ingredients i 
     ON ri.ingredient_id = i.id
   WHERE ri.recipe_id = $1`,
    [id],
  );

  const favoriteResult = await pool.query(
    "SELECT * FROM recipe_favorites WHERE user_id = $1 AND recipe_id = $2",
    [userId, id],
  );

  console.log("Found favorite!");

  const isFavorited = favoriteResult.rows.length > 0;

  const result = {
    ...recipeResult.rows[0],
    recipeingredients: ingredientsResult.rows,
    recipesteps: stepsResult.rows,
    isFavorited,
  };

  return result;
}
