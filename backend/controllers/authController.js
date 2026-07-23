const bcrypt = require("bcrypt");

const User = require("../models/User");
const jwtService = require("../services/jwtService");

class AuthController {

    // Register
    static async register(req, res) {
        try {

            const {
                username,
                email,
                phone,
                password,
            } = req.body;

            // Validation
            if (!username || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Username, Email and Password are required."
                });
            }

            // Check Username
            const usernameExists = await User.findByUsername(username);

            if (usernameExists) {
                return res.status(409).json({
                    success: false,
                    message: "Username already exists."
                });
            }

            // Check Email
            const emailExists = await User.findByEmail(email);

            if (emailExists) {
                return res.status(409).json({
                    success: false,
                    message: "Email already exists."
                });
            }

            // Check Phone (Optional)
            if (phone) {
                const phoneExists = await User.findByPhone(phone);

                if (phoneExists) {
                    return res.status(409).json({
                        success: false,
                        message: "Phone already exists."
                    });
                }
            }

            // Password Hash
            const hashedPassword = await bcrypt.hash(password, 10);

            // Save User
            const result = await User.createUser({
                username,
                email,
                phone,
                password: hashedPassword,
            });

            // JWT Token
            const token = jwtService.generateToken({
                id: result.insertId,
            });

            return res.status(201).json({
                success: true,
                message: "User registered successfully.",
                token,
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message,
            });

        }
    }

    // Login
    static async login(req, res) {

        try {

            const { login, password } = req.body;

            if (!login || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Login and Password are required."
                });
            }

            const user = await User.findByLogin(login);

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials."
                });
            }

            const isMatch = await bcrypt.compare(
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

            const token = jwtService.generateToken({
                id: user.id,
            });

            return res.status(200).json({
                success: true,
                message: "Login successful.",
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                },
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message,
            });

        }

    }

}

module.exports = AuthController;