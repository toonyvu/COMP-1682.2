import { pool } from "../database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomBytes, createHash } from "node:crypto";
import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY || "re_P4CVpk86_EbwmUnNsvEpby5nZxrRzaNiG",
);
import type { Profile } from "passport";

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
    throw { status: 401, message: "Incorrect Username or Password." };
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
    throw {
      status: 400,
      message: "Account currently in use.",
    };
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

    // Find if user already logged in with this federated account
    const existingFederatedUser = await client.query(
      `SELECT user_id FROM federated_credentials WHERE provider = $1 AND provider_id = $2`,
      [profile.provider, profile.id],
    );

    // If exists, get user from users table and return
    if (existingFederatedUser.rows.length > 0) {
      const userId = existingFederatedUser.rows[0].user_id;

      const user = await client.query(`SELECT * FROM users WHERE id = $1`, [
        userId,
      ]);

      await client.query("COMMIT");
      return user.rows[0];
    }

    //If not, find user by email

    const email = profile.emails?.[0]?.value ?? null;
    const avatar = profile.photos?.[0]?.value ?? null;

    //Find user by email

    const userResult = await client.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
    );

    // If no user, create then link to provider
    if (userResult.rows.length === 0) {
      const userCreateResult = await client.query(
        `INSERT INTO users (username, email, avatar_url)
        VALUES ($1, $2, $3) RETURNING *`,
        [profile.displayName, email, avatar],
      );

      const createdUserId = userCreateResult.rows[0].id;
      await client.query(
        `INSERT INTO federated_credentials (user_id, provider, provider_id)
        VALUES ($1, $2, $3)`,
        [createdUserId, profile.provider, profile.id],
      );
      await client.query("COMMIT");
      return userCreateResult.rows[0];
    } else {
      // If user exists, link to provider
      const existingUserId = userResult.rows[0].id;

      await client.query(
        `INSERT INTO federated_credentials (user_id, provider, provider_id)
        VALUES ($1, $2, $3)`,
        [existingUserId, profile.provider, profile.id],
      );

      await client.query("COMMIT");
      return userResult.rows[0];
    }
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    await client.release();
  }
}

export async function storeRefreshToken(userId: number, refreshToken: string) {
  const insertResult = await pool.query(
    `INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2) RETURNING ID`,
    [userId, refreshToken],
  );

  if (insertResult) return;
}

export async function getRefreshToken(refreshToken: string) {
  const getResult = await pool.query(
    `SELECT * FROM refresh_tokens WHERE token = $1`,
    [refreshToken],
  );

  if (getResult.rows.length === 0) return null;

  return getResult.rows[0];
}

export async function deleteRefreshToken(refreshToken: string) {
  await pool.query(`DELETE FROM refresh_tokens WHERE token = $1`, [
    refreshToken,
  ]);
}

export async function forgotPassword(email: string) {
  console.log("Waiting to send email");
  const userResult = await pool.query(
    `
    SELECT id, email FROM users WHERE email = $1`,
    [email],
  );
  console.log(userResult.rows.length);
  if (userResult.rows.length === 0) return;

  const userId = userResult.rows[0].id;
  const userEmail = userResult.rows[0].email;

  console.log(userId, userEmail);

  const token = randomBytes(32).toString("hex");

  const hash = createHash("sha256").update(token).digest("hex");

  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  await pool.query(
    `
    INSERT INTO reset_tokens (user_id, token_hash, expires_at)
    VALUES ($1, $2, $3)
    `,
    [userId, hash, expiresAt],
  );

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  console.log("Waiting to send email 2");

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: userEmail,
    subject: "Reset Your Password",
    html: `
    <!DOCTYPE html>
      <html>
        <body
          style="
            margin: 0;
            padding: 40px 0;
            background-color: #f5f5f5;
            font-family: Arial, Helvetica, sans-serif;
          "
        >
          <table
            align="center"
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="
              background: white;
              border-radius: 12px;
              padding: 40px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            "
          >
            <tr>
              <td align="center">
                <h1
                  style="
                    margin: 0;
                    color: #16a34a;
                    font-size: 32px;
                  "
                >
                  GoodRecipes
                </h1>

                <p
                  style="
                    color: #666;
                    margin-top: 8px;
                    font-size: 16px;
                  "
                >
                  Password Reset Request
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding-top: 32px;">
                <p
                  style="
                    font-size: 16px;
                    color: #333;
                    line-height: 1.6;
                  "
                >
                  We received a request to reset the password for your MealKit
                  account.
                </p>

                <p
                  style="
                    font-size: 16px;
                    color: #333;
                    line-height: 1.6;
                  "
                >
                  Click the button below to choose a new password.
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding: 36px 0;">
                <a
                  href="${resetLink}"
                  style="
                    display: inline-block;
                    background: #16a34a;
                    color: white;
                    text-decoration: none;
                    padding: 14px 28px;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: bold;
                  "
                >
                  Reset Password
                </a>
              </td>
            </tr>

            <tr>
              <td>
                <p
                  style="
                    color: #666;
                    font-size: 14px;
                    line-height: 1.6;
                  "
                >
                  This link will expire in
                  <strong>30 minutes</strong>.
                </p>

                <p
                  style="
                    color: #666;
                    font-size: 14px;
                    line-height: 1.6;
                  "
                >
                  If you didn't request a password reset, you can safely ignore this
                  email. Your password will remain unchanged.
                </p>
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding-top: 32px;
                  border-top: 1px solid #e5e5e5;
                "
              >
                <p
                  style="
                    color: #999;
                    font-size: 12px;
                    line-height: 1.5;
                  "
                >
                  If the button doesn't work, copy and paste this link into your
                  browser:
                </p>

                <p
                  style="
                    word-break: break-all;
                    color: #16a34a;
                    font-size: 12px;
                  "
                >
                  ${resetLink}
                </p>
              </td>
            </tr>
          </table>
        </body>
      </html>`,
  });
}
