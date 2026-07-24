const bcrypt = require("bcrypt");

const User = require("../models/User");
const jwtService = require("../services/jwtService");


class AuthController {


    // ================= REGISTER =================

    static async register(req, res) {

        try {


            const {
                username,
                email,
                phone,
                password,
                device_token
            } = req.body;



            if (!username || !email || !password) {

                return res.status(400).json({

                    success: false,

                    message: "Username, Email and Password are required."

                });

            }



            const usernameExists =
                await User.findByUsername(username);


            if (usernameExists) {

                return res.status(409).json({

                    success: false,

                    message: "Username already exists."

                });

            }



            const emailExists =
                await User.findByEmail(email);



            if (emailExists) {

                return res.status(409).json({

                    success: false,

                    message: "Email already exists."

                });

            }




            if (phone) {

                const phoneExists =
                    await User.findByPhone(phone);


                if (phoneExists) {

                    return res.status(409).json({

                        success: false,

                        message: "Phone already exists."

                    });

                }

            }




            const hashedPassword =
                await bcrypt.hash(password, 10);




            const result =
                await User.createUser({

                    username,

                    email,

                    phone,

                    password: hashedPassword,

                    deviceToken: device_token

                });




            const token =
                jwtService.generateToken({

                    id: result.insertId

                });




            return res.status(201).json({


                success: true,

                message: "User registered successfully.",


                token,


                user: {


                    id: result.insertId,

                    username,

                    email,

                    phone


                }


            });



        } catch (error) {


            return res.status(500).json({

                success: false,

                message: error.message

            });


        }


    }






    // ================= LOGIN =================


    static async login(req, res) {


        try {


            const {

                login,

                password,

                device_token


            } = req.body;




            if (!login || !password) {


                return res.status(400).json({

                    success: false,

                    message: "Login and Password are required."

                });


            }





            const user =
                await User.findByLogin(login);




            if (!user) {


                return res.status(401).json({

                    success: false,

                    message: "Invalid credentials."

                });


            }




            const isMatch =
                await bcrypt.compare(

                    password,

                    user.password

                );




            if (!isMatch) {


                return res.status(401).json({

                    success: false,

                    message: "Invalid credentials."

                });


            }




            if (user.status !== "active") {


                return res.status(403).json({

                    success: false,

                    message: "Account is not active."

                });


            }





            await User.updateLastLogin(user.id);





            if (device_token) {


                await User.updateDeviceToken(

                    user.id,

                    device_token

                );


            }





            const token =
                jwtService.generateToken({

                    id: user.id

                });






            return res.status(200).json({


                success: true,

                message: "Login successful.",


                token,



                user: {


                    id: user.id,

                    username: user.username,

                    email: user.email,

                    phone: user.phone


                }


            });



        } catch (error) {



            return res.status(500).json({

                success: false,

                message: error.message

            });



        }


    }






    // ================= UPDATE DEVICE TOKEN =================


    static async updateDeviceToken(req, res) {


        try {


            const {
                device_token
            } = req.body;




            if (!device_token) {


                return res.status(400).json({

                    success: false,

                    message: "Device token required."

                });


            }




            await User.updateDeviceToken(

                req.user.id,

                device_token

            );




            return res.status(200).json({

                success: true,

                message: "Device token updated successfully."

            });




        } catch (error) {


            return res.status(500).json({

                success: false,

                message: error.message

            });


        }


    }



}


module.exports = AuthController;