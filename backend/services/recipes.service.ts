import { pool } from "../database.js";
import type { RecipeDetails, Ingredient, Step } from "../types/types.js";

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

export async function createRecipeService(
  recipe: RecipeDetails,
  ingredients: Ingredient[],
  steps: Step[],
) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const recipeResult = await client.query(
      `
      INSERT INTO recipes(name, description, servings, difficulty, prep_time, cooking_time, avatar_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING * 
      `,
      [
        recipe.name,
        recipe.description,
        recipe.servings,
        recipe.difficulty,
        recipe.prep_time,
        recipe.cooking_time,
        recipe.avatar_url,
      ],
    );

    const createdRecipe = recipeResult.rows[0];

    const recipeId = createdRecipe.id;
    for (const ingredient of ingredients) {
      const existing = await client.query(
        `
          SELECT id, name, category, unit_type, calories_per_100g, is_vegetarian, is_vegan
          FROM ingredients
          WHERE name = $1
        `,
        [ingredient.name],
      );

      if (existing.rows.length > 0) {
        await client.query(
          `
        INSERT INTO recipe_ingredients(recipe_id, ingredient_id, qty, unit)
        VALUES ($1, $2, $3, $4)
        `,
          [recipeId, existing.rows[0].id, ingredient.qty, ingredient.unit_type],
        );

        continue;
      }

      const ingredientResult = await client.query(
        `
        INSERT INTO ingredients(name, category, unit_type, calories_per_100g, is_vegetarian, is_vegan)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `,
        [
          ingredient.name,
          ingredient.category,
          ingredient.unit_type,
          ingredient.calories_per_100g,
          ingredient.is_vegetarian,
          ingredient.is_vegan,
        ],
      );

      const createdIngredient = ingredientResult.rows[0];

      await client.query(
        `
        INSERT INTO recipe_ingredients(recipe_id, ingredient_id, qty, unit)
        VALUES ($1, $2, $3, $4)
        `,
        [recipeId, createdIngredient.id, ingredient.qty, ingredient.unit_type],
      );
    }

    for (const step of steps) {
      await client.query(
        `
        INSERT INTO recipe_steps(recipe_id, step_number, instruction)
        VALUES ($1, $2, $3)`,
        [recipeId, step.step_number, step.instruction],
      );
    }

    await client.query("COMMIT");

    return {
      recipe: createdRecipe,
    };
  } catch (err: any) {
    console.log(err);
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
}
