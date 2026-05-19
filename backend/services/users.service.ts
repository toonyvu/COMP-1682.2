import { pool } from "../database.js";

type userInformation = {
  id: string;
  role: string;
  username: string;
  tier: string | "free" | "premium" | "deluxe";
  email: string;
  bio: string;
  avatar_url: string;
  dob: string;
  created_at: string;
  address: string;
  first_name: string;
  last_name: string;
  phone: string;
};

export async function getUserInfo(id: number) {
  console.log("User route hit!");
  const userResult = await pool.query(`SELECT * FROM users WHERE id = $1`, [
    id,
  ]);

  if (userResult.rows.length === 0) return null;

  return userResult.rows[0];
}

export async function updateUserInfo({
  id,
  role,
  username,
  tier,
  email,
  bio,
  avatar_url,
  dob,
  created_at,
  address,
  first_name,
  last_name,
  phone,
}: userInformation) {
  try {
    const insertResult = await pool.query(
      `
      UPDATE users
      SET
        username = $1,
        first_name = $2,
        last_name = $3,
        email = $4,
        bio = $5,
        address = $6,
        phone = $7,
        avatar_url = $8
      WHERE id = $9
      RETURNING *;
      `,
      [
        username,
        first_name,
        last_name,
        email,
        bio,
        address,
        phone,
        avatar_url,
        id,
      ],
    );

    return insertResult.rows[0];
  } catch (err: any) {
    throw new Error(err.message);
  }
}
