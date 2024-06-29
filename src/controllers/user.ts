import { Request, Response } from "express";
import { logger } from "../common/pino";
const Users = require('../models/user');
const jwt = require("jsonwebtoken");

export const getUserByIdController = (req: Request, res: Response) => {
  console.log(req.params)
  try {
    Users.find({ username: 'Sudeep Manasali' })
      .then((result: any) => {
        logger.info(`User logged in successfully..!`);
        res.status(200).send(result);
      })
      .catch((err: any) => {
        logger.error(`Error in fetching the user data ${"username"}, ${err?.message}`,);
      });
  } catch (err: any) {
    logger.error(`Error in fetching the user data ${"username"}, ${err?.message}`,);
    res.status(400).json(err);
  }
}

export const signUpUserController = (req: Request, res: Response) => {
  try {
    let user = new Users(req.body);

    user.save().then(() => {
      logger.info(`User ${req.body.email} created successfully...`);
      res.status(201).send({
        message: "User created successfully..!"
      });
    }).catch((error: any) => {
      logger.error(`Error in saving the user data ${req.body.email}, ${error.message}`);
      res.status(500).json(error);
    })
  } catch (err) {

  }
}

export const signInUserController = (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  Users.find({ email: email, password: password }).then((result: string | any[]) => {
    if (result.length > 0) {
      const { email, username, _id } = result[0];
      const token = jwt.sign(
        {
          email,
          username,
          userId: _id.toString(),
        },
        "somesupersecretsecret",
        { expiresIn: "1d" }
      );
      logger.info(`User logged in successfully: `, { email, username });

      res.status(200).json({
        msg: "Logged In",
        token: token,
        data: { email, username }
      });
    } else {
      logger.error(`User data not found..!`);
      res.status(403).json({ msg: "No user data" });
    }
  });
}
