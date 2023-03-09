const userModel = require('./service');

module.exports = {
  allUsers: (req, res) => {
    try {
      userModel.allUsers()
        .then(result => {
          return res
            .header('Access-Control-Allow-Origin', '*')
            .send(result);
        });
    } catch (error) {
      return res
        .header('Access-Control-Allow-Origin', '*')
        .send(`could not find user... ${error}`);
    }
  },
  create: (req, res) => {
    try {
      userModel.create();

      return res
        .header('Access-Control-Allow-Origin', '*')
        .send('data has been added in db succsessful...');
    } catch (error) {
      return res
        .header('Access-Control-Allow-Origin', '*')
        .send(`could not add data to the database... ${error}`);
    }
  },
  findUser: (req, res) => {
    try {
      userModel.findUser().then(result => {
        return res
          .header('Access-Control-Allow-Origin', '*')
          .send(result);
      });
    } catch (error) {
      return res
        .header('Access-Control-Allow-Origin', '*')
        .send(`could not find user... ${error}`);
    }
  },
};
