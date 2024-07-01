"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuth = void 0;
const jwt = require("jsonwebtoken");
const UserAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    console.log(authHeader);
    if (!authHeader) {
        req.isUserAuth = false;
        return next();
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, "somesupersecretsecret");
    }
    catch (err) {
        req.isUserAuth = false;
        return next();
    }
    if (!decodedToken) {
        req.isUserAuth = false;
        return next();
    }
    req.userId = decodedToken.userId;
    req.isUserAuth = true;
    next();
};
exports.UserAuth = UserAuth;
module.exports = exports.UserAuth;
