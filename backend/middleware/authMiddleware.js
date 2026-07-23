const jwtService = require("../services/jwtService");


const authMiddleware = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;


        if (!authHeader) {

            return res.status(401).json({
                success: false,
                message: "Authorization token required."
            });

        }


        const token = authHeader.split(" ")[1];


        if (!token) {

            return res.status(401).json({
                success: false,
                message: "Invalid token."
            });

        }


        const decoded = jwtService.verifyToken(token);


        req.user = decoded;


        next();


    } catch (error) {

        return res.status(401).json({

            success: false,
            message: "Unauthorized user."

        });

    }

};


module.exports = authMiddleware;