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
        .send(error);
    }
  },
  create: (req, res) => {
    try {
      userModel.create()
        .then(result => {
          return res
            .header('Access-Control-Allow-Origin', '*')
            .send(result);
        });
    } catch (error) {
      return res
        .header('Access-Control-Allow-Origin', '*')
        .send(error);
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
        .send(error);
    }
  },
};
