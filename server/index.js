require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./src/routes');
const port = process.env.PORT || 3100;

app.use(cors({
  origin: [
    process.env.LOCALHOST_CLIENT_URL,
    process.env.PRODACTION_CLIENT_URL,
  ],
}));
app.use('/', routes);

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
