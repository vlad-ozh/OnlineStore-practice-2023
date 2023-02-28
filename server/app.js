const express = require('express');
const app = express();
require('dotenv').config();

const usersRoutes = require('./routes/users');
const db = require('./db');
const port = process.env.PORT || 3100;

db.dbConnect();

app.use('/', usersRoutes)

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`App listening on port ${port}...`);
});
