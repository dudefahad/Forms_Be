import { Request, Response } from "express";
import { logger } from "../common/pino";
import { getIo } from "../common/Socket";
import { REQUEST_FAILURE_MESSAGES, REQUEST_SUCCESS_MESSAGE, SOCKET_CHANNEL_NAMES } from "../common/constants";
const UserReponse = require('../models/user-response');

export const getUserResponseController = (req: Request, res: Response) => {
  UserReponse.find({ documentId: req.params.documentId })
    .then((responseData: any) => {
      res.status(200).send({
        formResponses: responseData
      });
    }).catch((error: any) => {
      logger.error(REQUEST_FAILURE_MESSAGES.ERROR_IN_FETCHING_USER_RESPONSE, error.message);
      res.status(500).json({ "message": REQUEST_FAILURE_MESSAGES.ERROR_IN_FETCHING_USER_RESPONSE });
    });
}

export const fetchUserResponseData = (req: Request, res: Response) => {
  UserReponse.find({ documentId: req.params.documentId, userId: req.params.userId })
    .then((responseData: any) => {
      res.status(200).send({
        formResponses: responseData
      });
    }).catch((error: any) => {
      logger.error(REQUEST_FAILURE_MESSAGES.ERROR_IN_FETCHING_USER_RESPONSE, error.message);
      res.status(500).json({ "message": REQUEST_FAILURE_MESSAGES.ERROR_IN_FETCHING_USER_RESPONSE });
    });
}

export const saveUserResponseController = (req: any, res: any) => {
  let userResponse = req.body;

  UserReponse.findOneAndUpdate({ userId: req.body.userId, documentId: req.body.documentId },
    { $set: userResponse },
    { upsert: true, returnOriginal: false }).then((formResponse: any) => {
      logger.info(REQUEST_SUCCESS_MESSAGE.RESPONSE_SAVED_SUCCESSFULLY, formResponse._id);
      getIo().emit(SOCKET_CHANNEL_NAMES.USER_RESPONSE, formResponse);

      res.status(201).send({
        message: REQUEST_SUCCESS_MESSAGE.RESPONSE_SAVED_SUCCESSFULLY,
        documentId: formResponse._id
      });
    }).catch((error: any) => {
      logger.error(REQUEST_FAILURE_MESSAGES.ERROR_INSAVING_USER_RESPONSE, `${req.body.username}, ${error.message}`);
      res.status(500).json({ "message": REQUEST_FAILURE_MESSAGES.ERROR_INSAVING_USER_RESPONSE });
    });
}