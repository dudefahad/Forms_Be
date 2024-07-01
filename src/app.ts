import express from 'express';
import bodyParser from 'body-parser';
import questionsRouter from './routes/google-document';
import userRouter from './routes/user';
import { corsConfig } from './common/constants';
import cors from "cors";
import mongoose from 'mongoose';
import { logger } from './common/pino';
import jwt from "jsonwebtoken";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsConfig));

// routes for user
app.use(userRouter);

// for user authentication 
app.use((req: any, res: any, next: any) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isUserAuth = false;
    return next();
  }

  const token = authHeader;
  let decodedToken: any;
  try {
    decodedToken = jwt.verify(token, "somesupersecretsecret");
  } catch (err) {
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
});

// document routes
app.use(questionsRouter);

mongoose.connect("mongodb+srv://sudeep_manasali:Sudeep%401234@googleformclone.urebd.mongodb.net/google_form_clone?retryWrites=true&w=majority")
  .then(() => {
    logger.info("Moongoose connected successfully...");
    app.listen(process.env.PORT || 9000, () => {
      logger.info(`Express server is up and running`);
    });
  })
  .catch((err) => {
    logger.error("Unable to connect the monog-db database ", err);
    logger.error("App crashed");
    process.exit();
  });
