const db = require("../config/database");

class User {

    // Create User
    static async createUser(data) {

        const sql = `
            INSERT INTO users (
                username,
                email,
                phone,
                password,
                device_token
            )
            VALUES (?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(sql, [
            data.username,
            data.email,
            data.phone,
            data.password,
            data.device_token,
        ]);

        return result;
    }

    // Find by Email
    static async findByEmail(email) {

        const sql = `
            SELECT *
            FROM users
            WHERE email = ?
            LIMIT 1
        `;

        const [rows] = await db.query(sql, [email]);

        return rows[0];
    }

    // Find by Username
    static async findByUsername(username) {

        const sql = `
            SELECT *
            FROM users
            WHERE username = ?
            LIMIT 1
        `;

        const [rows] = await db.query(sql, [username]);

        return rows[0];
    }

    // Find by Phone
    static async findByPhone(phone) {

        const sql = `
            SELECT *
            FROM users
            WHERE phone = ?
            LIMIT 1
        `;

        const [rows] = await db.query(sql, [phone]);

        return rows[0];
    }

    // Login (Email / Username / Phone)
    static async findByLogin(login) {

        const sql = `
            SELECT *
            FROM users
            WHERE email = ?
               OR username = ?
               OR phone = ?
            LIMIT 1
        `;

        const [rows] = await db.query(sql, [
            login,
            login,
            login,
        ]);

        return rows[0];
    }

    // Update Last Login
    static async updateLastLogin(userId) {

        const sql = `
            UPDATE users
            SET last_login_at = NOW()
            WHERE id = ?
        `;

        await db.query(sql, [userId]);
    }

    // Update Device Token
    static async updateDeviceToken(userId, deviceToken) {

        const sql = `
            UPDATE users
            SET device_token = ?
            WHERE id = ?
        `;

        await db.query(sql, [
            deviceToken,
            userId,
        ]);
    }

    // Update Last Logout
    static async updateLastLogout(userId) {

        const sql = `
        UPDATE users
        SET last_logout_at = NOW(),
            device_token = NULL
        WHERE id = ?
    `;

        await db.query(sql, [userId]);
    }

}

module.exports = User;