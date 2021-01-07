import express from 'express';
import mongoose from 'mongoose';
import routes from './api/index.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json({ extended: true }));

app.use(cookieParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origins', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    return res.status(204).json({});
  }
  next();
});

app.use('/', routes());

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(err.status).send({ message: err.message }).end();
  }
  return next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  return res
    .status(err.status || 500)
    .json({ message: err.message || 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Database connection error'));

db.once('open', () => {
  console.log('Database connection success');
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.message));

app.listen(PORT, () => {
  console.log('Server has been started on port ' + PORT);
});
