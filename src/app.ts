import express from 'express';
import bodyParser from 'body-parser';
import questionsRouter from './routes/google-document';
import userRouter from './routes/user';
import { corsConfig } from './common/constants';
import cors from "cors";
import mongoose from 'mongoose';
import { logger } from './common/pino';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsConfig));
app.use(questionsRouter);
app.use(userRouter);

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
