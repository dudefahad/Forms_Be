import express from 'express'
import questionsRouter from './routes/questions';

const app = express();
app.use(questionsRouter);

app.listen(2000);   