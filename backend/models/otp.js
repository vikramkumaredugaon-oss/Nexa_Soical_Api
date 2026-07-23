const db = require("../config/database");


class Otp {


    // Create OTP
    static async create(data){

        const sql = `
            INSERT INTO otps(
                user_id,
                email,
                phone,
                otp,
                expires_at
            )
            VALUES(?,?,?,?,?)
        `;


        const [result] = await db.query(sql,[
            data.user_id,
            data.email,
            data.phone,
            data.otp,
            data.expires_at
        ]);


        return result;
    }



    // Verify OTP

    static async verify(email,otp){

        const sql = `
            SELECT *
            FROM otps
            WHERE email = ?
            AND otp = ?
            AND expires_at > NOW()
            ORDER BY id DESC
            LIMIT 1
        `;


        const [rows] = await db.query(sql,[
            email,
            otp
        ]);


        return rows[0];

    }


}


module.exports = Otp;