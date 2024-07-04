import { logger } from "../common/pino";
const Document = require('../models/google-document');

// retreives one the document
export const getGoogleDocumentByIdController = (req: any, res: any) => {
  if (!req?.isUserAuth) {
    res.status(401).send({ message: "Unauthorised resource access..!" });
  } else {
    Document.find({ _id: req.params.documentId }).then((response: any) => {
      logger.info(`User fetched data`);
      res.status(200).send({
        document: response[0]
      });
    }).catch((error: any) => {
      logger.error(`Error in fetching the documents, ${error.message}`);
      res.status(500).json(error);
    });
  }
}

// retreives all the documents data
export const getAllDocumentIds = (req: any, res: any) => {
  if (!req?.isUserAuth) {
    res.status(401).send({ message: "Unauthorised resource access..!" });
  }

  Document.find({ createdBy: req.body.username }, { documentName: true, _id: true, createdOn: true, updatedOn: true }).then((response: any) => {
    res.status(200).send({
      documents: response
    });
  }).catch((error: any) => {
    logger.error(`Error in fetching the documents, ${error.message}`);
    res.status(500).json(error);
  });
}

// creates new document
export const createNewDocument = (req: any, res: any) => {
  if (!req?.isUserAuth) {
    res.status(401).send({ message: "Unauthorised resource access..!" });
  } else {
    let document = new Document(req.body);
    document.save().then((response: any) => {
      logger.info(`Document ${response._id} created successfully...`);
      res.status(201).send({
        message: "Document created successfully..!",
        documentId: response._id
      });
    }).catch((error: any) => {
      logger.error(`Error in saving the user data ${req.body.createdBy}, ${error.message}`);
      res.status(500).json(error);
    });
  }
}

// update the document
export const updateDocument = (req: any, res: any) => {
  if (!req?.isUserAuth) {
    res.status(401).send({ message: "Unauthorised resource access..!" });
  }
  const document = {
    documentName: req.body.documentName,
    documentDescription: req.body.documentDescription,
    questions: req.body.questions,
    updatedOn: req.body.updatedOn
  };

  Document.findByIdAndUpdate((req.body._id).trim(), { $set: document }, { new: false }).then(() => {
    logger.info(`Document ${req.body._id} is updated successfully`)
    res.status(200).send({ code: 200, message: 'Updated successfully' });
  }).catch((error: any) => {
    logger.error("Unable to update the document, ", req.body._id, error);
    res.status(500).send("Internal Server Error");
  });
}

export const deleteDcouemnt = (req: any, res: any) => {
  if (!req.isUserAuth) {
    res.status(401).send({ message: "Unauthorised resource access..!" });
  }

  let documentId = req.params?.documentId;
  Document.deleteOne({ _id: documentId }).then(() => {
    logger.error("Document deleted successfully..", req.body._id);
    res.status(200).json({ msg: "Record Deleted Successfully..." });
  }).catch((error: any) => {
    logger.error("Unable to delete the document,", req.body._id, error);
    res.json({ msg: "unable to delete the document...!" });
  });
};
