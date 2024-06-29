"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInUserController = exports.signUpUserController = exports.getUserByIdController = void 0;
const pino_1 = require("../common/pino");
const Users = require('../models/user');
const jwt = require("jsonwebtoken");
const getUserByIdController = (req, res) => {
    console.log(req.params);
    try {
        Users.find({ username: 'Sudeep Manasali' })
            .then((result) => {
            pino_1.logger.info(`User logged in successfully..!`);
            res.status(200).send(result);
        })
            .catch((err) => {
            pino_1.logger.error(`Error in fetching the user data ${"username"}, ${err === null || err === void 0 ? void 0 : err.message}`);
        });
    }
    catch (err) {
        pino_1.logger.error(`Error in fetching the user data ${"username"}, ${err === null || err === void 0 ? void 0 : err.message}`);
        res.status(400).json(err);
    }
};
exports.getUserByIdController = getUserByIdController;
const signUpUserController = (req, res) => {
    try {
        let user = new Users(req.body);
        user.save().then(() => {
            pino_1.logger.info(`User ${req.body.email} created successfully...`);
            res.status(201).send({
                message: "User created successfully..!"
            });
        }).catch((error) => {
            pino_1.logger.error(`Error in saving the user data ${req.body.email}, ${error.message}`);
            res.status(500).json(error);
        });
    }
    catch (err) {
    }
};
exports.signUpUserController = signUpUserController;
const signInUserController = (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }
    Users.find({ email: email, password: password }).then((result) => {
        if (result.length > 0) {
            const { email, username, _id } = result[0];
            const token = jwt.sign({
                email,
                username,
                userId: _id.toString(),
            }, "somesupersecretsecret", { expiresIn: "1d" });
            pino_1.logger.info(`User logged in successfully: `, { email, username });
            res.status(200).json({
                msg: "Logged In",
                token: token,
                data: { email, username }
            });
        }
        else {
            pino_1.logger.error(`User data not found..!`);
            res.status(403).json({ msg: "No user data" });
        }
    });
};
exports.signInUserController = signInUserController;
