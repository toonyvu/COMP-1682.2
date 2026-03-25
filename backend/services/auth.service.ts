import { pool } from "../database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "2h" },
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
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
