import { pool } from "../database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { Profile } from "passport-google-oauth20";

export async function login(email: string, password: string) {
  if (!email || !password) {
    throw { status: 400, message: "Incorrect username or password." };
  }

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (result.rows.length === 0) {
    throw { status: 400, message: "Cannot find account." };
  }

  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw { status: 401, message: "Incorrect Password." };
  }

  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" },
  );

  const refreshToken = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "7d" },
  );

  await pool.query(
    "INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2)",
    [user.id, refreshToken],
  );

  const { password: _, ...safeUser } = user;

  return {
    accessToken,
    refreshToken,
    user: safeUser,
    role: safeUser.role,
  };
}

export async function signup(
  username: string,
  email: string,
  password: string,
) {
  if (!email || !username || !password) {
    console.log("Error with data");
    throw { status: 400, message: "Please fill in all information." };
  }

  // Check if email exists already
  const emailresult: any = await pool.query(
    "SELECT 1 FROM users WHERE email = $1",
    [email],
  );

  if (emailresult.rows.length > 0) {
    throw { status: 400, message: "Account already exists." };
  }

  // Hashing password with Bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into DB
  const result = await pool.query(
    "INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
    [username, email, hashedPassword],
  );

  return result.rows[0];
}

export async function findOrCreateExistingUser(profile: Profile) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const existingUser = await client.query(
      `SELECT user_id FROM federated_credentials WHERE provider = $1 AND provider_id = $2`,
      [profile.provider, profile.id],
    );

    if (existingUser.rows.length > 0) {
      const userId = existingUser.rows[0].user_id;

      const user = await client.query(`SELECT * FROM users WHERE id = $1`, [
        userId,
      ]);

      await client.query("COMMIT");
      return user.rows[0];
    }

    const email = profile.emails?.[0]?.value ?? null;
    const avatar = profile.photos?.[0]?.value ?? null;

    const newUserResult = await client.query(
      `INSERT INTO users (username, email, avatar_url) VALUES ($1, $2, $3) RETURNING id, username, email, avatar_url`,
      [profile.displayName, email, avatar],
    );

    const userId = newUserResult.rows[0].id;

    await client.query(
      `INSERT INTO federated_credentials (user_id, provider, provider_id) VALUES ($1, $2, $3)`,
      [userId, profile.provider, profile.id],
    );

    await client.query("COMMIT");
  } catch (err: any) {
    await client.query("ROLLBACK");
    throw new Error(err.message);
  } finally {
    client.release();
  }
}

export async function storeRefreshToken(userId: number, refreshToken: string) {
  const insertResult = await pool.query(
    `INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2) RETURNING ID`,
    [userId, refreshToken],
  );

  if (insertResult) return;
}
