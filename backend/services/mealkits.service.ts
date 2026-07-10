import { pool } from "../database.js";

import type { mealkitData } from "../types/types.js";
import { convertToDate } from "../utils/dates.js";

export async function getAllMealkits(
  page: number,
  limit: number,
  week: number,
  search: string,
  ids: number[],
) {
  console.log(ids);
  const offset = (page - 1) * limit;

  if (ids.length > 0) {
    const mealkitResult = await pool.query(
      `SELECT t1.id AS recipe_id, 
      t1.name, 
      t1.description, 
      t1.avatar_url, 
      t1.servings, 
      t1.difficulty, 
      t1.prep_time, 
      t1.cooking_time, 
      t1.created_at,

      t2.price, 
      t2.id AS mealkit_id, 
      t2.max_servings, 
      t2.week_number, 

      COALESCE(
        array_agg(DISTINCT tag.name)
        FILTER (WHERE tag.id IS NOT NULL), '{}'
      ) as tags
      
      FROM recipes t1 

      INNER JOIN mealkits t2 
      ON t1.id = t2.recipe_id 

      LEFT JOIN recipe_tags rt
      ON t1.id = rt.recipe_id

      LEFT JOIN tags tag
      ON rt.tag_id = tag.id

      WHERE t2.week_number = $1 
      AND t1.name ILIKE $2
      AND rt.tag_id = ANY($3::int[])

      GROUP BY
      t1.id,
      t2.id

      ORDER BY t2.id 
      LIMIT $4 
      OFFSET $5`,
      [week, `%${search}%`, ids, limit, offset],
    );

    const countResult = await pool.query(
      `
        SELECT COUNT(DISTINCT t2.id)
        FROM recipes t1

        INNER JOIN mealkits t2
            ON t1.id = t2.recipe_id

        LEFT JOIN recipe_tags rt
            ON t1.id = rt.recipe_id

        WHERE t2.week_number = $1
        AND t1.name ILIKE $2
        AND rt.tag_id = ANY($3::int[]);
      `,
      [week, `%${search}%`, ids],
    );
    return {
      mealkits: mealkitResult.rows,
      total: Number(countResult.rows[0].count),
      page,
      limit,
    };
  } else {
    const MealitResult = await pool.query(
      `SELECT t1.id AS recipe_id, 
    t1.name, 
    t1.description, 
    t1.avatar_url, 
    t1.servings, 
    t1.difficulty, 
    t1.prep_time, 
    t1.cooking_time, 
    t1.created_at,

    t2.price, 
    t2.id AS mealkit_id, 
    t2.max_servings, 
    t2.week_number, 

    COALESCE(
      array_agg(DISTINCT tag.name)
      FILTER (WHERE tag.id IS NOT NULL), '{}'
    ) as tags
    
    FROM recipes t1 

    INNER JOIN mealkits t2 
    ON t1.id = t2.recipe_id 

    LEFT JOIN recipe_tags rt
    ON t1.id = rt.recipe_id

    LEFT JOIN tags tag
    ON rt.tag_id = tag.id

    WHERE t2.week_number = $1 
    AND t1.name ILIKE $2

    GROUP BY
    t1.id,
    t2.id

    ORDER BY t2.id 
    LIMIT $3 
    OFFSET $4`,
      [week, `%${search}%`, limit, offset],
    );

    const countResult = await pool.query(
      `
      SELECT COUNT(*)
      FROM recipes t1
      INNER JOIN mealkits t2
        ON t1.id = t2.recipe_id
      WHERE t2.week_number = $1
      AND t1.name ILIKE $2
      `,
      [week, `%${search}%`],
    );
    return {
      mealkits: MealitResult.rows,
      total: Number(countResult.rows[0].count),
      page,
      limit,
    };
  }
}

export async function createMealkit(mealkitData: mealkitData) {
  const available_from = convertToDate(mealkitData.available_from);
  const available_until = convertToDate(mealkitData.available_until);

  const insertMealkitResult = await pool.query(
    `INSERT INTO mealkits(recipe_id, week_number, year, price, available_from, available_until, max_servings) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
    [
      mealkitData.recipe_id,
      mealkitData.week_number,
      mealkitData.year,
      mealkitData.price,
      available_from,
      available_until,
      mealkitData.max_servings,
    ],
  );

  return insertMealkitResult.rows;
}
