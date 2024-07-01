import { Request, Response } from "express";
import { logger } from "../common/pino";
const Users = require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

export const getUserByIdController = (req: Request, res: Response) => {
  Users.find({ username: req.params.id })
    .then((result: any) => {
      logger.info(`User logged in successfully..!`);
      res.status(200).send(result);
    })
    .catch((error: any) => {
      logger.error(`Error in fetching the user data, ${error?.message}`,);
    });
}

export const signUpUserController = (req: Request, res: Response) => {
  try {
    let user = new Users(req.body);
    Users.find({ email: req.body.email }).then((response: any) => {
      if (response.length > 0) {
        res.status(403).send('User already exists, try new email address');
      } else {
        bcrypt.hash(user.password, 12).then((hashedPassword: string) => {
          user.password = hashedPassword;
          user.save().then(() => {
            logger.info(`User ${req.body.email} created successfully...`);
            res.status(201).send({
              message: "User created successfully..!"
            });
          });
        });
      }
    })
  } catch (error) {
    logger.error("Unable to create the user, ", req.body.email, error);
    res.status(500).send("Internal Server Error");
  }
}

export const signInUserController = (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  Users.find({ email: email }).then((user: any) => {
    if (user.length == 0) {
      logger.error(`User data not found..!`);
      res.status(403).send({ message: "No user data found" });
    } else {
      const { email, username, _id } = user[0];
      bcrypt.compare(password, user[0].password)
        .then((isMatched: boolean) => {
          if (!isMatched) {
            res.status(402).send({ message: "Password is incorrect..!" });
          }
          else {
            const token = jwt.sign(
              {
                email,
                username,
                userId: _id.toString()
              },
              "somesupersecretsecret",
              { expiresIn: "1d" }
            );
            logger.info(`User logged in successfully: `, { email, username });
            res.status(200).json({
              message: "Logged In",
              token: token,
              userId: _id.toString(),
              data: { email, username }
            });
          }
        })
        .catch((error: any) => {
          logger.error("Unable to signin the user, ", email, error);
          res.status(401).send("");
        });
    }
  }).catch((error: any) => {
    logger.error("Unable to signin the user, ", email, error);
    res.status(500).send("");
  });
}
