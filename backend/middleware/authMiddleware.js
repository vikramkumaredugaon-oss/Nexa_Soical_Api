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




        const parts = authHeader.split(" ");




        if (
            parts.length !== 2 ||
            parts[0] !== "Bearer"
        ) {

            return res.status(401).json({

                success: false,

                message: "Invalid authorization format."

            });

        }




        const token = parts[1];




        const decoded =
            jwtService.verifyToken(token);




        if (!decoded || !decoded.id) {

            return res.status(401).json({

                success: false,

                message: "Invalid token payload."

            });

        }




        req.user = {

            id: decoded.id

        };




        next();



    } catch (error) {


        console.log(
            "AUTH MIDDLEWARE ERROR :",
            error.message
        );



        return res.status(401).json({

            success: false,

            message: "Unauthorized user."

        });


    }

};



module.exports = authMiddleware;