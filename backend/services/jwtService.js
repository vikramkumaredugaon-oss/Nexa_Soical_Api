const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");


// ================= GENERATE TOKEN =================

const generateToken = (payload) => {

    return jwt.sign(
        payload,
        jwtConfig.secret,
        {
            expiresIn: jwtConfig.expiresIn,
        }
    );

};




// ================= VERIFY TOKEN =================

const verifyToken = (token) => {

    try {

        return jwt.verify(
            token,
            jwtConfig.secret
        );


    } catch (error) {


        throw new Error("Invalid or expired token");


    }

};



module.exports = {

    generateToken,

    verifyToken,

};