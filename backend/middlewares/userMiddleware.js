require('dotenv').config()
const User= require ('../models/userModel');

const jwtp= process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const userMiddleware = async (req, res, next) => {

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, jwtp);
            const { email } = decoded;
            req.user = await User.findOne({ email }).select("-password");

            next();
        } catch (error) {
            res.status(401).send("not authorized");
            return;
        }
    }

    if (!token) {
        res.status(401).send("not authorized, no token");
    }
}

module.exports = userMiddleware;