console.log("JWT SECRET:", process.env.JWT_SECRET);

module.exports = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
};