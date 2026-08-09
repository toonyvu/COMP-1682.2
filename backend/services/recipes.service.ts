import { pool } from "../database.js";
import type {
  RecipeDetails,
  Ingredient,
  Step,
  RecipeDetailsEdit,
  Ingredients,
  Steps,
} from "../types/types.js";

export async function getRecipeDetails(id: number, mealkitId: number) {
  const recipeResult = await pool.query("SELECT * FROM recipes WHERE id = $1", [
    id,
  ]);

  if (recipeResult.rows.length === 0) {
    throw { status: 404, message: `No recipes found.` };
  }

  console.log("Fetching continues..");
  const stepsResult = await pool.query(
    "SELECT * FROM recipe_steps WHERE recipe_id = $1 ORDER BY step_number ASC",
    [id],
  );

  const mealkitResult = await pool.query(
    `
    SELECT * FROM mealkits
    WHERE id = $1`,
    [mealkitId],
  );

  const tagsResult = await pool.query(
    `
    SELECT t.id, t.name
    FROM tags t
    JOIN recipe_tags rt
    ON t.id = rt.tag_id
    WHERE rt.recipe_id = $1
    `,
    [id],
  );

  const ingredientsResult = await pool.query(
    `SELECT 
     ri.ingredient_id as id,
     ri.qty,
     ri.unit,
     i.name,
     i.category,
     i.unit_type,
     i.calories_per_100g,
     i.is_vegetarian,
     i.is_vegan,
     i.avatar_url
   FROM recipe_ingredients ri
   INNER JOIN ingredients i 
     ON ri.ingredient_id = i.id
   WHERE ri.recipe_id = $1`,
    [id],
  );

  const result = {
    ...recipeResult.rows[0],
    recipeingredients: ingredientsResult.rows,
    recipesteps: stepsResult.rows,
    mealkitData: mealkitResult.rows[0],
    recipeTags: tagsResult.rows,
  };

  return result;
}

export async function createRecipeService(
  recipe: RecipeDetails,
  ingredients: Ingredient[],
  steps: Step[],
) {
  const client = await pool.connect();
  const tagIds = recipe.tags.map(Number);

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

    if (tagIds.length > 0) {
      await client.query(
        `
        INSERT INTO recipe_tags(recipe_id, tag_id)
        SELECT $1, UNNEST($2::int[])
        RETURNING recipe_id, tag_id
        `,
        [recipeId, tagIds],
      );
    }

    const tagResult = await client.query(
      `
        SELECT t.id, t.name
        FROM recipe_tags rt
        JOIN tags t
        ON rt.tag_id = t.id
        WHERE rt.recipe_id = $1
        `,
      [recipeId],
    );

    const tags = tagResult.rows;

    let ingredientsList = [];
    for (const ingredient of ingredients) {
      const existing = await client.query(
        `
          SELECT id, name, category, unit_type, calories_per_100g, is_vegetarian, is_vegan, avatar_url
          FROM ingredients
          WHERE name = $1
        `,
        [ingredient.name],
      );

      if (existing.rows.length > 0) {
        await client.query(
          `
        INSERT INTO recipe_ingredients(recipe_id, ingredient_id, qty, unit)
        VALUES ($1, $2, $3, $4) RETURNING *
        `,
          [recipeId, existing.rows[0].id, ingredient.qty, ingredient.unit_type],
        );

        ingredientsList.push({
          ...existing.rows[0],
          qty: ingredient.qty,
          unit_type: ingredient.unit_type,
        });
        continue;
      }

      const ingredientResult = await client.query(
        `
        INSERT INTO ingredients(name, category, unit_type, calories_per_100g, is_vegetarian, is_vegan, avatar_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `,
        [
          ingredient.name,
          ingredient.category,
          ingredient.unit_type,
          ingredient.calories_per_100g,
          ingredient.is_vegetarian,
          ingredient.is_vegan,
          ingredient.avatar_url,
        ],
      );

      const createdIngredient = ingredientResult.rows[0];
      ingredientsList.push({
        ...createdIngredient,
        qty: ingredient.qty,
      });

      await client.query(
        `
        INSERT INTO recipe_ingredients(recipe_id, ingredient_id, qty, unit)
        VALUES ($1, $2, $3, $4)
        `,
        [recipeId, createdIngredient.id, ingredient.qty, ingredient.unit_type],
      );
    }

    const stepsList = [];
    for (const step of steps) {
      const stepResult = await client.query(
        `
        INSERT INTO recipe_steps(recipe_id, step_number, instruction)
        VALUES ($1, $2, $3) RETURNING *`,
        [recipeId, step.step_number, step.instruction],
      );
      const { recipe_id, ...filtered } = stepResult.rows[0];

      stepsList.push(filtered);
    }

    await client.query("COMMIT");

    return {
      recipe: { ...createdRecipe, tags },
      ingredients: ingredientsList,
      steps: stepsList,
    };
  } catch (err: any) {
    console.log(err);
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
}

export async function getAllRecipesAdmin(
  page: number,
  limit: number,
  search?: string,
) {
  const offset = (page - 1) * limit;

  if (!search?.trim()) {
    const recipeResult = await pool.query(
      `SELECT * FROM recipes ORDER BY id ASC LIMIT $1 OFFSET $2`,
      [limit, offset],
    );

    const countResult = await pool.query(
      `SELECT COUNT(*) as count FROM recipes`,
    );

    console.log(countResult.rows[0].count);

    return {
      recipes: recipeResult.rows,
      total: countResult.rows[0].count,
    };
  }

  const recipeResult = await pool.query(
    `SELECT * FROM recipes WHERE name ILIKE $1 ORDER BY id ASC LIMIT $2 OFFSET $3`,
    [`%${search}%`, limit, offset],
  );

  const countResult = await pool.query(
    `SELECT COUNT(*) as count FROM recipes WHERE name ILIKE $1`,
    [`%${search}%`],
  );

  return {
    recipes: recipeResult.rows,
    total: countResult.rows[0].count,
  };
}

export async function getRecipeAdmin(id: number) {
  const recipeResult = await pool.query(
    `
    SELECT
    r.id,
    r.name, 
    r.description, 
    r.avatar_url, 
    r.servings, 
    r.difficulty, 
    r.prep_time, 
    r.cooking_time,

    COALESCE(
    array_agg(t.name) FILTER (WHERE t.id IS NOT NULL),
    '{}'
    ) AS tags

    FROM recipes r
    LEFT JOIN recipe_tags rt
    ON r.id = rt.recipe_id

    LEFT JOIN tags t
    ON rt.tag_id = t.id

    WHERE r.id = $1

    GROUP BY r.id;
    `,
    [id],
  );

  const ingredientsResult = await pool.query(
    `
    SELECT
    ri.ingredient_id AS id,
    ri.qty,
    i.name,
    i.category,
    i.unit_type,
    i.calories_per_100g,
    i.is_vegetarian,
    i.is_vegan,
    i.avatar_url

    FROM recipe_ingredients ri
    LEFT JOIN ingredients i
    ON ri.ingredient_id = i.id

    WHERE ri.recipe_id = $1
    `,
    [id],
  );

  const stepsResult = await pool.query(
    `
    SELECT
    rs.id,
    rs.step_number,
    rs.instruction

    FROM recipe_steps rs

    WHERE rs.recipe_id = $1

    ORDER BY rs.step_number
    `,
    [id],
  );

  const { recipeId, ...recipe } = recipeResult.rows[0];

  return {
    recipe,
    ingredients: ingredientsResult.rows,
    steps: stepsResult.rows,
  };
}

export async function editRecipeService(
  recipe: RecipeDetailsEdit,
  ingredients: Ingredients,
  steps: Steps,
) {
  const client = await pool.connect();
  const tagIds = recipe.tags.map(Number);

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `
      UPDATE recipes
      SET 
      name = $1,
      description = $2,
      servings = $3,
      difficulty = $4,
      prep_time = $5, 
      cooking_time = $6,
      avatar_url = $7
      WHERE id = $8
      `,
      [
        recipe.name,
        recipe.description,
        recipe.servings,
        recipe.difficulty,
        recipe.prep_time,
        recipe.cooking_time,
        recipe.avatar_url,
        recipe.id,
      ],
    );

    if (result.rowCount === 0) {
      throw new Error("Recipe not found");
    }

    await client.query(
      `
      DELETE FROM recipe_tags
      WHERE recipe_id = $1
      `,
      [recipe.id],
    );

    for (const tagId of tagIds) {
      await client.query(
        `
        INSERT INTO recipe_tags (recipe_id, tag_id)
        VALUES ($1, $2)
        `,
        [recipe.id, tagId],
      );
    }

    await client.query(
      `
      DELETE FROM recipe_ingredients
      WHERE recipe_id = $1
      `,
      [recipe.id],
    );

    for (const ingredient of ingredients) {
      let ingredientId = ingredient.id;
      if (!ingredientId) {
        const result = await client.query(
          `
          INSERT INTO ingredients (
          name,
          category,
          unit_type,
          calories_per_100g,
          is_vegetarian,
          is_vegan,
          avatar_url
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)
          `,
          [
            ingredient.name,
            ingredient.category,
            ingredient.unit_type,
            ingredient.calories_per_100g,
            ingredient.is_vegetarian,
            ingredient.is_vegan,
            ingredient.avatar_url,
          ],
        );

        ingredientId = result.rows[0].id;
      }

      await client.query(
        `
        INSERT INTO recipe_ingredients (
          recipe_id,
          ingredient_id,
          qty,
          unit
        ) VALUES ($1, $2, $3, $4)
        `,
        [recipe.id, ingredientId, ingredient.qty, ingredient.unit_type],
      );
    }

    await client.query(
      `
      DELETE FROM recipe_steps
      WHERE recipe_id = $1
      `,
      [recipe.id],
    );

    for (const step of steps) {
      await client.query(
        `
        INSERT INTO recipe_steps (
        recipe_id,
        step_number,
        instruction
        ) VALUES ($1, $2, $3)
        `,
        [recipe.id, step.step_number, step.instruction],
      );
    }

    await client.query("COMMIT");
  } catch (err: any) {
    await client.query("ROLLBACK");
    throw new Error(err.message);
  } finally {
    await client.release();
  }
}
