require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
const routes = require('./routes');
const port = process.env.PORT || 3100;

db.dbConnect();

app.use('/', routes);

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`App listening on port ${port}...`);
});
