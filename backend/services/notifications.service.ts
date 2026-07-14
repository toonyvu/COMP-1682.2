import { pool } from "../database.js";

export async function getAllNotificationsService(userId: number) {
  const notifsResult = await pool.query(
    `
        SELECT * FROM notifications
        WHERE user_id = $1
        `,
    [userId],
  );

  return notifsResult.rows;
}
