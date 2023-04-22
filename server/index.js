require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorMiddleware = require('./src/middlewares/errorMiddleware');

const app = express();
const routes = require('./src/routes');
const port = process.env.PORT || 3100;

app.use(cors({
  credentials: true,
  origin: process.env.PRODUCTION_CLIENT_URL,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', routes);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(port, () => console.log(`App listening on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
