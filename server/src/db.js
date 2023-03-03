const{ MongoClient } = require('mongodb');

const client = new MongoClient(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports.client = client;

module.exports.dbConnect = async () => {
  try {
    await client.connect();
    console.log('The connection to the database is successful...');
  } catch (error) {
    console.log('The connection to the database is failed...', error);
  }
};
