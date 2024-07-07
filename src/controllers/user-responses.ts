import { Request, Response } from "express";
import { logger } from "../common/pino";
const UserReponse = require('../models/user-response');

export const getUserResponseController = (req: Request, res: Response) => {
  console.log(req.params)
  UserReponse.find({ documentId: req.params.documentId })
    .then((responseData: any) => {
      res.status(200).send({
        formResponses: responseData
      });
    }).catch((error: any) => {
      logger.error(`Error in fetching the responses, ${error.message}`);
      res.status(500).json(error);
    });
}

export const userResponseController = (req: any, res: any) => {
  let userResponse = new UserReponse(req.body);
  userResponse.save().then((response: any) => {
    logger.info(`user response ${response._id} saved successfully...`);
    res.status(201).send({
      message: "Form submitted successfully..!",
      documentId: response._id
    });
  }).catch((error: any) => {
    logger.error(`Error in saving the user data ${req.body.username}, ${error.message}`);
    res.status(500).json(error);
  });
}