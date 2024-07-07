import { Request, Response } from "express";
import { logger } from "../common/pino";
import { getIo } from "../common/Socket";
import { SOCKET_CHANNEL_NAMES } from "../common/constants";
const UserReponse = require('../models/user-response');

export const getUserResponseController = (req: Request, res: Response) => {
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

export const saveUserResponseController = (req: any, res: any) => {
  let userResponse = new UserReponse(req.body);
  userResponse.save().then((formResponse: any) => {
    logger.info(`user response ${formResponse._id} saved successfully...`);
    getIo().emit(SOCKET_CHANNEL_NAMES.USER_RESPONSE, formResponse);

    res.status(201).send({
      message: "Form submitted successfully..!",
      documentId: formResponse._id
    });
  }).catch((error: any) => {
    logger.error(`Error in saving the user data ${req.body.username}, ${error.message}`);
    res.status(500).json(error);
  });
}