import { pool } from "../database.js";
export async function getUserInfo(id) {
    const userResult = await pool.query(`SELECT * FROM users WHERE id = $1`, [
        id,
    ]);
    if (userResult.rows.length === 0)
        return null;
    const data = userResult.rows[0];
    return {
        ...data,
        avatar_url: data.avatar_url && data.avatar_url.trim() !== ""
            ? data.avatar_url
            : process.env.DEFAULT_AVATAR_URL,
    };
}
export async function updateUserInfo({ id, role, username, tier, email, bio, avatar_url, dob, created_at, address, first_name, last_name, phone, gender, }) {
    dob;
    try {
        const insertResult = await pool.query(`
      UPDATE users
      SET
        username = $1,
        first_name = $2,
        last_name = $3,
        email = $4,
        bio = $5,
        address = $6,
        phone = $7,
        avatar_url = $8,
        gender = $9,
        dob = $10
      WHERE id = $11
      RETURNING *;
      `, [
            username,
            first_name,
            last_name,
            email,
            bio,
            address,
            phone,
            avatar_url,
            gender,
            dob,
            id,
        ]);
        return insertResult.rows[0];
    }
    catch (err) {
        throw new Error(err.message);
    }
}
//# sourceMappingURL=users.service.js.map