"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInUserController = exports.signUpUserController = exports.getUserByIdController = void 0;
const pino_1 = require("../common/pino");
const Users = require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const getUserByIdController = (req, res) => {
    Users.find({ username: 'Sudeep Manasali' })
        .then((result) => {
        pino_1.logger.info(`User logged in successfully..!`);
        res.status(200).send(result);
    })
        .catch((err) => {
        pino_1.logger.error(`Error in fetching the user data ${"username"}, ${err === null || err === void 0 ? void 0 : err.message}`);
    });
};
exports.getUserByIdController = getUserByIdController;
const signUpUserController = (req, res) => {
    try {
        let user = new Users(req.body);
        Users.find({ email: req.body.email }).then((response) => {
            console.log(response);
            if (response.length > 0) {
                res.status(403).send('User already exists, try new email address');
            }
            else {
                bcrypt.hash(user.password, 12).then((hashedPassword) => {
                    user.password = hashedPassword;
                    user.save().then(() => {
                        pino_1.logger.info(`User ${req.body.email} created successfully...`);
                        res.status(201).send({
                            message: "User created successfully..!"
                        });
                    });
                });
            }
        });
    }
    catch (err) {
        pino_1.logger.error("Unable to create the user, ", req.body.email, err);
        res.status(500).send("Internal Server Error");
    }
};
exports.signUpUserController = signUpUserController;
const signInUserController = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }
    Users.find({ email: email }).then((user) => {
        if (user.length == 0) {
            pino_1.logger.error(`User data not found..!`);
            res.status(403).send({ message: "No user data found" });
        }
        else {
            const { email, username, _id } = user[0];
            bcrypt.compare(password, user[0].password)
                .then((isMatched) => {
                if (!isMatched) {
                    res.status(402).send({ message: "Password is incorrect..!" });
                }
                else {
                    const token = jwt.sign({
                        email,
                        username,
                        userId: _id.toString()
                    }, "somesupersecretsecret", { expiresIn: "1d" });
                    pino_1.logger.info(`User logged in successfully: `, { email, username });
                    res.status(200).json({
                        message: "Logged In",
                        token: token,
                        userId: _id.toString(),
                        data: { email, username }
                    });
                }
            })
                .catch((error) => {
                pino_1.logger.error("Unable to signin the user, ", email, error);
                res.status(401).send("");
            });
        }
    }).catch((error) => {
        pino_1.logger.error("Unable to signin the user, ", email, error);
        res.status(500).send("");
    });
};
exports.signInUserController = signInUserController;
