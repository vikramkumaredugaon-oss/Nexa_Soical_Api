const db = require("../config/database");

class Profile {

    // Create Profile
    static async createProfile(data) {

        const sql = `
            INSERT INTO profiles (
                user_id,
                full_name,
                profile_image,
                bio,
                gender,
                dob
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(sql, [
            data.user_id,
            data.full_name,
            data.profile_image || null,
            data.bio || null,
            data.gender || null,
            data.dob || null
        ]);

        return result;
    }


    // Get Profile
    static async getProfileByUserId(userId) {

        const sql = `
            SELECT
                u.id,
                u.username,
                u.email,
                u.phone,

                p.full_name,
                p.profile_image,
                p.bio,
                p.gender,
                p.dob,
                p.followers_count,
                p.following_count,
                p.is_private

            FROM users u

            LEFT JOIN profiles p
            ON u.id = p.user_id

            WHERE u.id = ?
        `;

        const [rows] = await db.query(sql, [userId]);

        return rows[0];
    }


    // Update Profile
    static async updateProfile(userId, data) {

        const sql = `
            UPDATE profiles
            SET
                full_name = ?,
                bio = ?,
                gender = ?,
                dob = ?
            WHERE user_id = ?
        `;

        const [result] = await db.query(sql, [
            data.full_name,
            data.bio,
            data.gender,
            data.dob,
            userId
        ]);

        return result;
    }

}

module.exports = Profile;