const { userService } = require('../services');

module.exports = {
  allUsers: (req, res) => {
    try {
      userService.allUsers().then((result) => {
        return res.header('Access-Control-Allow-Origin', '*').send(result);
      });
    } catch (error) {
      return res.header('Access-Control-Allow-Origin', '*').send(error);
    }
  },
  create: (req, res) => {
    try {
      userService.create().then((result) => {
        return res.header('Access-Control-Allow-Origin', '*').send(result);
      });
    } catch (error) {
      return res.header('Access-Control-Allow-Origin', '*').send(error);
    }
  },
  findUser: (req, res) => {
    try {
      userService.findUser().then((result) => {
        return res.header('Access-Control-Allow-Origin', '*').send(result);
      });
    } catch (error) {
      return res.header('Access-Control-Allow-Origin', '*').send(error);
    }
  },
};
