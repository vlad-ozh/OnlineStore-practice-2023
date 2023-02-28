const express = require("express");
const router = express.Router();
const db = require('../db/index');
const usersCollectionName = 'users';
const client = db.client;

// router.route('/users')
//     .get((req, res) => {...})
//     .post((req, res) => {...})
//     .put((req, res) => {...})
//     .delete((req, res) => {...});

router.get('/createCollection', async (req, res) => {
  await client.db().createCollection(usersCollectionName);

  res
    .header('Access-Control-Allow-Origin', '*')
    .send('data has been added in db succsesful...');
});
router.get('/addData', async (req, res) => {
  const usersCollection = client.db().collection(usersCollectionName);
  await usersCollection.insertOne({name: 'Vladyslav', age: 25});

  res
    .header('Access-Control-Allow-Origin', '*')
    .send('data has been added in db succsesful...');
});
router.get('/findData', async (req, res) => {
  const usersCollection = client.db().collection(usersCollectionName);
  const qwe = await usersCollection.findOne({name:"Vladyslav"});
  
  res
  .header('Access-Control-Allow-Origin', '*')
  .send(qwe);
});

module.exports = router;